import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
    Avatar,
    Caption,
    Drawer,
    Paragraph,
    Switch,
    Text,
    Title,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';

import {PreferencesContext} from './context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerNavigationProp>;

export function DrawerContent(props: Props) {
    const paperTheme = useTheme();
    const {rtl, theme, toggleRTL, toggleTheme} = React.useContext(
        PreferencesContext
    );

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0],
    });

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                //@ts-ignore
                style={[
                    styles.drawerContent,
                    {
                        backgroundColor: paperTheme.colors.surface,
                        transform: [{translateX}],
                    },
                ]}
            >
                <View style={styles.userInfoSection}>
                    <TouchableOpacity
                        style={{marginLeft: 10}}
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    >
                        <View style={styles.container}>
                            <View style={{width: '20%', marginVertical: 20}}>
                                <Avatar.Image
                                    source={{
                                        uri:
                                            'https://image.flaticon.com/icons/png/512/149/149071.png',
                                    }}
                                    size={50}
                                />
                            </View>
                          <View style={{width: '80%', paddingLeft: 10}}>
                            <Title style={styles.title}>Fábio Neves</Title>
                            <Caption style={styles.caption}>fabiogarcia92@gmail.com</Caption>
                          </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="filmstrip"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Filmes"
                        onPress={() => {
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons name="movie-open" color={color} size={size}/>
                        )}
                        label="Series"
                        onPress={() => {
                        }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={toggleTheme}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={theme === 'dark'}/>
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={toggleRTL}>
                        <View style={styles.preference}>
                            <Text>RTL</Text>
                            <View pointerEvents="none">
                                <Switch value={rtl === 'right'}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </Animated.View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 0,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
});
