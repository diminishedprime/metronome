import React, { useState, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";

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
      newProps = R.dissoc("isOutlined", newProps);
    } else {
      newProps = R.dissoc("offIsPrimary", newProps);
      newProps = R.dissoc("offIsLink", newProps);
      newProps = R.dissoc("offIsDanger", newProps);
      newProps = R.dissoc("offIsInfo", newProps);
      newProps = R.dissoc("offIsSuccess", newProps);
      newProps = R.dissoc("offIsOutlined", newProps);
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

  // TODO - switch to the classname thing that used to come with react.
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
  hasAddons?: true;
  grow?: true | undefined;
}

const ButtonsWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 0 !important;
  }
`;

export const Buttons: React.FC<ButtonsProps> = ({
  children,
  hasAddons,
  className: propsClassName = "",
  // TODO - I might need to pass this down to ButtonsWrapper, but I can't right now without getting a type error.
  ref,
  style = {},
  grow,
  ...props
}) => {
  const addons = hasAddons ? "has-addons" : "";
  const classes = `${propsClassName} buttons ${addons}`;
  return (
    <ButtonsWrapper
      style={Object.assign(style, { flexGrow: grow ? 1 : "unset" })}
      {...props}
      className={classes}
    >
      {children}
    </ButtonsWrapper>
  );
};
