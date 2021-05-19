import {Taxi} from 'infra/types/Taxi';
import getTaxiEarning from './getTaxiEarning';

function sortTaxisByEarningsDesc(taxis: Taxi[]): Taxi[] {
  return [...taxis].sort((curr, next) => {
    const currentEarning = getTaxiEarning(curr);

    const nextEarning = getTaxiEarning(next);
    return nextEarning - currentEarning;
  });
}

export default sortTaxisByEarningsDesc;
