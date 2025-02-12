import React from 'react';
import ReactDOM from 'react-dom/client';
import { Leva } from 'leva';
import Experience from '@/Experience';

import '@/index.css';

const isDebug = window.location.hash === '#debug';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Experience />
    <Leva hidden={!isDebug} />
  </React.StrictMode>,
);
