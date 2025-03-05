// EXTERNAL MODULES
import { useSelector } from "react-redux";
import { useState } from "react";
// COMPONENTS
import CommunicationMainForm from "./CommunicationMainForm";
import CommunicationQuestions from "./CommunicationQuestions";
// CUSTOM COMPONENTS
import { CSectionHeader, CInput, CSeparator, CNavigation } from "@customs/.";
// CUSTOM HOOKS
import useCommunicationSection from "@hooks/useCommunicationSection";
// STORE
import {
  isCommunicationFilled,
  addContact,
} from "@store/slices/communicationSlice";
import { useAppDispatch } from "@store/store";
import { selectCompany } from "@store/slices/companySlice";
// STYLES
import style from "@styles/global.style";
import { cInputSty, cInputStyDisabled } from "@styles/styleObjs";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";
// TYPES
import { CommunicationSectionType, CommunicationType } from "../../../types";

/******************************************************************************/

const Communication = () => {
  const {
    section,
    communicationData,
    register,
    handleSubmit,
    setValue,
    formState,
    hasWhatsapp,
    handleInputChange,
    handleWhatsappChange,
    isSameAsEmergency,
    handleSameAsEmergencyChange,
    onSubmit,
  } = useCommunicationSection();

  const [isOpen, setIsOpen] = useState(false);
  const [inputType, setInputType] = useState<"phone" | "email">("phone");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  const { country } = useSelector(selectCompany);

  const handleAddPhone = () => {
    setInputType("phone");
    setIsOpen(true);
    dispatch(addContact({ type: "phone", value: inputValue }));
    console.log(communicationData.additionalNumbers);
  };

  const handleAddEmail = () => {
    setInputType("email");
    setIsOpen(true);
    dispatch(addContact({ type: "email", value: inputValue }));
    console.log(communicationData.additionalEmails);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputValue("");
  };

  return (
    <section id="communication" className={style.section.grid}>
      <CSectionHeader
        section={
          section?.base ?? { id: 0, link: "", title: "", description: "" }
        }
        className={style.section.leftCol}
      ></CSectionHeader>

      <div className={style.section.rightCol}>
        <form
          className={style.form.container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Maps the main form data: Emergency phone, Reservation email */}
          <CommunicationMainForm
            section={section as CommunicationSectionType}
            register={register}
            formState={formState}
            country={country}
            handleInputChange={handleInputChange}
          />

          <CSeparator className="max-w-lg mt-4 mb-6" />

          {/* Renders the fisrt question and radio buttons */}
          <CommunicationQuestions
            section={section as CommunicationSectionType}
            hasWhatsapp={hasWhatsapp}
            isSameAsEmergency={isSameAsEmergency}
            communicationData={communicationData as never}
            handleWhatsappChange={handleWhatsappChange}
            handleSameAsEmergencyChange={handleSameAsEmergencyChange}
          />

          <CInput
            key={section?.decisionData?.[0].dependents[1].name}
            id={section?.decisionData?.[0].dependents[1].name || ""}
            label={section?.decisionData?.[0].dependents[1].label || ""}
            type={section?.decisionData?.[0].dependents[1].type || "text"}
            placeholder={section?.decisionData?.[0].dependents[1].placeholder}
            required={section?.decisionData?.[0].dependents[1].required}
            additionalInfo={
              section?.decisionData?.[0].dependents[1].additionalInfo
            }
            sty={
              !communicationData.sameAsEmergency &&
              communicationData.whatsappAvailable
                ? cInputSty
                : cInputStyDisabled
            }
            {...register(
              section?.decisionData?.[0].dependents[1]
                .name as keyof CommunicationType
            )}
            error={
              formState.errors[
                section?.decisionData?.[0].dependents[1]
                  .name as keyof CommunicationType
              ]?.message
            }
            onChange={(e) => setValue(e.target.name, e.target.value)}
          >
            {section?.decisionData?.[0].dependents[1].type === "tel" &&
              getPhonePrefixFromCountry(country.value)}
          </CInput>

          {/* Renders the additional components */}
          {/* Dialogo */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#00000070] z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 opacity-100">
                <h2 className="text-lg font-semibold mb-4">
                  {inputType === "phone" ? "Add Phone" : "Add Email"}
                </h2>

                <CInput
                  key={inputType}
                  id={inputType}
                  label={inputType === "phone" ? "Phone" : "Email"}
                  type={inputType === "phone" ? "tel" : "email"}
                  placeholder={
                    inputType === "phone"
                      ? "Enter phone number"
                      : "Enter email address"
                  }
                  required={true}
                  disabled={false}
                  {...register(inputType as keyof CommunicationType)}
                  onChange={(e) =>
                    handleInputChange(
                      inputType as keyof CommunicationType,
                      e.target.value
                    )
                  }
                  sty={cInputSty}
                >
                  {inputType === "phone" &&
                    getPhonePrefixFromCountry(country.value)}
                  {inputType === "email" && "@"}
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
                    onClick={() => {
                      console.log(`${inputType} added:`, inputValue);
                      handleClose();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="button"
              className="text-white bg-blue-500 py-1 px-6 rounded-md hover:bg-blue-600 active:bg-blue-800"
              onClick={handleAddPhone}
            >
              + Phone
            </button>
            <button
              className="text-white bg-blue-500 py-1 px-6 rounded-md hover:bg-blue-600 active:bg-blue-800"
              onClick={handleAddEmail}
            >
              + Email
            </button>
          </div>

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />

          <footer className="flex items-center justify-center">
            <CNavigation
              isSectionFilled={isCommunicationFilled}
              formState={formState}
            />
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Communication;
