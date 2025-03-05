// COMPONENTS
import CompanyMainForm from "./CompanyMainForm";
import CompanyGridData from "./CompanyGridData";
// CUSTOM COMPONENTS
import { CSectionHeader, CSeparator, CNavigation } from "@customs/.";
// CUSTOM HOOKS
import useCompanySection from "@hooks/useCompanySection";
// STORE
import { isComanyFilled } from "@store/slices/companySlice";
// STYLE
import style from "@styles/global.style";
// TYPES
import { CompanySectionType } from "../../../types";

/******************************************************************************/

const Company = () => {
  // Custom hook with all needed functions and state handlers
  const {
    section,
    register,
    handleSubmit,
    formState,
    handleInputChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  } = useCompanySection();

  return (
    <section id="company" className={style.section.grid}>
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
          {/* Maps the main form data: Company name, Trade name, and VAT */}
          <CompanyMainForm
            section={section as CompanySectionType}
            register={register}
            handleInputChange={handleInputChange}
            formState={formState}
          />

          <CSeparator className="max-w-lg mt-4 mb-6" />

          {/* Maps the grid data: Street address, City, Zip code, and Country */}
          {/* Uses a cAutocomplete component for the country */}
          <CompanyGridData
            section={section as CompanySectionType}
            register={register}
            formState={formState}
            handleInputChange={handleInputChange}
            handleItemSelect={handleItemSelect}
            filterFn={filterFn}
          />

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />
        </form>

        <footer className="flex items-center justify-center">
          <CNavigation isSectionFilled={isComanyFilled} formState={formState} />
        </footer>
      </div>
    </section>
  );
};

export default Company;
