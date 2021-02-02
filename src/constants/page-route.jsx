import React from 'react';

import Home from '../pages/home';
import Detail from '../pages/detail';
import Saved from '../pages//saved';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home/>
  },
  {
    path: '/home',
    exact: true,
    component: () => <Home/>
  },
  {
    path: '/detail/:address/:id',
    exact: false,
    component: () => <Detail />
  },
  {
    path: '/saved',
    exact: false,
    component: () => <Saved />
  }
];


export default routes;