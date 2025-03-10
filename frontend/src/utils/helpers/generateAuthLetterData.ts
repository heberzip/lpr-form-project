import { CompanyState } from "@store/slices/companySlice";
import { BankState } from "@store/slices/bankSlice";

const generateAuthLetterData = (company: CompanyState, bank: BankState) => {
  const { companyName, vat } = company;
  const { accountHolder, iban, swift, bankName } = bank;

  const data = {
    today: new Date().toLocaleDateString(),
    companyName: companyName.value,
    vat: vat.value,
    accountHolder: accountHolder.value,
    iban: iban.value,
    swift: swift.value,
    bankName: bankName.value,
    currency: "Euro (EUR | €)",
    logo: "zip_logo_png.png",
  };

  return data;
};

export default generateAuthLetterData;
