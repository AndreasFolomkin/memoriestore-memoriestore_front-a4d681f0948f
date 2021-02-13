import {
  INIT_FAQPAGE_TRIGGERED,
  INIT_FAQPAGE_REQUEST,
  INIT_FAQPAGE_SUCCESS,
  INIT_FAQPAGE_FAILURE
} from "../types";

export const initFaqPageTriggered = locale => ({
  type: INIT_FAQPAGE_TRIGGERED,
  payload: { locale }
});

export const initFaqPageRequest = () => ({
  type: INIT_FAQPAGE_REQUEST
});

export const initFaqPageSuccess = data => ({
  type: INIT_FAQPAGE_SUCCESS,
  payload: { data }
});

export const initFaqPageFailure = error => ({
  type: INIT_FAQPAGE_FAILURE,
  payload: { error }
});
