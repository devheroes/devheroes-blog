interface Window {
  __theme: string;
  __onThemeChange: () => void;
  __setPreferredTheme: (theme: string) => void;
}

declare var window: Window;
