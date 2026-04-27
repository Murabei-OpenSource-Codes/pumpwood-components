import type { Preview } from '@storybook/react-vite'
import React from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => React.createElement('div', { className: 'pumpwood-ui' }, React.createElement(Story, null)),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;