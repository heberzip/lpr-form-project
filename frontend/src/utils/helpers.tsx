// DATA
import countriesData from "@data/countriesData.json";

export const getPhonePrefixFromCountry = (country: string) => {
  return countriesData.find((c) => c.name === country)?.dial_code;
};
