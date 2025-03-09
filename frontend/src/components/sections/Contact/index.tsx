// COMPONENTS
import ContactMainData from "./ContactMainData";
import ContactQuestion from "./ContactQuestion";
import ContactDependentFields from "./ContactDependentFields";
// CUSTOM COMPONENTS
import { CSectionHeader, CSeparator, CNavigation } from "@customs/.";
// CUSTOM HOOKS
import useContactSection from "@hooks/useContactSection";
// STORE
import { isContactFilled } from "@store/slices/contactSlice";
// STYLES
import style from "@styles/global.style";
// TYPES
import { ContactSectionType } from "../../../types";

/******************************************************************************/

const Contact = () => {
  // Custom hook with all needed functions and state handlers
  const {
    section,
    register,
    handleSubmit,
    formState,
    hasDetails,
    handleInputChange,
    handleRadioChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  } = useContactSection();

  return (
    <section id="contact" className={style.section.grid}>
      {/* Left column: Header with title and description */}
      {/* also the card that renders the additional info for inputs */}
      <CSectionHeader
        section={
          section?.base ?? { id: 0, link: "", title: "", description: "" }
        }
        className={style.section.leftCol}
      />

      {/* Right column: Form and NavBtns */}
      <div className={style.section.rightCol}>
        <form
          className={style.form.container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Maps the main form data: First Name, Last Name and Position */}
          <ContactMainData
            section={section as ContactSectionType}
            register={register}
            formState={formState}
            handleInputChange={handleInputChange}
            handleItemSelect={handleItemSelect}
            filterFn={filterFn}
          />

          <CSeparator className="max-w-lg mt-4 mb-6" />

          {/* Renders the question and radio buttons */}
          <ContactQuestion
            section={section as ContactSectionType}
            hasDetails={hasDetails}
            handleRadioChange={handleRadioChange}
          />

          {/* Renders the dependent fields */}
          <ContactDependentFields
            section={section as ContactSectionType}
            register={register}
            formState={formState}
            hasDetails={hasDetails}
            handleInputChange={handleInputChange}
          />

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />

          <footer className="flex items-center justify-center">
            <CNavigation
              isSectionFilled={isContactFilled}
              validatedFields={formState.isValid}
            />
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Contact;
