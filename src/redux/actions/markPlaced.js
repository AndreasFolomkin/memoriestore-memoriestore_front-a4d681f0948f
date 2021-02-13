import { MARK_PLACED } from "../types";

export const markPlaced = mark => ({
  type: MARK_PLACED,
  payload: { mark }
});
