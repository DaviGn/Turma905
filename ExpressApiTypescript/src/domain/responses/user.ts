import { CityResponse } from './city';

export interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  city?: CityResponse;
}
