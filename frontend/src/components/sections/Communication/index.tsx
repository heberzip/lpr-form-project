// EXTERNAL MODULES
import { useSelector } from "react-redux";
// COMPONENTS
import CommunicationMainForm from "./CommunicationMainForm";
import CommunicationQuestions from "./CommunicationQuestions";
// CUSTOM COMPONENTS
import { CSectionHeader, CInput, CSeparator, CNavigation } from "@customs/.";
// CUSTOM HOOKS
import useCommunicationSection from "@hooks/useCommunicationSection";
// STORE
import { isCommunicationFilled } from "@store/slices/communicationSlice";
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
    formState,
    hasWhatsapp,
    handleInputChange,
    handleWhatsappChange,
    isSameAsEmergency,
    handleSameAsEmergencyChange,
    onSubmit,
  } = useCommunicationSection();

  const { country } = useSelector(selectCompany);

  return (
    <section id="communication" className={style.section.grid}>
      <CSectionHeader
        section={
          section?.base ?? { id: 0, link: "", title: "", description: "" }
        }
        className={style.section.leftCol}
      />

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
            onChange={(e) =>
              handleInputChange(
                section?.decisionData?.[0].dependents[1]
                  .name as keyof CommunicationType,
                e.target.value
              )
            }
          >
            {section?.decisionData?.[0].dependents[1].type === "tel" &&
              getPhonePrefixFromCountry(country.value)}
          </CInput>

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />
        </form>

        <footer className="flex items-center justify-center">
          <CNavigation
            isSectionFilled={isCommunicationFilled}
            formState={formState}
          />
        </footer>
      </div>
    </section>
  );
};

export default Communication;
