import React from 'react';
import { render } from 'react-dom';

import App from 'src/App';

render(<App />, document.body.appendChild(document.createElement('div')));

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
