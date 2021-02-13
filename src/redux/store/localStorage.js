import { v4 } from "node-uuid";
import store from "./store";

export const loadState = () => {
  try {
    const serializedState = {
      isAuthorized: sessionStorage.getItem("isAuthorized"),
      userId: localStorage.getItem("userId"),
      locale: localStorage.getItem("locale")
    };
    if (
      serializedState.isAuthorized === null &&
      serializedState.userId === null &&
      serializedState.locale === null
    ) {
      return undefined;
    }
    return {
      isAuthorized: JSON.parse(serializedState.isAuthorized),
      userId: JSON.parse(serializedState.userId),
      locale: JSON.parse(serializedState.locale)
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  const existState = {
    isAuthorized: sessionStorage.getItem("isAuthorized"),
    userId: localStorage.getItem("userId"),
    locale: localStorage.getItem("locale")
  };
  if (true) {
    try {
      const serializedState = {
        isAuthorized:
          state.checkPromocodeLogin.data.promocode ||
          sessionStorage.getItem("isAuthorized"),
        userId: localStorage.getItem("userId") || v4(),
        locale: localStorage.getItem("locale") || state.switchLocale.locale
      };
      sessionStorage.setItem("isAuthorized", serializedState.isAuthorized);
      localStorage.setItem("userId", serializedState.userId);
      localStorage.setItem("locale", serializedState.locale);
    } catch (err) {}
  }
};
