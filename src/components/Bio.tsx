import React from 'react';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';
import { authors } from '../utils/authors';

type Props = {
  author: string;
};

export default function Bio({ author }: Props) {
  return (
    <Container>
      <Image src={authors[author].profilePic} alt={authors[author].name} />
      <P>
        <a href={authors[author].url}>{authors[author].name}</a> —{' '}
        {authors[author].bio}
      </P>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2)};
`;

const Image = styled.img`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  width: ${rhythm(2)};
  height: ${rhythm(2)};
  border-radius: 50%;
`;

const P = styled.p`
  max-width: 310px;
`;
