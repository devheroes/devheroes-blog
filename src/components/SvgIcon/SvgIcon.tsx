import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  color?: string;
  size?: string;
  titleAccess?: string;
  viewBox?: string;
};

export default function SvgIcon({
  children,
  color,
  size = '24px',
  titleAccess,
  viewBox = '0 0 24 24',
  ...rest
}: Props) {
  return (
    <Svg
      color={color}
      size={size}
      viewBox={viewBox}
      focusable="false"
      aria-hidden={titleAccess ? undefined : 'true'}
      role={titleAccess ? 'img' : 'presentation'}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="svg-icon"
      fill="none"
      {...rest}
    >
      {children}
      {titleAccess ? (
        <title data-testid="svg-icon-title">{titleAccess}</title>
      ) : null}
    </Svg>
  );
}

const Svg = styled.svg<Props>`
  width: 1em;
  height: 1em;
  display: block;
  flex-shrink: 0;
  font-size: ${(props) => props.size};
  color: ${(props) => (props.color ? props.color : 'var(--bg-inverted)')};
`;
