import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Platform, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

/* Interface construida con tipos de StyleProp y ViewStyle propios de react native y typescript  */
interface Props {
    onDebounce: ( value: string ) => void; // recibe un string y no regresa nada
    style?: StyleProp<ViewStyle>
}


export const SearchInput = ({ style, onDebounce }:Props) => {

    /* Debounce  */
    const [textValue, setTextValue] = useState(''); // state usando para el debouncer

    const debouncedValue = useDebouncedValue( textValue, 1500 ); // custom hook de un debouncer

    useEffect(() => {
        onDebounce( debouncedValue );
    }, [debouncedValue]);
    /* / Debounce */

    return (
        <View style={{
            ...styles.container,
            ...style as any // para evitar errores de tipado
        }}>
            <View style={ styles.textBackground }>

                <TextInput
                    placeholder="Buscar pokémon"
                    style={{
                        ...styles.textInput,
                        top: Platform.OS === 'ios' ? 0 : 2 // centrar el texto del input, dependiento del OS
                    }}
                    autoCapitalize= "none"
                    autoCorrect= { false }
                    value={ textValue } // cada que se escriba algo en el input, se guarda en el state
                    onChangeText={setTextValue}
                />

                <Icon
                    name= "search-outline"
                    color="grey"
                    size={ 30 }
                />

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
});
