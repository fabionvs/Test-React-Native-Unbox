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
    adult: boolean,
    popularity: number,
    vote_count: number,
    video: boolean,
    poster_path: string,
    backdrop_path: string,
    original_language: string,
    original_title: string,
    genre_ids: any,
    title: string,
    vote_average: number,
    overview: string,
    release_date: string,
    onPress: (id: number) => void;
};

export const SliderMovies = (props: Props) => {
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
                    title={props.title}
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
