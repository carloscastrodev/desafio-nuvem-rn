import jamesImg from 'assets/images/james.jpeg';
import karlaImg from 'assets/images/karla.jpeg';
import leticiaImg from 'assets/images/leticia.png';
import luizaImg from 'assets/images/luiza.jpeg';
import marioImg from 'assets/images/mario.jpeg';
import matheusImg from 'assets/images/matheus.jpeg';
import {ImageSourcePropType} from 'react-native';

function mapTaxiIdToImgUri(id: number): ImageSourcePropType | undefined {
  switch (id) {
    case 1:
      return leticiaImg;
    case 2:
      return marioImg;
    case 3:
      return luizaImg;
    case 4:
      return jamesImg;
    case 5:
      return karlaImg;
    case 6:
      return matheusImg;
    default:
      return undefined;
  }
}

export default mapTaxiIdToImgUri;
