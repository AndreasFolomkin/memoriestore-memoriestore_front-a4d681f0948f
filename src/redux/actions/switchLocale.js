import { SWITCH_LOCALE } from "../types";

export const switchLocale = locale => ({
  type: SWITCH_LOCALE,
  payload: { locale }
});

//добавить switchLocaleHeilTriggered и енг триггеред,
//которые будут передаваться в сагу, где сохраняются в локал сторедже (USE persisted state)
