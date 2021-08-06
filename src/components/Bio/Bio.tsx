import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { rhythm } from '../../utils/typography';
import { authors } from '../../utils/authors';

type Props = {
  author: string;
  avatars: {
    edges: Array<{
      node: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    }>;
  };
};

export default function Bio({ author, avatars }: Props) {
  const avatar = avatars.edges.find(avatar =>
    avatar.node.childImageSharp.gatsbyImageData.images.fallback?.src.includes(
      author
    )
  );
  const image = avatar && getImage(avatar.node.childImageSharp.gatsbyImageData);

  return (
    <Container>
      <div>{avatar && image && <GatsbyImage image={image} alt={author} />}</div>
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

  img {
    border-radius: 50%;
  }
`;

const P = styled.p`
  max-width: 310px;
  margin-left: 16px;
`;
