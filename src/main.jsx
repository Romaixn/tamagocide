import React from 'react';
import ReactDOM from 'react-dom/client';
import { Leva } from 'leva';
import Experience from '@/Experience';

import '@/index.css';

const isProd = process.env.NODE_ENV === 'production';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Experience />
    <Leva hidden={isProd} collapsed={true} />
  </React.StrictMode>,
);
