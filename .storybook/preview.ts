import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import '../src/styles/preview.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: true },
    layout: 'centered',
  },
};

export default preview;
