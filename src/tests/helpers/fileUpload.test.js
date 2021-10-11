import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'jgnavas', 
    api_key: '846655783228931', 
    api_secret: 'KyBWGH8_gbdlwkGSmC57QvHhTBQ',
    secure: true
});

describe('Tests on fileUpload.js', () => {

    test('Should upload a file and return the url', async () => {
        
        const resp = await fetch('https://pbs.twimg.com/profile_images/1355730883739791365/Jozka2px_400x400.jpg');
        const blob = await resp.blob();
        
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        //Borrar imagen
        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg','');
        cloudinary.v2.api.delete_resources(imageId, {}, () => {});

    });

    test('Should return an error', async () => {
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe(null);

    });

});