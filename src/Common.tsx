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
  offIsPrimary?: true;
  offIsLink?: true;
  offIsInfo?: true;
  offIsSuccess?: true;
  offIsDanger?: true;
  offIsOutlined?: true;
  grow?: true;
}

interface ToggleButtonProps extends ButtonProps {
  on: boolean;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const [buttonProps, setButtonProps] = useState(props);
  const { on, children, className = "" } = props;
  useEffect(() => {
    let newProps = props;
    if (!props.on) {
      newProps = R.dissoc("isPrimary", newProps);
      newProps = R.dissoc("isLink", newProps);
      newProps = R.dissoc("isDanger", newProps);
      newProps = R.dissoc("isInfo", newProps);
      newProps = R.dissoc("isSuccess", newProps);
    } else {
      newProps = R.dissoc("offIsPrimary", newProps);
      newProps = R.dissoc("offIsLink", newProps);
      newProps = R.dissoc("offIsDanger", newProps);
      newProps = R.dissoc("offIsInfo", newProps);
      newProps = R.dissoc("offIsSuccess", newProps);
    }
    setButtonProps(newProps);
  }, [className, props]);
  const { on: _1, ...renderProps } = buttonProps;
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
  isOutlined,
  offIsPrimary,
  offIsDanger,
  offIsLink,
  offIsInfo,
  offIsSuccess,
  offIsOutlined,
  grow,
  ...props
}: ButtonProps) => {
  const primary = isPrimary ? "is-primary" : "";
  const link = isLink ? "is-link" : "";
  const danger = isDanger ? "is-danger" : "";
  const info = isInfo ? "is-info" : "";
  const success = isSuccess ? "is-success" : "";
  const outlined = isOutlined ? "is-outlined" : "";
  const offprimary = offIsPrimary ? "is-primary" : "";
  const offlink = offIsLink ? "is-link" : "";
  const offdanger = offIsDanger ? "is-danger" : "";
  const offinfo = offIsInfo ? "is-info" : "";
  const offsuccess = offIsSuccess ? "is-success" : "";
  const offoutlined = offIsOutlined ? "is-outlined" : "";
  const propClassName = props.className ? props.className : "";

  const className = `${propClassName} button ${primary} ${link} ${outlined} ${danger} ${info} ${success} ${offprimary} ${offdanger} ${offdanger} ${offinfo} ${offlink} ${offsuccess} ${offoutlined}`;

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
