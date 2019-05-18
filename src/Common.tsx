import React, { useState } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  classes?: string[];
  text?: string;
}

export const Button = ({ classes = [], children, ...props }: ButtonProps) => {
  const className = `button ${classes.join(" ")}`;
  const allProps = Object.assign(props, { className });
  return <button {...allProps}>{children}</button>;
};
