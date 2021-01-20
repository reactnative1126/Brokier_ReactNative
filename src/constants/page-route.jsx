import React from 'react';

import Home from '../pages/desktop/home';
import Detail from '../pages/desktop/detail';
import Saved from '../pages/desktop/saved';

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
    path: '/detail/:id',
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