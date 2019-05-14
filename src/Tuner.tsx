import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";

interface Props {}

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
const notes: Array<{ octave: number; note: string; frequency: number }> = [];
for (let i = -4; i < 4; i++) {
  for (let j = 0; j < 12; j++) {
    const frequency = A4 * Math.pow(2, i) * Math.pow(2, j / 12);
    const octave = i + 4;
    const note = noteIdx[j];
    notes.push({ octave, note, frequency });
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
    difference = freq - note.frequency;
  }
  return Object.assign(note, { originalFrequency: freq, difference });
};

const Tuner = styled(({ ...props }: Props) => {
  const [on, setOn] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [dataArray, setDataArray] = useState();
  const [sampleRate, setSampleRate] = useState<number>();
  const [freq, setFreq] = useState<number>(440);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const toggleOn = () => {
    setOn(R.not);
  };

  useEffect(() => {
    if (on) {
      const audioContext = new AudioContext();
      setSampleRate(audioContext.sampleRate);
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((thing: MediaStream) => {
          const analyser = audioContext.createAnalyser();
          // If this isn't  big, I don't have very good frequency accuracy, and I can't change the sample rate because web audio sucks.
          analyser.fftSize = 8192;
          const mic = audioContext.createMediaStreamSource(thing);
          mic.connect(analyser);
          setAnalyser(analyser);
        });
    }
  }, [on]);

  useLayoutEffect(() => {
    let animationFrame: number;

    const tick = () => {
      const bufferLength = analyser!.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyser!.getFloatFrequencyData(dataArray);
      setDataArray(dataArray);

      const canvas = canvasRef.current!;
      const canvasCtx = canvas.getContext("2d")!;
      const WIDTH = 411;
      const HEIGHT = 100;

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      var sliceWidth = (WIDTH * 1.0) / bufferLength;
      var x = 0;

      const [max, maxIdx] = dataArray.reduce(
        (a, b, i) => (a[0] < b ? [b, i] : a),
        [-Infinity, -1]
      );

      const resolution = sampleRate! / analyser!.fftSize;
      const freq = resolution * maxIdx;
      setFreq(freq);

      for (var i = 0; i < bufferLength; i++) {
        var v = -dataArray[i];
        var y = v;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      canvasCtx.stroke();

      loop();
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(tick);
    };

    if (analyser !== undefined && on) {
      loop();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [on, analyser, sampleRate]);

  const { octave, note, difference } = freqToPitch(freq || 0);
  return (
    <div {...props}>
      <div>
        <Note>{note + octave}</Note>
        <Freq>{freq} Hz</Freq>
      </div>
      <button onClick={toggleOn}>{on ? "Stop Tuner" : "Start Tuner"}</button>
      {on && <canvas width={"100%"} height={"100"} ref={canvasRef} />}
    </div>
  );
})`
  display: flex;
  flex-direction: column;
`;

const Note = styled.div`
  font-size: 4em;
  text-align: center;
`;

const Freq = styled.div`
  font-size: 1em;
  text-align: center;
`;

export default Tuner;
