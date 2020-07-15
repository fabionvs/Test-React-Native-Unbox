import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Surface,
  Title,
  Caption,
  Avatar,
  Subheading,
  useTheme,
} from 'react-native-paper';
import color from 'color';

type Props = {
  id: number;
  name: string;
  handle: string;
  date: string;
  content: string;
  image: string;
  avatar: string;
  comments: number;
  retweets: number;
  hearts: number;
};

export const DetailedMovie = (props: Props) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  const imageBorderColor = color(theme.colors.text)
    .alpha(0.15)
    .rgb()
    .string();

  return (
    <Surface style={styles.container}>
      <Image style={styles.image} source={{uri: "https://image.tmdb.org/t/p/w500/" +props.backdrop_path }}/>
      <View style={styles.topRow}>
        <View>
          <Title>{props.title}</Title>
          <Caption style={styles.handle}>{props.overview}</Caption>
        </View>
      </View>
      <Subheading style={[styles.content, { color: contentColor }]}>
        {props.content}
      </Subheading>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    marginTop: 0
  },
  avatar: {
    marginRight: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  handle: {
    marginRight: 3,
    lineHeight: 12,
  },
  content: {
    marginTop: 25,
    fontSize: 20,
    lineHeight: 30,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 25,
    borderRadius: 20,
    width: '100%',
    height: 280,
  },
  imgTop: {
    width: '100%',
    height: 280,
  }
});
