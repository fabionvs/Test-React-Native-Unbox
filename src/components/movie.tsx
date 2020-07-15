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

      export const Movie = (props: Props) => {
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
              <TouchableRipple onPress={() => props.onPress(props.id)}>
                  <Surface style={styles.container}>
                      <View style={styles.leftColumn}>
                          <Image style={styles.movieImg} source={{uri: "https://image.tmdb.org/t/p/w500/" +props.backdrop_path }}/>
                      </View>
                      <View style={styles.rightColumn}>
                          <View style={styles.topRow}>
                              <Title>{props.title}</Title>
                              <Caption style={[styles.handle, styles.dot]}>{'\u2B24'}</Caption>
                          </View>
                          <Text style={{color: contentColor}}>{props.overview.slice(0, 150)}</Text>
                          <View style={styles.bottomRow}>
                              <View style={styles.iconContainer}>
                                  <MaterialCommunityIcons
                                      name="star-circle"
                                      size={20}
                                      color={iconColor}
                                  />
                                  <Caption style={styles.iconDescription}>
                                      {props.vote_average}
                                  </Caption>
                              </View>
                              <View style={styles.iconContainer}>
                                  <MaterialCommunityIcons
                                      name="thumb-up-outline"
                                      size={20}
                                      color={iconColor}
                                  />
                                  <Caption style={styles.iconDescription}>
                                      {props.popularity}
                                  </Caption>
                              </View>
                              <View style={styles.iconContainer}>
                                  <MaterialCommunityIcons
                                      name="calendar"
                                      size={20}
                                      color={iconColor}
                                  />
                                  <Caption style={styles.iconDescription}>{props.release_date}</Caption>
                              </View>
                          </View>
                      </View>
                  </Surface>
              </TouchableRipple>
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
