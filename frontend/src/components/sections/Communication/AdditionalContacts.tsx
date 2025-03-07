import { CInput } from "@components/customs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "@store/store";
import {
  addContact,
  removeContact,
  selectCommunication,
} from "@store/slices/communicationSlice";
import { cInputSty } from "@styles/styleObjs";
import { getPhonePrefixFromCountry } from "@utils/helpers";
import { useSelector } from "react-redux";
import { selectCompany } from "@store/slices/companySlice";
import PhoneIcon from "@components/icons/PhoneIcon";

import EmailIcon from "@components/icons/Emailicon";
import XIcon from "@components/icons/XIcon";
import ContactIcon from "@components/icons/ContactIcon";
import AddPhoneIcon from "@components/icons/AddPhoneIcon";
import AddEmailIcon from "@components/icons/AddEmailIcon";

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
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000060] z-50">
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
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between w-xs md:w-full md:gap-4 md:px-7">
        <span className="md:ml-4 font-semibold">Additional contacts?</span>
        <div className="flex gap-4">
          <button type="button" onClick={handleAddPhone}>
            <AddPhoneIcon
              width={45}
              height={45}
              className="text-zip-blue2-500 hover:text-zip-blue2-600 active:text-zip-blue2-800 active:size-0.95 transition disabled:opacity-50 disabled:bg-gray-400"
            />
          </button>
          <button type="button" onClick={handleAddEmail}>
            <AddEmailIcon
              width={50}
              height={50}
              className="text-zip-blue2-500 hover:text-zip-blue2-600 active:text-zip-blue2-800 active:size-0.95 transition disabled:opacity-50 disabled:bg-gray-400"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-xs min-w-xs md:w-sm md:min-w-sm max-h-25 h-18 md:max-h-40 md:h-30 overflow-y-auto mt-2 mb-2 border-none border-zip-gray-500 rounded-md custom-scrollbar">
        <ul>
          {communicationData.additionalNumbers.length > 0 ||
          communicationData.additionalEmails.length > 0 ? (
            <>
              {communicationData.additionalNumbers.map((phone) => (
                <li key={phone.value} className="px-6 mb-1">
                  <ContactChip
                    contact={`${getPhonePrefixFromCountry(country.value)} - ${
                      phone.value
                    }`}
                    type="additionalPhone"
                    index={communicationData.additionalNumbers.indexOf(phone)}
                  />
                </li>
              ))}
              {communicationData.additionalEmails.map((email) => (
                <li key={email.value} className="px-6 mb-1">
                  <ContactChip
                    contact={email.value}
                    type="additionalEmail"
                    index={communicationData.additionalEmails.indexOf(email)}
                  />
                </li>
              ))}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <ContactIcon
                width={50}
                height={50}
                className="mb-1 text-gray-300"
              />
              <div className="text-center text-gray-400 text-md font-semibold">
                No additional contacts
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default AdditionalContacts;

const ContactChip = ({
  contact,
  type,
  index,
}: {
  contact: string;
  type: "additionalPhone" | "additionalEmail";
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteContact = () => {
    console.log("Delete contact");
    dispatch(removeContact({ type, index }));
  };

  return (
    <div className="flex gap-2 items-center justify-between bg-zip-blue2-100 py-1 px-4 rounded-md">
      <div className="flex gap-3 items-center">
        {type === "additionalPhone" ? (
          <PhoneIcon width={20} height={20} className="text-zip-blue2-600" />
        ) : (
          <EmailIcon width={20} height={20} className="text-zip-blue2-600" />
        )}
        <span className="text-md font-semibold text-zip-blue2-600 select-none">
          {contact}
        </span>
      </div>
      <button type="button" onClick={handleDeleteContact}>
        <XIcon
          width={12}
          height={12}
          className="text-rose-400 cursor-pointer hover:text-rose-500 active:text-rose-700 active:scale-95"
        />
      </button>
    </div>
  );
};
