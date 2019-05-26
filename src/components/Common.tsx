import React, { useState, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import classnames from "classnames";

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

const offProps = [
  "offIsPrimary",
  "offIsLink",
  "offIsDanger",
  "offIsInfo",
  "offIsSuccess",
  "offIsOutlined"
];
const onProps = [
  "isPrimary",
  "isLink",
  "isDanger",
  "isInfo",
  "isSuccess",
  "isOutlined"
];

export const ToggleButton = (props: ToggleButtonProps) => {
  const renderProps = React.useMemo(() => {
    const toRemove = props.on ? offProps : onProps;
    return R.omit(toRemove, props);
  }, [props]);

  const child = React.useMemo(
    () =>
      props.children instanceof Array && props.children.length === 2
        ? props.on
          ? props.children[0]
          : props.children[1]
        : props.children,
    [props]
  );
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
  const className = classnames("button", props.className, {
    "is-primary": isPrimary || offIsPrimary,
    "is-link": isLink || offIsLink,
    "is-danger": isDanger || offIsDanger,
    "is-info": isInfo || offIsInfo,
    "is-success": isSuccess || offIsSuccess,
    "is-outlined": isOutlined || offIsOutlined
  });

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
  // TODO - I might need to pass this down to ButtonsWrapper, but I can't right now without getting a type error.
  ref,
  style = {},
  grow,
  ...props
}) => {
  const className = classnames(props.className, "buttons", {
    "has-addons": hasAddons
  });
  return (
    <ButtonsWrapper
      style={Object.assign(style, { flexGrow: grow ? 1 : "unset" })}
      {...props}
      className={className}
    >
      {children}
    </ButtonsWrapper>
  );
};
