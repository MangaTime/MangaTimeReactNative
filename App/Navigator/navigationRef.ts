import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

const navigate = (name: string, params: any): void =>
  navigationRef.current?.navigate(name, params);

export default {
  navigate,
};
