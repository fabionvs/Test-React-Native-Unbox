import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';

import overlay from './overlay';
import { Feed } from './feed';
import { StackNavigatorParamlist } from './types';
import {Search} from "./search";
import {Serie} from "./serie";

const Tab = createMaterialBottomTabNavigator();

type Props = {
  route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
};

export const BottomTabs = (props: Props) => {
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : 'Feed';

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline';
      break;
    default:
      icon = 'feather';
      break;
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Filmes"
          component={Feed}
          options={{
            tabBarIcon: 'filmstrip',
            tabBarColor,
          }}
        />
          <Tab.Screen
              name="Series"
              component={Serie}
              options={{
                  tabBarIcon: 'movie-open',
                  tabBarColor,
              }}
          />
          <Tab.Screen
              name="Procurar"
              component={Search}
              options={{
                  tabBarIcon: 'magnify',
                  tabBarColor,
              }}
          />
      </Tab.Navigator>
    </React.Fragment>
  );
};
