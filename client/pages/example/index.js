/**
 * Created by ink on 2017/10/30.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDom.hydrate(
  <BrowserRouter basename="/p/components">
    <App />
  </BrowserRouter>,
  document.getElementById('bd'),
);
