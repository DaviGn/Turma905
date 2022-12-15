import { City } from '@prisma/client';
import { CityResponse } from '@responses/city';

export function toCityResponse(city: City): CityResponse {
  return {
    id: city.id,
    name: city.name,
    uf: city.uf,
  };
}
