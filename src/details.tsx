import React from 'react';
import { RouteProp } from '@react-navigation/native';

import { DetailedMovie } from './components/detailedMovie';
import { StackNavigatorParamlist } from './types';

type Props = {
  route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export const Details = (props: Props) => {
  return <DetailedMovie {...props.route.params} />;
};
