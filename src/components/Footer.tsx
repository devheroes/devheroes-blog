import React from 'react';
import styled from 'styled-components';

import Github from './icons/Github';
import Twitter from './icons/Twitter';
import YouTube from './icons/YouTube';
import { rhythm } from '../utils/typography';

export default function Footer() {
  const date = new Date();

  return (
    <FooterStyles>
      <Row>
        <Icons>
          <a
            href="https://mobile.twitter.com/devheroes_io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size="48px" />
          </a>
          <a
            href="https://www.youtube.com/c/DevheroesIo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube size="48px" />
          </a>
          <a
            href="https://github.com/devheroes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size="48px" />
          </a>
        </Icons>
        <div>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
      </Row>
      <Row>
        <div>
          <span>Copyright © {date.getFullYear()} </span>
          <a href="http://devheroes.io" title="DevHeroes">
            DevHeroes
          </a>
        </div>
      </Row>
    </FooterStyles>
  );
}

const FooterStyles = styled.footer`
  margin-top: ${rhythm(2.5)};
  padding-top: ${rhythm(1)};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 32px;

  &:last-child {
    padding-bottom: 0px;
  }
`;

const Icons = styled.div`
  display: flex;

  a {
    box-shadow: none;
    margin-right: 32px;
  }
`;
