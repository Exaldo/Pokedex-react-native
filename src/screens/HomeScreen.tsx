import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets(); // extraemos el área segura para trabajar
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();


    return (
        <>
            {/* Imágen pokebola de background */}
            <Image
                source={ require('../assets/pokebola.png')}
                style={ styles.pokebolaBG }
            />

            <View
                style={{ alignItems: 'center' }} // centramos la cards del flatlist
            >
                <FlatList
                    data={ simplePokemonList } // la información en array
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={ false } // muestra elementos de 2 en 2
                    numColumns={ 2 }
                    renderItem={ ({ item }) => ( <PokemonCard pokemon={ item } />)}

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20, // área segura + 20
                            marginBottom: top + 20, // empuja la lista hacia abajo
                            paddingBottom: 10
                        }}>Pokedex</Text>
                    )}

                    // infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={ 20}
                            color="grey"
                        />
                    )}
                />
            </View>
        </>
    );
};
