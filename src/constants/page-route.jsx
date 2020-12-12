import React from 'react';

import Home from '../pages/home';
import Detail from '../pages/detail';

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
    exact: true,
    component: () => <Detail />
  }
];


export default routes;