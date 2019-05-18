import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

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

const Tuner = () => {
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [, setDataArray] = useState();
  const [sampleRate, setSampleRate] = useState<number>();
  const [freq, setFreq] = useState<number>(440);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    setSampleRate(audioContext.sampleRate);
    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices) {
      mediaDevices.getUserMedia({ audio: true }).then((thing: MediaStream) => {
        const analyser = audioContext.createAnalyser();
        // If this isn't big, I don't have very good frequency accuracy, and I
        // can't change the sample rate because web audio sucks.
        analyser.fftSize = 8192;
        const mic = audioContext.createMediaStreamSource(thing);
        mic.connect(analyser);
        setAnalyser(analyser);
      });
    }
    return () => {
      audioContext.close();
    };
  }, []);

  useLayoutEffect(() => {
    let animationFrame: number;

    const tick = () => {
      const bufferLength = analyser!.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyser!.getFloatFrequencyData(dataArray);
      setDataArray(dataArray);

      const [, maxIdx] = dataArray.reduce(
        (a, b, i) => (a[0] < b ? [b, i] : a),
        [-Infinity, -1]
      );

      const resolution = sampleRate! / analyser!.fftSize;
      const freq = resolution * maxIdx;
      setFreq(freq);

      loop();
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(tick);
    };

    if (analyser !== undefined) {
      loop();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [analyser, sampleRate]);

  const { octave, note, cents } = freqToPitch(freq || 0);
  return (
    <div className="box">
      <div className="has-text-centered">
        <div className="is-size-1">{note + octave}</div>
        <div>
          {cents.toFixed(2)} Cents {cents < 0 ? "flat" : "sharp"}
        </div>
      </div>
      {false && <canvas width={"100%"} height={"100"} ref={canvasRef} />}
    </div>
  );
};

export default Tuner;
