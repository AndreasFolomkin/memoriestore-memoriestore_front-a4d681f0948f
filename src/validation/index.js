import { resolve } from "url";

export const required = value => (value ? undefined : "Value is required");
export const requiredCheck = value =>
  value ? undefined : "Accept privacy policy";
export const minLength = value =>
  value.length < 10 ? "Minimum 10 characters" : undefined;
export const maxLength = value =>
  value.length > 20 ? "Value is too long" : undefined;
export const matchesPassword = (value, allValues) =>
  value === allValues.password ? undefined : "Password must match";
export const isValidPhone = value =>
  value &&
  !/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/i.test(
    value
  )
    ? "Incorrect phone number"
    : undefined;
export const isValidEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Incorrect email"
    : undefined;
