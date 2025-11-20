import type { Config } from 'tailwindcss'
import { themeTokens } from './src/styles/variables'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: themeTokens.colors.primary,
        secondary: themeTokens.colors.secondary,
        warning: themeTokens.colors.warning,
        danger: themeTokens.colors.danger,
        success: themeTokens.colors.success,
        surface: themeTokens.colors.surface,
        gray: themeTokens.colors.gray,
      },
      spacing: themeTokens.spacing,
      fontFamily: themeTokens.fontFamily,
      borderRadius: themeTokens.radii,
      boxShadow: {
        card: themeTokens.shadows.card,
      },
    },
  },
  plugins: [],
}

export default config
