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
import { cInputSty, cInputStyDisabled } from "@styles/styleObjs";
import { BankType } from "../../types";
import DownloadIcon from "@components/icons/DownloadIcon";

const Bank = () => {
  const {
    section,
    register,
    handleSubmit,
    formState,
    sameAcoountHolder,
    handleInputChange,
    handleRadioChange,
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

          {(section?.decisionData || []).map((field) => (
            <div key={field.id} className={style.radio.container}>
              <div className={style.radio.question}>{field.label}</div>

              <div className={style.radio.panel}>
                {field.options.map((option) => (
                  <label
                    key={option.label}
                    className={style.radio.label}
                    htmlFor={option.label}
                  >
                    <input
                      id={option.label}
                      type="radio"
                      value={option.label}
                      checked={sameAcoountHolder === option.value}
                      onChange={() => handleRadioChange(option.value)}
                      className={style.radio.input}
                    />
                    <span
                      className={`${style.radio.label} ${
                        sameAcoountHolder === option.value
                          ? style.radio.labelActive
                          : "text-gray-400"
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 w-full px-1 md:px-7">
            <div className="flex-1">
              {section?.decisionData?.[0].dependents.map((field) => (
                <CInput
                  key={field.id}
                  id={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  additionalInfo={field.additionalInfo}
                  required={field.required}
                  disabled={sameAcoountHolder}
                  sty={!sameAcoountHolder ? cInputSty : cInputStyDisabled}
                  {...register(field.name as keyof BankType)}
                  error={
                    formState.errors[field.name as keyof BankType]?.message
                  }
                  onChange={(e) =>
                    handleInputChange(
                      field.name as keyof BankType,
                      e.target.value
                    )
                  }
                />
              ))}
            </div>

            <div className="flex items-center justify-center mt-3">
              <button
                type="button"
                className="disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <DownloadIcon
                  width={35}
                  height={35}
                  className={
                    sameAcoountHolder
                      ? "text-gray-400 cursor-not-allowed"
                      : `text-zip-blue2-500 hover:text-zip-blue2-600 active:text-zip-blue2-800 active:scale-95`
                  }
                />
              </button>
            </div>
          </div>

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
