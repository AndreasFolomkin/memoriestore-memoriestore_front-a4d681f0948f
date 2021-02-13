import {
  CHECK_PROMOCODE_SUMBITTED,
  CHECK_PROMOCODE_REQUEST,
  CHECK_PROMOCODE_SUCCESS,
  CHECK_PROMOCODE_FAILURE
} from "../types";
//НЕ ДОПИСАН ДО КОНЦА
export const checkPromocodeSubmitted = promoCode => ({
  type: CHECK_PROMOCODE_SUMBITTED,
  payload: { promoCode }
});

export const checkPromocodeRequest = () => ({
  type: CHECK_PROMOCODE_REQUEST
});

export const checkPromocodeSuccess = data => ({
  type: CHECK_PROMOCODE_SUCCESS,
  payload: { data } //придут 3 альбома
});

export const checkPromocodeFailure = error => ({
  type: CHECK_PROMOCODE_FAILURE,
  payload: { error }
});
