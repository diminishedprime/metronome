import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useLocalStorage } from "./hooks";
import { Button, Buttons, ToggleButton } from "./Common";
import * as t from "./types";

interface Props {
  metronome: t.Metronome;
}

const SigColumn = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SigColumns = styled.div`
  display: flex;
`;

const BeatColumnRow = ({
  playing,
  activeBeats,
  beatIdx,
  division,
  divisionIdx,
  enabledDivisions: beatDivisions
}: {
  division: string;
  playing: boolean;
  activeBeats: t.ActiveDivisions[];
  divisionIdx: number;
  beatIdx: number;
  enabledDivisions: t.EnabledDivisions;
}) => {
  const divisions = parseInt(division, 10);
  return (
    <SigColumns key={`d${divisions}`}>
      {R.range(0, divisions).map(idx => {
        const bg =
          playing &&
          activeBeats[beatIdx] &&
          activeBeats[beatIdx][divisions] === idx
            ? beatIdx === 0
              ? "has-background-info"
              : "has-background-primary"
            : "has-background-light";
        const marginTop = divisions === 1 ? 0 : 5;
        const marginLeft = idx === 0 ? 0 : 10 / divisions;
        const marginRight = idx === divisions - 1 ? 0 : 10 / divisions;
        return (
          <SigColumn
            key={`d${divisions}-${idx}`}
            className={`${bg} has-text-centered`}
            style={{
              justifyContent: "center",
              height:
                70 /
                  Object.keys(beatDivisions).filter(
                    key => beatDivisions[key as any]
                  ).length -
                marginTop,
              marginLeft,
              marginRight,
              marginTop
            }}
          >
            {divisionIdx === 0 && beatIdx + 1}
          </SigColumn>
        );
      })}
    </SigColumns>
  );
};

const BeatColumn = (props: {
  playing: boolean;
  activeBeats: t.ActiveDivisions[];
  beatIdx: number;
  enabledDivisions: t.EnabledDivisions;
}) => {
  return (
    <div className={`column has-text-centered`}>
      {Object.keys(props.enabledDivisions)
        .filter(key => props.enabledDivisions[key as any])
        .map((division, divisionIdx) => (
          <BeatColumnRow
            key={`${props.beatIdx}-${divisionIdx}`}
            {...{ ...props, division, divisionIdx }}
          />
        ))}
    </div>
  );
};

const Divisions = styled.section`
  display: flex;
  align-items: baseline;
  > div {
    margin-right: 10px;
  }
`;

const TimeSignature = ({ metronome }: Props) => {
  const {
    state: {
      playing,
      signature: { numerator },
      activeDivisions: activeBeats
    },
    setSignature
  } = metronome;
  const [hasChanged, setHasChanged] = useState(false);
  const [uIenabledDivisions, setUiEnabledDivisions] = useLocalStorage<
    t.EnabledDivisions
  >(t.LocalStorageKey.SignatureDivisions, { 1: true });
  const setNumerator = useCallback(
    (numerator: number) => {
      setHasChanged(true);
      setSignature(old => {
        return R.assoc(
          "numerator",
          R.range(0, numerator).map(() => uIenabledDivisions),
          old
        );
      });
    },
    [uIenabledDivisions, setSignature]
  );

  useEffect(() => {
    if (hasChanged) {
      setSignature(old => ({
        ...old,
        numerator: R.range(0, old.numerator.length).map(
          () => uIenabledDivisions
        )
      }));
    }
  }, [uIenabledDivisions, hasChanged, setSignature]);

  const toggleDivisionOption = useCallback(
    (divisionOption: t.Division) => {
      setHasChanged(true);
      setUiEnabledDivisions(old =>
        R.over(R.lensPath([divisionOption]), R.not, old)
      );
    },
    [setUiEnabledDivisions]
  );

  const clearDivisions = useCallback(() => {
    setUiEnabledDivisions({ 1: true });
  }, [setUiEnabledDivisions]);

  // TODO - make it where clicking on a division group lets you set the volume & accents for that group.
  // TODO - add an option to turn on or off the accent at the start of every measure.
  // TODO - clean up these buttons to not use className.
  return (
    <>
      <section style={{ marginTop: "10px" }} className="section is-centered" />
      <Divisions>
        <div className="is-size-5">Division</div>
        <Buttons hasAddons grow style={{ marginRight: "5px" }}>
          {([2, 3, 4, 5, 6] as t.Division[]).map((num: t.Division) => {
            const on = uIenabledDivisions[num];
            return (
              <ToggleButton
                grow
                on={on}
                isPrimary
                key={`division-options-${num}`}
                onClick={() => toggleDivisionOption(num)}
              >
                {num}
              </ToggleButton>
            );
          })}
        </Buttons>
        <Button grow isDanger isOutlined onClick={clearDivisions}>
          Clear
        </Button>
      </Divisions>
      <section className="section is-mobile columns">
        {numerator.map(
          (enabledDivisions: t.EnabledDivisions, beatIdx: number) => (
            <BeatColumn
              key={`${beatIdx}-enabledDivisionColumn`}
              {...{ playing, beatIdx, enabledDivisions, activeBeats }}
            />
          )
        )}
      </section>
      <section className="section buttons is-centered">
        {[1, 2, 3, 4, 5].map(num => {
          const on = numerator.length === num;
          return (
            <ToggleButton
              key={`numerator-button-${num}`}
              on={on}
              isPrimary
              isOutlined
              grow
              onClick={on ? () => {} : () => setNumerator(num)}
            >
              <>{num}/4</>
            </ToggleButton>
          );
        })}
      </section>
    </>
  );
};

export default TimeSignature;
