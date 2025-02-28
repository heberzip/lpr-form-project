export const getPhonePrefixFromCountry = (country: string) => {
  switch (country) {
    case "Spain":
      return "+34";
    case "France":
      return "+33";
    case "Italy":
      return "+39";
    case "Germany":
      return "+49";
    case "Netherlands":
      return "+31";
    case "Belgium":
      return "+32";
    case "Portugal":
      return "+351";
    case "Luxembourg":
      return "+352";
    case "Ireland":
      return "+353";
    case "Greece":
      return "+30";
    case "Hungary":
      return "+36";
    case "Poland":
      return "+48";
    case "Romania":
      return "+40";
    case "Bulgaria":
      return "+359";
    case "Croatia":
      return "+385";
    case "Czech Republic":
      return "+420";
    case "Slovakia":
      return "+421";
    case "Slovenia":
      return "+386";
    case "Estonia":
      return "+372";
    case "Latvia":
      return "+371";
    case "Lithuania":
      return "+370";
    default:
      return "";
  }
};
