// EXTERNAL MODULES
import { useSelector } from "react-redux";
// CUSTOM COMPONENTS
import { CSectionHeader, CInput, CSeparator, CNavigation } from "@customs/.";
// CUSTOM HOOKS
import useCommunicationSection from "@hooks/useCommunicationSection";
// STORE
import { isCommunicationFilled } from "@store/slices/communicationSlice";
import { selectCompany } from "@store/slices/companySlice";
// ANIMATIONS
import SectionTransition from "@animations/SectionTransition";
// STYLES
import style from "@styles/global.style";
import { cInputSty } from "@styles/styleObjs";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";

/******************************************************************************/
// TYPES
import { CommunicationType } from "../../types";
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
          {section?.formMainData.map((field) => (
            <CInput
              key={field.id}
              id={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              additionalInfo={field.additionalInfo}
              sty={cInputSty}
              {...register(field.name as keyof CommunicationType)}
              error={
                formState.errors[field.name as keyof CommunicationType]?.message
              }
              onChange={(e) =>
                handleInputChange(
                  field.name as keyof CommunicationType,
                  e.target.value
                )
              }
            >
              {field.type === "tel" && getPhonePrefixFromCountry(country.value)}
              {field.type === "email" && "@"}
            </CInput>
          ))}

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
                      checked={hasWhatsapp === option.value}
                      onChange={() => handleWhatsappChange(option.value)}
                      className={style.radio.input}
                    />
                    <span
                      className={`${style.radio.label} ${
                        hasWhatsapp === option.value
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

          {communicationData.whatsappAvailable && (
            <SectionTransition>
              <div className={style.radio.container}>
                <div className={style.radio.question}>
                  {section?.desitionData?.[0].dependents[0].label}
                </div>

                <div className={style.radio.panel}>
                  {section?.desitionData?.[0].dependents?.[0].options.map<
                    { label: string; value: boolean }[]
                  >((option: { label: string; value: boolean }) => (
                    <label
                      key={option.value.toString()}
                      className={style.radio.label}
                      htmlFor={section?.desitionData?.[0].dependents[0].name}
                    >
                      <input
                        type="radio"
                        id={section?.desitionData?.[0].dependents[0].name}
                        value={option.value.toString()}
                        checked={isSameAsEmergency === option.value}
                        onChange={() =>
                          handleSameAsEmergencyChange(option.value)
                        }
                        className={style.radio.input}
                      />
                      <span
                        className={`${style.radio.label} ${
                          isSameAsEmergency === option.value
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
            </SectionTransition>
          )}

          {!communicationData.sameAsEmergency && (
            <SectionTransition>
              <CInput
                key={section?.desitionData?.[0].dependents[1].name}
                id={section?.desitionData?.[0].dependents[1].name || ""}
                label={section?.desitionData?.[0].dependents[1].label || ""}
                type={section?.desitionData?.[0].dependents[1].type || "text"}
                placeholder={
                  section?.desitionData?.[0].dependents[1].placeholder
                }
                required={section?.desitionData?.[0].dependents[1].required}
                additionalInfo={
                  section?.desitionData?.[0].dependents[1].additionalInfo
                }
                sty={cInputSty}
                {...register(
                  section?.desitionData?.[0].dependents[1]
                    .name as keyof CommunicationType
                )}
                error={
                  formState.errors[
                    section?.desitionData?.[0].dependents[1]
                      .name as keyof CommunicationType
                  ]?.message
                }
                onChange={(e) =>
                  handleInputChange(
                    section?.desitionData?.[0].dependents[1]
                      .name as keyof CommunicationType,
                    e.target.value
                  )
                }
              >
                {section?.desitionData?.[0].dependents[1].type === "tel" &&
                  getPhonePrefixFromCountry(country.value)}
              </CInput>
            </SectionTransition>
          )}

          <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-2 md:hidden" />
          <CSeparator className="flex justify-center items-center w-full max-w-[90px] mb-4 p-0 md:hidden" />

          <CNavigation
            isSectionFilled={isCommunicationFilled}
            formState={formState}
          />
        </form>
      </div>
    </section>
  );
};

export default Communication;
