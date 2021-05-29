import React from 'react';
import { render } from 'react-dom';

import App from 'src/App';

render(<App />, document.querySelector('#root'));

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/service-worker.js');
  });
}
