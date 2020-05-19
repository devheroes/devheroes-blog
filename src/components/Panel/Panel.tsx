import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  fontFamily?: string;
};

export default function Panel({ children, fontFamily }: Props) {
  return <P fontFamily={fontFamily}>{children}</P>;
}

const P = styled.p<Props>`
  font-size: 0.9em;
  border: 1px solid var(--hr);
  border-radius: 0.75em;
  padding: 0.75em;
  background: var(--inlineCode-bg);
  word-break: 'keep-all';

  ${({ fontFamily }) => (fontFamily ? `font-family: ${fontFamily}` : '')}
`;
