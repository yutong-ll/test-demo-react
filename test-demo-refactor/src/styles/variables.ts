export const themeTokens = {
  colors: {
    primary: '#1677ff',
    secondary: '#13c2c2',
    warning: '#fa8c16',
    danger: '#f5222d',
    success: '#52c41a',
    surface: '#f4f6fb',
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5f5',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  spacing: {
    13: '3.25rem',
    18: '4.5rem',
    22: '5.5rem',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  radii: {
    xl: '1.25rem',
    '2xl': '1.75rem',
  },
  shadows: {
    card: '0 10px 25px rgba(15, 23, 42, 0.08)',
  },
} as const

export type ThemeTokens = typeof themeTokens
