import { REDUX_FORM_BLUR } from "../types";

export const reduxFormBlur = (tariffName, albumPrice) => ({
  type: REDUX_FORM_BLUR,
  payload: { tariffName, albumPrice }
});
