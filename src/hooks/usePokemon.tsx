import { useEffect, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonFull } from "../interfaces/pokemonInterfaces";

export const usePokemon = ( id: string ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull); //Inicializamos el objeto como la interfaz

    const loadPokemon = async() => {
        const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${ id }`); // llamamos la data del API
        setPokemon( resp.data ); // seteamos la data en el estado
        setIsLoading(false); // cambiamos el loading a false
    };

    useEffect(() => {
        loadPokemon();
    }, []);

    return {
        isLoading,
        pokemon
    };

};

