import React from "react";
import * as R from "ramda";
import styled from "styled-components";
import classnames from "classnames";

export const maxWidth = "40em";

type ReactButton = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
interface ButtonProps extends ReactButton {
  primary?: boolean;
  isPrimary?: boolean;
  isLink?: boolean;
  isInfo?: boolean;
  isSuccess?: boolean;
  isDanger?: boolean;
  isOutlined?: boolean;
  offIsPrimary?: boolean;
  offIsLink?: boolean;
  offIsInfo?: boolean;
  offIsSuccess?: boolean;
  offIsDanger?: boolean;
  offIsOutlined?: boolean;
  grow?: boolean;
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

export const ToggleButton: React.FC<ToggleButtonProps> = ({ on, ...props }) => {
  const renderProps = React.useMemo(() => {
    const toRemove = on ? offProps : onProps;
    return R.omit(toRemove, props);
  }, [on, props]);

  const child = React.useMemo(
    () =>
      props.children instanceof Array && props.children.length === 2
        ? on
          ? props.children[0]
          : props.children[1]
        : props.children,
    [props, on]
  );
  return <Button {...renderProps}>{child}</Button>;
};

export const Button: React.FC<ButtonProps> = ({
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
  className: propsClassName,
  ...props
}) => {
  const className = React.useMemo(
    () =>
      classnames("button", propsClassName, {
        "is-primary": isPrimary || offIsPrimary,
        "is-link": isLink || offIsLink,
        "is-danger": isDanger || offIsDanger,
        "is-info": isInfo || offIsInfo,
        "is-success": isSuccess || offIsSuccess,
        "is-outlined": isOutlined || offIsOutlined,
        "is-grow": grow
      }),
    [
      propsClassName,
      grow,
      isPrimary,
      offIsPrimary,
      isLink,
      offIsLink,
      isDanger,
      offIsDanger,
      isInfo,
      offIsInfo,
      isOutlined,
      offIsOutlined,
      isSuccess,
      offIsSuccess
    ]
  );
  const renderProps = React.useMemo(() => {
    return { ...props, className };
  }, [props, className]);

  return <button {...renderProps}>{props.children}</button>;
};

interface ButtonsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hasAddons?: true;
  grow?: true;
  isRight?: true;
}

const ButtonsWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 0 !important;
  }
`;

export const Buttons: React.FC<ButtonsProps> = ({
  children,
  hasAddons,
  isRight,
  ref,
  className: propsClassName,
  grow,
  ...props
}) => {
  const className = React.useMemo(
    () =>
      classnames(propsClassName, "buttons", {
        "has-addons": hasAddons,
        "is-grow": grow,
        "is-right": isRight
      }),
    [hasAddons, grow, propsClassName, isRight]
  );
  return (
    <ButtonsWrapper ref={ref as any} {...props} className={className}>
      {children}
    </ButtonsWrapper>
  );
};
