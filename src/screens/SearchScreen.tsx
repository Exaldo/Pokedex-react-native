import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pokemonApi } from '../api/pokemonApi';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { styles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isFetching, simplePokemonList } = usePokemonSearch(); // llamamos los 1200 pokemon existentes y los guardamos en una lista

    /* Debouncer */
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        /* Vaciar la lista si el term es 0 */
        if ( term.length === 0 ){
            return setPokemonFiltered([]);
        }

        if ( isNaN( Number(term))  ) { //convertimos term a number y preguntamos si es un numero(isNan) regresando true[no] o false[si]
            /* Búsqueda por nombre */
            // Aplicar filtro
            setPokemonFiltered(
                simplePokemonList.filter(
                    poke => poke.name.toLowerCase().includes( term.toLocaleLowerCase() )
                    )
                );
            /* Búsqueda por ID */
            } else {
                // Guardamos la lista de pokemons encontrados por ID
                const pokemonById = simplePokemonList.find( poke => poke.id === term);

                // si pokemonById existe, retornamos la lista como un arreglo, si no, regresamos un arreglo vacio
                setPokemonFiltered(
                    ( pokemonById ) ? [ pokemonById ] : [] 
                );
            }

        }, [term]);

            /* Animación de carga  */
            if ( isFetching ){
        return <Loading />;
    }
    /* /Debouncer */

    return (
        <View style={{
                flex: 1,
                marginHorizontal: 20
            }}>

            {/* Caja de texto para buscar pokemon */}
            <SearchInput
                onDebounce= { (value) => setTerm( value )}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40, // le restamos los 20px de la izquierda y le smumamos 20px a la derecha
                    top: ( Platform.OS === 'ios' ) ? top : top + 30 // agregamos margen top dependiendo del OS
                }}
            />

            <FlatList
                data={ pokemonFiltered } // la información en array
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={ false } // muestra elementos de 2 en 2
                numColumns={ 2 }
                renderItem={ ({ item }) => ( <PokemonCard pokemon={ item } />)}

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            paddingBottom: 10,
                            marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 80 // agregamos margen top dependiendo del OS
                        }}>{ term }</Text>
                    )}

                />



        </View>
    );
};


