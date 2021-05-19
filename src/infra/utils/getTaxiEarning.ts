import {Taxi} from 'infra/types/Taxi';

function getTaxiEarning(taxi: Taxi): number {
  if (Number.isFinite(taxi.kmRodado) && Number.isFinite(taxi.precoKm)) {
    return (taxi.kmRodado as number) * (taxi.precoKm as number);
  }
  throw new Error('kmRodado e precoKm devem ser números.');
}

export default getTaxiEarning;
