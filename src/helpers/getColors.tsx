import ImageColors from 'react-native-image-colors';


export const getbgColors = async( uri: string ) => {

        const colors = await ImageColors.getColors(uri, {});

        let background;


        // extrae los colores dependiendo del sistema operativo del dispositivo
        switch (colors.platform) {
            case 'android':
                // android result properties
                background = colors.dominant;

                break;
            case 'ios':
                // iOS result properties
                background = colors.background;

                break;
            default:
                throw new Error('Unexpected platform key');
            }

            return {background};
};

