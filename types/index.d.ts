interface Window {
  __theme: string;
  __onThemeChange: () => void;
  __setPreferredTheme: (theme: string) => void;
}

declare var window: Window;

type GatsbyImageSharpFixed = {
  height: number;
  src: string;
  srcSet: string;
  tracedSVG: string;
  width: number;
};

type LangKey = 'en' | 'es' | 'pt-br';
