import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
    Surface,
    Title,
    Caption,
    Text,
    Avatar,
    TouchableRipple,
    useTheme,
    Card,
    IconButton,
} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import color from 'color';

type Props = {
    id: number;
    original_name: string,
    genre_ids: any,
    name: string,
    popularity: number,
    origin_country: any,
    vote_count: number,
    first_air_date: string,
    backdrop_path: string,
    original_language: string,
    vote_average: number,
    overview: string,
    poster_path: any,
    onPress: (id: number) => void;
};

export const SliderSeries = (props: Props) => {
    const theme = useTheme();

    const iconColor = color(theme.colors.text)
        .alpha(0.54)
        .rgb()
        .string();

    const contentColor = color(theme.colors.text)
        .alpha(0.8)
        .rgb()
        .string();

    const imageBorderColor = color(theme.colors.text)
        .alpha(0.15)
        .rgb()
        .string();

    return (
        <TouchableOpacity onPress={() => props.onPress(props.id)}>
            <Card>
                <Card.Cover source={{uri: "https://image.tmdb.org/t/p/w500/" + props.backdrop_path}}/>
                <Card.Title
                    title={props.name}
                    right={(props) => <IconButton {...props} icon="arrow-right-drop-circle"/>}
                />
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingRight: 15,
    },
    leftColumn: {
        width: 100,
        alignItems: 'center',
        padding: 10
    },
    rightColumn: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    handle: {
        marginRight: 3,
    },
    dot: {
        fontSize: 3,
    },
    image: {
        borderWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        borderRadius: 20,
        width: '100%',
        height: 150,
    },
    bottomRow: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDescription: {
        marginLeft: 2,
        lineHeight: 20,
        fontSize: 15
    },
    movieImg: {
        width: "100%",
        height: 100,
    }
});
