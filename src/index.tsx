import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout/Layout';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);

