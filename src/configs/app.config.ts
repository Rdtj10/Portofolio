import React from 'react';

interface NavigationMenuConfig {
  items: {
    title: string;
    id: string;
    icon?: React.ReactNode;
    description?: string;
    children?: NavigationMenuConfig['items'];
  }[];
}

export const navigationMenuConfig: NavigationMenuConfig = {
  items: [
    {
      title: 'Home',
      id: 'hero',
      description: 'Home',
    },
    {
      title: 'Projects',
      id: 'index',
      description: 'Projects',
    },
    // {
    //   title: 'About',
    //   id: 'about',
    //   description: 'About Me',
    // },
    {
      title: 'Contact',
      id: 'contact',
      description: 'Contact Me',
    },
  ],
};