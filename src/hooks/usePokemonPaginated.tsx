import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true);
                                                               // Lo tipamos con la interface
    const [simplePokemonList, setSimplePokemonList] = useState <SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40'); // Guardamos el url en ref para evitar renderizados extras

    // Función para cargas los pokemons
    const loadPokemons = async() => {

        setIsLoading(true);
                                          // Tipado de interface
        const resp = await pokemonApi.get <PokemonPaginatedResponse>( nextPageUrl.current );
        nextPageUrl.current = resp.data.next; // guardamos la data de next que proviene del api, para cargar el siguiente listado de pokemons
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

        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ]); // setea los anteriores pokemons mas los nuevos que se carguen
        setIsLoading(false);
    };

    useEffect(() => {
        loadPokemons(); // carga mas pokemon

    }, []);

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    };

};

