import {Taxi} from 'infra/types/Taxi';
import mapTaxiIdToImgUri from './mapTaxiIdToImgUri';
import randFloat from './randFloat';
import randInt from './randInt';

function prepareMockJson(taxis: Taxi[]): Taxi[] {
  const postPrepare = taxis.map(taxi => {
    taxi.imageUri = mapTaxiIdToImgUri(taxi.id);
    taxi.kmRodado = 0;
    taxi.precoKm = randFloat(1, 10, 2);
    taxi.limiteKm = randInt(300, 1000);
    return taxi;
  });
  return postPrepare;
}

export default prepareMockJson;
