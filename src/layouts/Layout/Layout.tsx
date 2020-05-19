import React from 'react';
import { Link } from 'gatsby';
import Toggle from '../../components/Toggle';
import Helmet from 'react-helmet';

import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';
import Logo from '../../assets/logo.svg';

type Props = {
  location: {
    pathname: string;
  };
  title?: string;
};

type State = {
  theme: string | null;
};

class Layout extends React.Component<Props, State> {
  state = {
    theme: null,
  };

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  renderHeader() {
    const { location, title } = this.props;
    const rootPath = '/';

    if (location.pathname === rootPath) {
      return (
        <>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--textTitle)',
            }}
            to="/"
          >
            <Logo style={{ height: '72px', display: 'block' }} />
          </Link>

          <h1
            style={{
              position: 'absolute',
              left: '-9999px',
            }}
          >
            {title}
          </h1>
        </>
      );
    } else {
      return (
        <>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--textTitle)',
            }}
            to={'/'}
          >
            <Logo style={{ height: '56px', display: 'block' }} />
          </Link>

          <h3
            style={{
              position: 'absolute',
              left: '-9999px',
            }}
          >
            {title}
          </h3>
        </>
      );
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
        }}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffa8c5' : '#282c35',
            },
          ]}
        />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '788px',
            padding: `2.625rem 24px`,
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.625rem',
            }}
          >
            {this.renderHeader()}
            {this.state.theme !== null ? (
              <Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                  ),
                }}
                checked={this.state.theme === 'dark'}
                onChange={(e: any) =>
                  window.__setPreferredTheme(
                    e.target.checked ? 'dark' : 'light'
                  )
                }
              />
            ) : (
              <div style={{ height: '24px' }} />
            )}
          </header>
          {children}
        </div>
      </div>
    );
  }
}

export default Layout;
