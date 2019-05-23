import React from "react";
import styled from "styled-components";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const classes = `button ${className}`;
  const allProps = Object.assign(props, { className: classes });
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

export const Buttons = ({ children, className, ...props }: ButtonsProps) => {
  const classes = `${className} buttons has-addons}`;
  const allProps = Object.assign(props, { className: classes });
  return <div {...allProps}>{children}</div>;
};
