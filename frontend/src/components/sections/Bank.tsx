import {
  CInput,
  CNavigation,
  CSectionHeader,
  CSeparator,
} from "@components/customs";
// CUSTOM HOOKS
import useBankSection from "@hooks/useBankSection";
// STORE
import { isBankFilled } from "@store/slices/bankSlice";
// STYLES
import style from "@styles/global.style";
// TYPES
import { cInputSty } from "@styles/styleObjs";
import { BankType } from "../../types";

const Bank = () => {
  const {
    section,
    register,
    handleSubmit,
    formState,
    handleInputChange,
    onSubmit,
  } = useBankSection();

  return (
    <section id="bank" className={style.section.grid}>
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
          {section?.formMainData.map((field) => (
            <CInput // Renders the input component
              key={field.id}
              id={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              additionalInfo={field.additionalInfo}
              sty={cInputSty}
              {...register(field.name as keyof BankType)}
              error={formState.errors[field.name as keyof BankType]?.message}
              onChange={(e) =>
                handleInputChange(field.name as keyof BankType, e.target.value)
              }
            />
          ))}

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />

          <footer className="flex items-center justify-center">
            <CNavigation isSectionFilled={isBankFilled} formState={formState} />
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Bank;
