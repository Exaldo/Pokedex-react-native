import { useEffect, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true);                                                            // Lo tipamos con la interface
    const [simplePokemonList, setSimplePokemonList] = useState <SimplePokemon[]>([]);

    // Función para cargas los pokemons
    const loadPokemons = async() => {
                                          // Tipado de interface
        const resp = await pokemonApi.get <PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=1200' );
        mapPokemonList( resp.data.results );
    };

    // Funcion para convertir la data en una lista simple
    const mapPokemonList = ( pokemonList: Result[] ) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map( ({  name, url }) => {

            // https://pokeapi.co/api/v2/pokemon/15/
            const urlParts = url.split('/'); // cortamos la url en partes
            const id = urlParts[ urlParts.length - 2 ]; // guardamos la penultima posicion que es la que contiene el id del pokemon
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`; //usamos el id para obtener la imagen del pokemon

            return {id, picture, name };
        });

        setSimplePokemonList( newPokemonList ); // setea los anteriores pokemons mas los nuevos que se carguen
        setIsFetching(false);
    };

    useEffect(() => {
        loadPokemons(); // carga mas pokemon

    }, []);

    return {
        isFetching,
        simplePokemonList
    };

};

