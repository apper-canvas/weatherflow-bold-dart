import Home from '../pages/Home';

export const routes = {
  home: {
    id: 'home',
    label: 'Weather Dashboard',
    path: '/',
    icon: 'Cloud',
    component: Home
  }
};

export const routeArray = Object.values(routes);