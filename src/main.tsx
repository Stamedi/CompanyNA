import * as React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.querySelector('main');
const root = createRoot(domNode);
root.render(<App />);
