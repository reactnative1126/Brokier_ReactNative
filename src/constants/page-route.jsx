import React from 'react';

import Home from '../pages/home';
import Detail from '../pages/detail';
import Saved from '../pages/saved';
import Profile from '../pages/profile';
import AgentUser from '../pages/agent-user';
import AgentEdit from '../pages/agent-edit';
import Settings from '../pages/settings';
import Referred from '../pages/referred';
import Viewings from '../pages/viewings';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home/>
  },
  {
    path: '/home/:agentId/:address/:mlsNumber/:id',
    exact: true,
    component: () => <Home/>
  },
  {
    path: '/detail/:address/:mlsNumber/:id',
    exact: false,
    component: () => <Detail />
  },
  {
    path: '/saved',
    exact: false,
    component: () => <Saved />
  },
  {
    path: '/profile',
    exact: false,
    component: () => <Profile />
  },
  {
    path: '/agent-user',
    exact: false,
    component: () => <AgentUser />
  },
  {
    path: '/agent-edit',
    exact: false,
    component: () => <AgentEdit />
  },
  {
    path: '/settings',
    exact: false,
    component: () => <Settings />
  },
  {
    path: '/referred',
    exact: false,
    component: () => <Referred />
  },
  {
    path: '/viewings/:userId/:userName/:agentId',
    exact: false,
    component: () => <Viewings />
  }
];


export default routes;