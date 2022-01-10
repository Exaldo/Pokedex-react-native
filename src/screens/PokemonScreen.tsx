import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Tab1';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetail } from '../components/PokemonDetail';


/* las props se extienden de las definidas en el navigator, y agregamos el screen actual */
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {


    const { simplePokemon, color } = route.params;
    const { id, name, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon } = usePokemon( id );
    
    return (
        <View style={{ flex: 1}}>
            {/*  Header Container */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color
            }}>
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => navigation.pop()} // regresa a la screen anterior
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={ 35 }
                    />
                </TouchableOpacity>

                {/* Nombre del pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 40
                    }}
                >
                    { name + '\n'}#{ id }
                </Text>

                {/* Pokebola blanca */}
                <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                />

                {/* Imágen del pokemon */}
                <FadeInImage
                    uri={ picture }
                    style={ styles.pokemonImage }
                />

            </View>

            {/* Detalles y loading */}
            {
                isLoading 
                ? (
                    <View style={ styles.loadingIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                )
                : <PokemonDetail pokemon={ pokemon }/>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
