import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Headline, Caption, useTheme, Button, TextInput, Searchbar, Text} from 'react-native-paper';
import {StackNavigatorParamlist} from './types';
import axios from "axios";
import {Movie} from "./components/movie";

type Props = {
    route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

function renderItem({item}: { item: any }) {
    return <Movie {...item} />;
}

function keyExtractor(item: any) {
    return item.id.toString();
}

const getMovies = async (value: any) => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/search/multi?api_key=49f0f29739e21ecda580cd926a19075e&language=pt-BR&page=1', {
            params: {
                query: value
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const Search = (props: Props) => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const handleChangeInput = value => {
        getMovies(value).then(movies => setMovies(movies));
    };
    const theme = useTheme();
    const data = movies.map(twittProps => ({
        ...twittProps,
        onPress: () =>
            props.navigation &&
            props.navigation.push('Details', {
                ...twittProps,
            }),
    }));
    return (
        <View style={{height: "100%"}}>
            <View style={styles.searchBar}>
                <Searchbar
                    style={{elevation: 0}}
                    placeholder="Encontre Filmes ou Series"
                    onChangeText={handleChangeInput}
                    icon="magnify"
                />
            </View>
            <View>
                <Text style={styles.list}>Lista de Filmes</Text>
                <FlatList
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
        </View>
    );
};
const styles = StyleSheet.create({
    searchBar: {
        padding: 20,
    },
    scrollViewContent: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
    },
    list: {
        backgroundColor: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 20
    }
});
