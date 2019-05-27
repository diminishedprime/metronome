import React, { useEffect, useState } from "react";
import { useToggle } from "../hooks";
import { ToggleButton, Buttons } from "./Common";
import styled from "styled-components";
import * as polyfill from "../polyfill";

const noteIdx: { [note: number]: string } = {
  0: "A",
  1: "Bb",
  2: "B",
  3: "C",
  4: "Db",
  5: "D",
  6: "Eb",
  7: "E",
  8: "F",
  9: "Gb",
  10: "G",
  11: "Ab"
};

const A4 = 440;
const notes: Array<{
  octave: number;
  note: string;
  frequency: number;
  centsPerOctave: number;
}> = [];
for (let i = -4; i < 4; i++) {
  for (let j = 0; j < 12; j++) {
    const base = A4 * Math.pow(2, i);
    const centsPerOctave = base / 1200;
    const frequency = base * Math.pow(2, j / 12);
    const octave = i + 4;
    const note = noteIdx[j];
    notes.push({ octave, note, frequency, centsPerOctave });
  }
}

const freqToPitch = (freq: number) => {
  let low = 0;
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    if (note.frequency >= freq) {
      low = i;
      break;
    }
  }
  const high = low + 1;
  const lowPitch = notes[low];
  const highPitch = notes[high];
  const average = (lowPitch.frequency + highPitch.frequency) / 2;
  let note = notes[high];
  let difference = note.frequency - freq;
  if (freq < average) {
    note = notes[low];
  }
  const cents = note.centsPerOctave * difference;
  return Object.assign(note, { originalFrequency: freq, difference, cents });
};

const Tuner = React.memo(() => {
  const [on, toggleOn] = useToggle(false);
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [sampleRate, setSampleRate] = useState<number>();
  const [freq, setFreq] = useState<number>(440);
  const [audioContext, setAudioContext] = useState<AudioContext>();

  // Initailize the AudioContext when user turns on the tuner.
  useEffect(() => {
    if (on && !audioContext && polyfill.AudioContext !== undefined) {
      setAudioContext(new polyfill.AudioContext());
    }
  }, [on, audioContext]);

  // Prompt for microphone when user turns on the tuner.
  useEffect(() => {
    if (on && audioContext) {
      setSampleRate(audioContext.sampleRate);
      const mediaDevices = navigator.mediaDevices;
      if (mediaDevices) {
        let mediaStream: MediaStream;
        mediaDevices.getUserMedia({ audio: true }).then((ms: MediaStream) => {
          mediaStream = ms;
          const analyser = audioContext.createAnalyser();
          // If this isn't big, I don't have very good frequency accuracy, and I
          // can't change the sample rate because web audio sucks.
          analyser.fftSize = 8192;
          const mic = audioContext.createMediaStreamSource(ms);
          mic.connect(analyser);
          setAnalyser(analyser);
        });
        return () => {
          mediaStream.getAudioTracks().forEach(track => track.stop());
        };
      }
    }
  }, [on, audioContext]);

  useEffect(() => {
    if (on && analyser && sampleRate) {
      const tick = () => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatFrequencyData(dataArray);
        const [, maxIdx] = dataArray.reduce(
          (a, b, i) => (a[0] < b ? [b, i] : a),
          [-Infinity, -1]
        );
        const resolution = sampleRate / analyser.fftSize;
        const freq = resolution * maxIdx;
        setFreq(freq);
      };
      tick();
      let interval = setInterval(tick, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [on, analyser, sampleRate]);

  const { octave, note, cents } = freqToPitch(freq || 0);
  // TODO - add in a graph of the FFT that's label with pitches and neato log bars.
  return (
    <TunerWrapper className="box has-text-centered">
      <div className="is-size-1">{on ? note + octave : "Stopped"}</div>

      <div>
        {on ? (
          <>
            {cents.toFixed(2)} Cents {cents < 0 ? "flat" : "sharp"}
          </>
        ) : (
          "press start to tune"
        )}
      </div>
      <Buttons className="is-right">
        <ToggleButton on={on} isDanger offIsPrimary onClick={toggleOn}>
          <>Stop</>
          <>Start</>
        </ToggleButton>
      </Buttons>
    </TunerWrapper>
  );
});

const TunerWrapper = styled.section`
  margin-top: 10px;
`;

export default Tuner;
