import { camelToKebab, capital, kebabToCamel } from "./helpers";

declare global {
  interface String {
    camelToKebab(): string;
    capital(): string;
    kebabToCamel(): string;
  }
}

String.prototype.camelToKebab = function (): string {
  return camelToKebab(this.toString());
};

String.prototype.capital = function (): string {
  return capital(this.toString());
};

String.prototype.kebabToCamel = function (): string {
  return kebabToCamel(this.toString());
};
