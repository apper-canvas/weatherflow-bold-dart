import HomePage from '@/components/pages/HomePage';

export const routes = {
  home: {
    id: 'home',
    label: 'Weather Dashboard',
    path: '/',
    icon: 'Cloud',
icon: 'Cloud',
    component: HomePage
  }
};

export const routeArray = Object.values(routes);