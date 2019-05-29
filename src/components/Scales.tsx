import React from "react";
import TimeSignature from "./TimeSignature";
import * as hooks from "../hooks";
import * as util from "../util";
import * as t from "../types";
import * as redux from "../redux";
import * as Common from "./Common";
import * as immutable from "immutable";
import useMetronome from "../metronome";

// TODO: - clean up the rendering here. It redraws way too much on a change.
enum ScaleMode {
  NOT_STARTED = "not-started",
  KNOWN = "known",
  LEARNING = "learning"
}

interface LearnScalesProps {
  reset: () => void;
  scaleMode: ScaleMode;
}
interface BumpBpmProps {
  id: string;
  bpm: number;
}
const BumpBpm: React.FC<BumpBpmProps> = React.memo(({ id, bpm }) => {
    return (
        <Common.Button
            isDanger={bpm < 0}
            isPrimary={bpm > 0}
            isOutlined
            grow
            onClick={() => redux.addBPMToScale(id, bpm)}
        >
            {bpm}
        </Common.Button>
    );
});

const LearnScales: React.FC<LearnScalesProps> = React.memo(({ reset, scaleMode }) => {
    const scales = redux.useSelector(a =>
        a.scales.filter(s => {
            if (scaleMode === ScaleMode.LEARNING) {
                return s.learning;
            } else if (scaleMode === ScaleMode.KNOWN) {
                return s.known;
            }
            return false;
        }).map(s => s.id), (a, b) => a.equals(b)
    );
    const [scaleIds, setScaleIds] = React.useState<immutable.OrderedSet<string>>(
        () => immutable.OrderedSet(util.shuffle(scales.toArray()))
    );
    const nextScaleText = scaleIds.size > 1 ? "Next" : "Finish";
    const id = scaleIds.first(undefined);
    const currentScale = redux.useSelector(a =>
        a.scales.find(s => s.id === id)
    )!;
    const nextScale = React.useCallback(() => {
        if (scaleIds.first()) {
            setScaleIds(scaleIds.rest());
        }
    }, [scaleIds, setScaleIds]);

    React.useEffect(() => {
        if (currentScale) {
            redux.start(currentScale.bpm);
        }
    }, [currentScale]);

    if (id === undefined) {
        reset();
        return null;
    }

    const scale = currentScale!;
    const { mode, pitch, bpm } = scale;

    const stop = React.useMemo(() => (
        <Common.Button isDanger isOutlined onClick={reset}>
            Stop
        </Common.Button>
    ), [reset])

    const next = React.useMemo(() => (
        <Common.Button isPrimary onClick={nextScale}>
            {nextScaleText}
        </Common.Button>
    ), [nextScaleText, nextScale])

    return (
        <>
            <div className="box">
                <div
                    style={{ alignSelf: "center", fontWeight: "bold" }}
                    className="control is-expanded is-size-5"
                >
                    {scaleMode}
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                    <div style={{ alignSelf: "center", marginRight: "10px" }}>
                        {pitch} {mode} @ {bpm}bpm
                    </div>
                    <Common.Buttons grow hasAddons>
                        <BumpBpm id={id} bpm={-10} />
                        <BumpBpm id={id} bpm={-1} />
                        <BumpBpm id={id} bpm={1} />
                        <BumpBpm id={id} bpm={10} />
                    </Common.Buttons>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {stop}
                    {next}
                </div>
            </div>
                <TimeSignature />
            </>
    );
});

interface ModeGroupProps {
  mode: t.Mode;
  hideKnown: boolean;
}

const ModeGroup: React.FC<ModeGroupProps> = ({ mode, hideKnown }) => {
  const scales = redux.useSelector(
    a =>
      a.scales
        .filter(s => s.mode === mode && (hideKnown ? !s.known : true))
        .map(s => s.id),
    (a, b) => a.equals(b)
  );
  return (
    <>
      {scales.map(id => (
        <ScaleRow key={`scale-${id}`} id={id} />
      ))}
    </>
  );
};

interface ScaleRowProps {
  id: string;
}

const ScaleRow: React.FC<ScaleRowProps> = ({ id }) => {
  const { pitch, mode, known, learning } = redux.useSelector(a =>
    a.scales.find(a => a.id === id)
  )!;
  return (
    <div className="is-grouped field has-addons">
      <div className="is-size-5 control is-expanded">
        {pitch} {mode}
      </div>
      <Common.Buttons>
        <Common.ToggleButton
          on={known}
          isInfo
          onClick={() => redux.toggleKnown(id)}
        >
          Known
        </Common.ToggleButton>
        <Common.ToggleButton
          on={learning}
          isLink
          onClick={() => redux.toggleLearning(id)}
        >
          Learning
        </Common.ToggleButton>
      </Common.Buttons>
    </div>
  );
};

interface ScalesProps {
  audioContext: t.MAudioContext;
}

// TODO: - Add a button to start learning a new scale. This will be a scale
// that is know known and is not learning.
// TODO: - use my piano keyboard component from my blog to show 3 octaves of the
// current scale.
const Scales: React.FC<ScalesProps> = React.memo(({ audioContext }) => {
    useMetronome(audioContext);

    const [scaleMode, setScaleMode] = React.useState(ScaleMode.NOT_STARTED);
    const [showKnown, toggleShowKnown] = hooks.usePersistantToggle(
        t.LocalStorageKey.ShowKnown,
        false
    );

    const hasKnown = redux.useSelector(a => !!a.scales.find(s => s.known));
    const hasLearning = redux.useSelector(a => !!a.scales.find(s => s.learning));

    React.useEffect(() => {
        if (scaleMode === ScaleMode.NOT_STARTED) {
            redux.stop();
        }
    }, [scaleMode]);

    return (
        <div style={{ marginTop: "10px" }}>
            {scaleMode === ScaleMode.NOT_STARTED ? (
                <div style={{ marginBottom: "5px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div
                            style={{ alignSelf: "center", fontWeight: "bold" }}
                            className="control is-expanded is-size-5"
                        >
                            Scales
                        </div>
                        <Common.Buttons>
                            <Common.Button
                                onClick={() => setScaleMode(ScaleMode.KNOWN)}
                                disabled={!hasKnown}
                                className="is-info is-outlined"
                            >
                                Start Known
                            </Common.Button>
                            <Common.Button
                                onClick={() => setScaleMode(ScaleMode.LEARNING)}
                                disabled={!hasLearning}
                                className="is-link is-outlined"
                            >
                                Start Learning
                            </Common.Button>
                        </Common.Buttons>
                    </div>
                    <hr />
                    <Common.Buttons isRight>
                        <Common.ToggleButton
                            offIsDanger
                            offIsOutlined
                            on={showKnown}
                            onClick={toggleShowKnown}
                        >
                            <>Hide Known</>
                            <>Hiding Known</>
                        </Common.ToggleButton>
                    </Common.Buttons>
                    <ModeGroup mode={t.Mode.Major} hideKnown={!showKnown} />
                    <hr />
                    <ModeGroup mode={t.Mode.Minor} hideKnown={!showKnown} />
                </div>
            ) : (
                <LearnScales
                    scaleMode={scaleMode}
                    reset={() => setScaleMode(ScaleMode.NOT_STARTED)}
                />
            )}
        </div>
    );
});

export default Scales;
