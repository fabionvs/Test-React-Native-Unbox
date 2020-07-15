import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Appbar, Avatar, useTheme, Searchbar} from 'react-native-paper';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import {BottomTabs} from './bottomTabs';
import {Details} from './details';
import {StackNavigatorParamlist} from './types';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isShowingSearchBar, setIsShowingSearchBar] = React.useState(false);

    const _handleSearch = () => {
        setIsShowingSearchBar(!isShowingSearchBar);
    };

    const onChangeSearch = query => setSearchQuery(query);


    return (
        <Stack.Navigator
            initialRouteName="FeedList"
            headerMode="screen"
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    const {options} = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name;

                    return (
                        <Appbar.Header
                            theme={{colors: {primary: theme.colors.surface}}}
                        >
                            {previous ? (
                                <Appbar.BackAction
                                    onPress={navigation.goBack}
                                    color={theme.colors.primary}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{marginLeft: 10}}
                                    onPress={() => {
                                        ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                                    }}
                                >
                                    <FontAwesome5 name="bars" size={18} color="#999"/>
                                </TouchableOpacity>
                            )}
                            <Appbar.Content
                                title={
                                    title === 'Feed' ? (
                                        <MaterialCommunityIcons
                                            style={{marginRight: 10}}
                                            name="movie-open"
                                            size={40}
                                            color={theme.colors.primary}
                                        />

                                    ) : (
                                        title
                                    )
                                }
                                titleStyle={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: theme.colors.primary,
                                }}
                            />
                        </Appbar.Header>

                    );
                },
            }}
        >
            <Stack.Screen
                name="FeedList"
                component={BottomTabs}
                options={({route}) => {
                    console.log('!@# options', {route});
                    const routeName = route.state
                        ? route.state.routes[route.state.index].name
                        : 'Feed';
                    return {headerTitle: routeName};
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{headerTitle: 'Go Back'}}
            />
        </Stack.Navigator>

    );
};
