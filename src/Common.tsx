import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  classes?: string[];
}

export const Button = ({ classes = [], children, ...props }: ButtonProps) => {
  const className = `button ${classes.join(" ")}`;
  const allProps = Object.assign(props, { className });
  return <button {...allProps}>{children}</button>;
};

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
