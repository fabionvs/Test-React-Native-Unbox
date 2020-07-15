import React, {useState} from 'react';
import {FlatList, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme, Text, Card, Button, Avatar, IconButton, SearchBar} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {Movie} from './components/movie';
import {SliderMovies} from './components/sliderMovies';
import {StackNavigatorParamlist} from './types';
import axios from "axios";

type TwittProps = React.ComponentProps<typeof Movie>;

function renderItem({item}: { item: TwittProps }) {
    return <Movie {...item} />;
}

function keyExtractor(item: TwittProps) {
    return item.id.toString();
}

function renderCarousel({item}: { item: TwittProps }) {
    return <SliderMovies {...item} />;
}


type Props = {
    navigation?: StackNavigationProp<StackNavigatorParamlist>;
};

const getMovies = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=49f0f29739e21ecda580cd926a19075e&language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};
const getLancamentos = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=49f0f29739e21ecda580cd926a19075e&language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const Feed = (props: Props) => {
    const [lancamentos, setLancamentos] = useState([]);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    getMovies().then(movies => setMovies(movies));
    getLancamentos().then(lancamentos => setLancamentos(movies));
    const theme = useTheme();
    const mov = movies.map(twittProps => ({
        ...twittProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...twittProps,
            }),
    }));
    const lanca = movies.map(twittProps => ({
        ...twittProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...twittProps,
            }),
    }));

    return (
        <ScrollView style={styles.card}>
            <Text style={styles.lancamentos}>Filmes em Lançamento</Text>
            <Carousel
                layout={"default"}
                data={lanca}
                autoplay={true}
                sliderWidth={400}
                itemWidth={300}
                renderItem={renderCarousel}/>
            <Text style={styles.lista}>Lista de Filmes</Text>
            <FlatList
                contentContainerStyle={{backgroundColor: theme.colors.background}}
                style={{backgroundColor: theme.colors.background}}
                data={mov}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={() => (
                    <View style={{height: StyleSheet.hairlineWidth}}/>
                )}
            />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    card: {
        padding: 20
    },
    lancamentos: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    lista: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        paddingLeft: 20,
        paddingTop: 10
    },
});
