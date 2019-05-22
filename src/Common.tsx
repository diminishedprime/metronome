import React from "react";
import styled from "styled-components";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  classes?: string[];
}

export const Button = ({ classes = [], children, ...props }: ButtonProps) => {
  const className = `button ${classes.join(" ")} ${
    props["className"] === undefined ? "" : props["className"]
  } `;
  const allProps = Object.assign(props, { className });
  return (
    <button {...allProps} {...props}>
      {children}
    </button>
  );
};

export const GrowButton = styled(Button)`
  flex-grow: 1;
`;

interface ButtonsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  classes?: string[];
}

export const Buttons = ({ classes = [], children, ...props }: ButtonsProps) => {
  const className = `buttons has-addons ${classes.join(" ")}`;
  const allProps = Object.assign(props, { className });
  return <div {...allProps}>{children}</div>;
};
