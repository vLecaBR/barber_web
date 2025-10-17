import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    line-height: 1.5;
    overflow-x: hidden; /* 👈 evita scroll horizontal */
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #d4af37, #c9a332);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #f4e5b8, #d4af37);
  }

  /* Animações */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
`;

// Cores do tema
export const theme = {
  colors: {
    primary: '#d4af37',
    primaryDark: '#c9a332',
    primaryLight: '#f4e5b8',
    background: '#0a0a0a',
    backgroundLight: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceLight: '#2a2a2a',
    white: '#ffffff',
    gray100: '#f3f3f5',
    gray200: '#e9ebef',
    gray300: '#cbced4',
    gray400: '#a0a0a0',
    gray500: '#717182',
    gray600: '#5a5a5a',
    gray700: '#3a3a3a',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    textTertiary: '#5a5a5a',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  gradients: {
    gold: 'linear-gradient(135deg, #d4af37 0%, #f4e5b8 50%, #c9a332 100%)',
    goldReverse: 'linear-gradient(135deg, #c9a332 0%, #f4e5b8 50%, #d4af37 100%)',
    dark: 'linear-gradient(to bottom, #0a0a0a, #0f0f0f)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
    luxury: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
