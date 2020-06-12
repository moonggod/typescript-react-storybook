import React from 'react';
// import { action } from '@storybook/addon-actions';
import { BaseList } from '../components/MList/BaseList';
import { CardList } from '../components/MList/CardList';

export default {
  title: 'MList'
};

export const _BaseList = () => <BaseList/>;

export const _CardList = () => <CardList/>;
