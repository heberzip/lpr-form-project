import { CInput } from "@components/customs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "@store/store";
import {
  addContact,
  selectCommunication,
} from "@store/slices/communicationSlice";
import { cInputSty } from "@styles/styleObjs";
import { getPhonePrefixFromCountry } from "@utils/helpers";
import { useSelector } from "react-redux";
import { selectCompany } from "@store/slices/companySlice";

const AdditionalContacts = () => {
  const { register, getValues, setValue } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [inputType, setInputType] = useState<
    "additionalPhone" | "additionalEmail"
  >("additionalPhone");

  const dispatch = useAppDispatch();
  const { country } = useSelector(selectCompany);
  const communicationData = useSelector(selectCommunication);

  const handleAddPhone = () => {
    setInputType("additionalPhone");
    setIsOpen(true);
  };

  const handleAddEmail = () => {
    setInputType("additionalEmail");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValue(inputType, "");
  };

  const handleSave = () => {
    const inputValue = getValues(inputType);

    if (!inputValue) return null;
    dispatch(addContact({ type: inputType, value: inputValue }));
    handleClose();

    console.log(communicationData.additionalEmails);
    console.log(communicationData.additionalNumbers);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000070] z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 opacity-100">
            <CInput
              key={inputType}
              id={inputType}
              label={
                inputType === "additionalPhone"
                  ? "Add a phone number"
                  : "Add an email address"
              }
              type={inputType === "additionalPhone" ? "tel" : "email"}
              placeholder={
                inputType === "additionalPhone"
                  ? "Enter phone number"
                  : "Enter email address"
              }
              disabled={false}
              {...register(inputType)}
              sty={cInputSty}
            >
              {inputType === "additionalPhone" &&
                getPhonePrefixFromCountry(country.value)}
              {inputType === "additionalEmail" && "@"}
            </CInput>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button onClick={handleAddPhone}>+ Phone</button>
        <button onClick={handleAddEmail}>+ Email</button>
      </div>

      <ul>
        {communicationData.additionalNumbers.map((phone) => (
          <li key={phone.value}>{`phone: ${phone.value}`}</li>
        ))}
        {communicationData.additionalEmails.map((email) => (
          <li key={email.value}>{`email: ${email.value}`}</li>
        ))}
      </ul>
    </>
  );
};

export default AdditionalContacts;
