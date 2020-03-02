import React from 'react';
import { rhythm } from '../utils/typography';

import { authors } from '../utils/authors';

class Bio extends React.Component {
  render() {
    const { author } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={authors[author].profilePic}
          alt={authors[author].name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          <a href={authors[author].url}>{authors[author].name}</a> —{' '}
          {authors[author].bio}
        </p>
      </div>
    );
  }
}

export default Bio;
