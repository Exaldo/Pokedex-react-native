import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width; // obtemnemos el ancho del dispositivo (celular) en el que esta corriendo la App


interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard  = ({ pokemon }: Props ) => {

    const { navigate } = useNavigation(); // Hook para usar navigate
    const [bgColor, setBgColor] = useState('grey' as any);
    const  isMounted = useRef(true); // para saber el estado de los componentes cards, si estan destruidos o montados

    useEffect(() => {

        // Coloca el color del background de la tarjeta dependiendo de la imagen y del sistema operativo del dispositivo
        ImageColors.getColors( pokemon.picture, { fallback: 'grey'})
            .then( colors => {

                if ( isMounted.current === false ) return; // si la card no esta montada, no ejecuta el coloreado del background

                if ( colors.platform === 'android' ){
                    setBgColor( colors.dominant || 'grey' );
                } else if ( colors.platform === 'ios') {
                    setBgColor( colors.background || 'grey');
                }
            });
            // esta función se dispara cuando el componente se desmonta
            return () => {
                isMounted.current = false;
            };
    }, []);


    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ () => navigate('PokemonScreen' as never, {
                simplePokemon: pokemon,
                color: bgColor
            } as never)}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4, // 40% de la pantalla
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image
                        source={ require('../assets/pokebola-blanca.png')}
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});
