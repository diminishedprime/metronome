import React, { useState, useEffect } from "react";
import * as R from "ramda";

export const maxWidth = "40em";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  primary?: true;
  isPrimary?: true;
  isLink?: true;
  isInfo?: true;
  isSuccess?: true;
  isDanger?: true;
  isOutlined?: true;
  grow?: true;
}

interface ToggleButtonProps extends ButtonProps {
  on: boolean;
  offClass?: string;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const [buttonProps, setButtonProps] = useState(props);
  const { on, children, offClass, className = "" } = props;
  useEffect(() => {
    let newProps = props;
    if (!props.on) {
      newProps = R.dissoc("isPrimary", newProps);
      newProps = R.dissoc("isLink", newProps);
      newProps = R.dissoc("isDanger", newProps);
      newProps = R.dissoc("isInfo", newProps);
      newProps = R.dissoc("isSuccess", newProps);
      newProps = offClass
        ? R.assoc("className", `${className} ${offClass}`, newProps)
        : newProps;
    }
    setButtonProps(newProps);
  }, [className, offClass, props]);
  const { on: _1, offClass: _2, ...renderProps } = buttonProps;
  const child =
    children instanceof Array && children.length === 2
      ? on
        ? children[0]
        : children[1]
      : children;
  return <Button {...renderProps}>{child}</Button>;
};

export const Button = ({
  isPrimary,
  isDanger,
  isLink,
  isInfo,
  isSuccess,
  grow,
  isOutlined,
  ...props
}: ButtonProps) => {
  const primary = isPrimary ? "is-primary" : "";
  const link = isLink ? "is-link" : "";
  const danger = isDanger ? "is-danger" : "";
  const info = isInfo ? "is-info" : "";
  const success = isSuccess ? "is-success" : "";
  const outlined = isOutlined ? "is-outlined" : "";
  const propClassName = props.className ? props.className : "";

  const className = `${propClassName} button ${primary} ${link} ${outlined} ${danger} ${info} ${success}`;

  const style = grow ? { flexGrow: 1 } : {};

  return (
    <button style={style} {...{ ...props, className }}>
      {props.children}
    </button>
  );
};

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
