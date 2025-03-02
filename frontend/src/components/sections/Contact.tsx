// EXTERNAL MODULES
import { useSelector } from "react-redux";
// CUSTOM COMPONENTS
import {
  CSectionHeader,
  CInput,
  CAutocomplete,
  CSeparator,
  CGrid,
  CNavigation,
} from "@customs/.";
// CUSTOM HOOKS
import useContactSection from "@hooks/useContactSection";
// STORE
import { selectCompany } from "@store/slices/companySlice";
import { isContactFilled } from "@store/slices/contactSlice";
// STYLES
import style from "@styles/global.style";
import {
  cInputSty,
  cInputStyDisabled,
  cAutocompleteSty,
} from "@styles/styleObjs";
// DATA
import positionsData from "@data/positionsData.json";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";

/******************************************************************************/
// TYPES
import { ContactType } from "../../types";

/******************************************************************************/

const Contact = () => {
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

  const { country } = useSelector(selectCompany);

  return (
    <section id="contact" className={style.section.grid}>
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
          <CGrid data={section?.formMainData || []}>
            {(field) =>
              field.role === "select" ? (
                <CAutocomplete
                  key={field.id}
                  data={positionsData}
                  filterFn={filterFn}
                  onSelect={handleItemSelect}
                  placeholder={field.placeholder}
                  renderItem={(item) => item.position}
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  additionalInfo={field.additionalInfo}
                  sty={cAutocompleteSty}
                  {...register(field.name as keyof ContactType)}
                  error={
                    formState.errors[field.name as keyof ContactType]?.message
                  }
                  onChange={(e) =>
                    handleInputChange(
                      field.name as keyof ContactType,
                      e.target.value
                    )
                  }
                />
              ) : (
                <CInput
                  key={field.id}
                  id={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  additionalInfo={field.additionalInfo}
                  sty={cInputSty}
                  {...register(field.name as keyof ContactType)}
                  error={
                    formState.errors[field.name as keyof ContactType]?.message
                  }
                  onChange={(e) =>
                    handleInputChange(
                      field.name as keyof ContactType,
                      e.target.value
                    )
                  }
                />
              )
            }
          </CGrid>

          <CSeparator className="max-w-lg mt-4 mb-6" />

          {(section?.desitionData || []).map((field) => (
            <div key={field.id} className={style.radio.container}>
              <div className={style.radio.question}>{field.label}</div>

              <div className={style.radio.panel}>
                {field.options.map((option) => (
                  <label
                    key={option.value.toString()}
                    className={style.radio.label}
                    htmlFor={field.name}
                  >
                    <input
                      type="radio"
                      id={field.name}
                      value={option.value.toString()}
                      checked={hasDetails === option.value}
                      onChange={() => handleRadioChange(option.value)}
                      className={style.radio.input}
                    />
                    <span
                      className={`${style.radio.label} ${
                        hasDetails === option.value
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

          {section?.desitionData?.[0].dependents.map((depField) => (
            <CInput
              key={depField.id}
              id={depField.name}
              label={depField.label}
              type={depField.type}
              placeholder={depField.placeholder}
              additionalInfo={depField.additionalInfo}
              required={depField.required}
              disabled={!hasDetails}
              sty={hasDetails ? cInputSty : cInputStyDisabled}
              {...register(depField.name as keyof ContactType)}
              onChange={(e) =>
                handleInputChange(
                  depField.name as keyof ContactType,
                  e.target.value
                )
              }
              error={
                formState.errors[depField.name as keyof ContactType]?.message
              }
            >
              {depField.type === "tel" &&
                getPhonePrefixFromCountry(country.value)}
              {depField.type === "email" && "@"}
            </CInput>
          ))}

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />

          <CNavigation
            isSectionFilled={isContactFilled}
            formState={formState}
          />
        </form>
      </div>
    </section>
  );
};

export default Contact;
