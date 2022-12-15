import { User, City } from '@prisma/client';
import { UserDataResponse } from '@responses/user';
import { toCityResponse } from './city';

export function toUserCityResponse(
  user: User & { city: City }
): UserDataResponse {
  return {
    ...toUserResponse(user),
    city: toCityResponse(user.city),
  };
}

export function toUserResponse(user: User): UserDataResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
