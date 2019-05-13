import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";

interface Props {}

const Tuner = styled(({ ...props }: Props) => {
  // TODO - this should default to false.
  const [on, setOn] = useState(true);
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [dataArray, setDataArray] = useState();
  const [sampleRate, setSampleRate] = useState<number>();

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
          // If this isn't  big, I don't have very good frequency accuracy.
          analyser.fftSize = 32768;
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
      const WIDTH = 650;
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

        // Hi Jordan, this is my janky way to see if it's working.
        console.log({ maxIdx, resolution, freq });

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
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
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

  return (
    <div {...props}>
      <button onClick={toggleOn}>{on ? "Stop Tuner" : "Start Tuner"}</button>
      <canvas width={650} height={100} ref={canvasRef} />
    </div>
  );
})``;

export default Tuner;
