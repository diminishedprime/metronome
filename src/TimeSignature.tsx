import React from "react";
import * as R from "ramda";
import styled from 'styled-components'
import { Signature, SubDivision } from "./types";
import { useToggle } from "./hooks";
import { Button } from "./Common";

interface Props {
  signature: Signature;
  currentBeat: number | undefined;
    overSignature: (cb: (s: Signature) => Signature) => void;
}

const SigColumn = styled.div`
    display: flex;
    flex-grow: 1;
`;

const SigColumns = styled.div`
    display: flex;
    height: 20px;
`;

const TimeSignature = ({
    overSignature,
    signature: { numerator, subDivisions },
    signature,
    currentBeat,
}: Props) => {
    const [edit, toggleEdit] = useToggle(false);
    const set = (numerator: number, denominator = 4) => () => {
        overSignature((old) => {
            return {...old, numerator, denominator}
        });
        toggleEdit();
    };
    return (
        <>
        <section
        style={{ marginTop: "10px" }}
        className="section is-mobile columns"
        onClick={toggleEdit}
        >
        {R.range(0, numerator).map((beat: number) => {
            const bg =
                beat === currentBeat
                ? "has-background-primary"
                : "has-background-light";
            const subs = subDivisions;
            return (
                <div
                    className={`column has-text-centered`}
                    key={beat}
                >
                    <div className={`column ${bg}`}>{beat + 1}</div>
                    {subs.filter(s => s.on).map(({divisions}: SubDivision) => {
                        return <SigColumns key={`d${divisions}`}className='has-background-light'>
                            {R.range(0, divisions).map((d, idx) => {
                                const bg = '';
                                return <SigColumn key={`d${divisions}-${idx}`}className={bg}></SigColumn>
                            })}
                        </SigColumns>
                    })}
                </div>
            );
        })}
        </section>
        {edit && (
            <section className="section buttons is-centered">
                <Button onClick={set(2)}>2/4</Button>
                <Button onClick={set(3)}>3/4</Button>
                <Button onClick={set(4)}>4/4</Button>
                <Button onClick={set(5)}>5/4</Button>
            </section>
        )}
    </>
    );
};

export default TimeSignature;
