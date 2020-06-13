import React from 'react';
import Provider from '../Provider'
import { BaseList } from '../components/MList/BaseList';
import { CardList } from '../components/MList/CardList';

export default {
  title: 'MList'
};

export const _BaseList = () => <Provider><BaseList/></Provider>;

export const _CardList = () => <Provider><CardList/></Provider>;
