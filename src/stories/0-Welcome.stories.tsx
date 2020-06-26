import React from 'react';
import Provider from '../Provider'
import { linkTo } from '@storybook/addon-links';
import { Template } from '../components/Template'
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};

export const _Template = () => <Provider><Template/></Provider>

