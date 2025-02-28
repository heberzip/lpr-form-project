// CUSTOM COMPONENTS
import { CSeparator, CInput, CAutocomplete } from "@customs/.";
// CUSTOM HOOKS
import useContactSection from "@hooks/useContactSection";
// STYLES
import style from "@styles/global.style";
import {
  cInputSty,
  cInputStyDisabled,
  cAutocompleteSty,
} from "@styles/styleObjs";
// DATA
import positionsData from "@data/positionsData.json";

/******************************************************************************/
// TYPES
import { ContactType } from "../../types";

/******************************************************************************/

const Contact = () => {
  const {
    section,
    register,
    handleSubmit,
    formState: { errors },
    hasDetails,
    handleInputChange,
    handleRadioChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  } = useContactSection();

  return (
    <section id="contact" className={style.section.grid}>
      <div className={style.section.leftCol}>
        <h3>{section?.title}</h3>
        <small>{section?.description}</small>
        <CSeparator />
      </div>

      <div className={style.section.rightCol}>
        <form
          className={style.form.container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {section?.formMainData.map((field) =>
            field.role === "select" ? (
              <CAutocomplete
                key={field.id}
                data={positionsData}
                filterFn={filterFn}
                onSelect={handleItemSelect}
                placeholder={field.placeholder}
                renderItem={(item) => item.position}
                label={field.label}
                required={field.required}
                additionalInfo={field.additionalInfo}
                sty={cAutocompleteSty}
                {...register(field.name as keyof ContactType)}
                error={errors[field.name as keyof ContactType]?.message}
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
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                additionalInfo={field.additionalInfo}
                sty={cInputSty}
                {...register(field.name as keyof ContactType)}
                error={errors[field.name as keyof ContactType]?.message}
                onChange={(e) =>
                  handleInputChange(
                    field.name as keyof ContactType,
                    e.target.value
                  )
                }
              />
            )
          )}
          <CSeparator />

          {(section?.desitionData || []).map((field) => (
            <div key={field.id} className={style.radio.container}>
              <div className={style.radio.question}>{field.label}</div>

              {/* Radio Buttons */}
              <div className={style.radio.panel}>
                {field.options.map((option) => (
                  <label
                    key={option.value.toString()}
                    className={style.radio.label}
                    htmlFor={field.name}
                  >
                    <input
                      type="radio"
                      name={field.name}
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

          {section.desitionData[0].dependents.map((depField) => (
            <CInput
              key={depField.id}
              label={depField.label}
              type={depField.type}
              placeholder={depField.placeholder}
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
              error={errors[depField.name as keyof ContactType]?.message}
            />
          ))}
        </form>
        <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-3 md:hidden" />
        <CSeparator className="flex justify-center items-center w-full max-w-[90px] m-0 p-0 md:hidden" />
      </div>
    </section>
  );
};

export default Contact;
