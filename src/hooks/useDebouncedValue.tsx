import { useEffect, useState } from "react";

export const useDebouncedValue = ( input: string = '', time: number = 500 ) => {

    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        /* Dispara el timeout cada que el input cambie */
        const timeout = setTimeout( () => {
            setDebouncedValue( input );
        }, time );

        /* Limpia el timeout anterior */
        return () => {
            clearTimeout( timeout );
        };
    }, [input, time]);


    return debouncedValue;

};
