import React, {useState} from 'react';
import {FlatList, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme, Text, Card, Button, Avatar, IconButton, SearchBar} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {StackNavigatorParamlist} from './types';
import axios from "axios";
import {SliderSeries} from "./components/sliderSeries";
import {Series} from "./components/series";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

type SerieProps = React.ComponentProps<typeof Series>;

function renderItem({item}: { item: SerieProps }) {
    return <Series {...item} />;
}

function keyExtractor(item: SerieProps) {
    return item.id.toString();
}

function renderCarousel({item}: { item: SerieProps }) {
    return <SliderSeries {...item} />;
}


type Props = {
    navigation?: StackNavigationProp<StackNavigatorParamlist>;
};

const getSeries = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=49f0f29739e21ecda580cd926a19075e&language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};
const getLancamentos = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=49f0f29739e21ecda580cd926a19075e&language=en-US&page=1');
        return response.data.results.slice(0, 3);
    } catch (error) {
        console.error(error);
    }
};

export const Serie = (props: Props) => {
    const [series, setSeries] = useState([]);
    const [lancamentos, setLancamentos] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    getSeries().then(movies => setSeries(movies));
    getLancamentos().then(movies => setLancamentos(movies));
    const theme = useTheme();
    const data = series.map(twittProps => ({
        ...twittProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...twittProps,
            }),
    }));

    const lanca = lancamentos.map(twittProps => ({
        ...twittProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...twittProps,
            }),
    }));

    return (
        <ScrollView style={styles.card}>
            <Text style={styles.lancamentos}>Series em Lançamento</Text>
            <View>
                <Carousel
                    layout={"default"}
                    data={lanca}
                    autoplay={true}
                    sliderWidth={400}
                    itemWidth={300}
                    renderItem={renderCarousel}/>
            </View>
            <View style={{marginBottom: 30}}>
                <Text style={styles.lista}>Lista de Series</Text>
                <OptimizedFlatList
                    contentContainerStyle={{backgroundColor: theme.colors.background}}
                    style={{backgroundColor: theme.colors.background}}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={() => (
                        <View style={{height: StyleSheet.hairlineWidth}}/>
                    )}
                />
            </View>
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
