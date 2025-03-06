// STYLES
import style from "@styles/global.style";
// TYPES
import { CommunicationSectionType, CommunicationType } from "../../../types";
import { CInput } from "@components/customs";
import { cInputSty, cInputStyDisabled } from "@styles/styleObjs";
import { FormState, UseFormRegister } from "react-hook-form";
import { getPhonePrefixFromCountry } from "@utils/helpers";

/******************************************************************************/
// TYPES
type CommunicationQuestionsProps = {
  section: CommunicationSectionType;
  hasWhatsapp: boolean;
  communicationData: CommunicationType;
  handleWhatsappChange: (value: boolean) => void;
  register: UseFormRegister<CommunicationType>;
  formState: FormState<CommunicationType>;
  country: { value: string; required: boolean };
  handleInputChange: (name: keyof CommunicationType, value: string) => void;
};
/******************************************************************************/

const CommunicationQuestions = ({
  section,
  hasWhatsapp,
  communicationData,
  handleWhatsappChange,
  register,
  formState,
  country,
  handleInputChange,
}: CommunicationQuestionsProps) => {
  const whatsappInput = section?.decisionData?.[0].dependents[0];

  return (
    <>
      {(section.decisionData || []).map((field) => (
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

      <CInput
        key={whatsappInput.name}
        id={whatsappInput.name}
        label={whatsappInput.label}
        type={whatsappInput.type}
        placeholder={whatsappInput.placeholder}
        required={whatsappInput.required}
        additionalInfo={whatsappInput.additionalInfo}
        sty={
          communicationData.whatsappAvailable ? cInputSty : cInputStyDisabled
        }
        {...register(
          section?.decisionData?.[0].dependents[0]
            .name as keyof CommunicationType
        )}
        error={
          formState.errors[
            section?.decisionData?.[0].dependents[0]
              .name as keyof CommunicationType
          ]?.message
        }
        onChange={(e) =>
          handleInputChange(
            section?.decisionData?.[0].dependents[0]
              .name as keyof CommunicationType,
            e.target.value
          )
        }
      >
        {whatsappInput.type === "tel" &&
          getPhonePrefixFromCountry(country.value)}
      </CInput>
    </>
  );
};

export default CommunicationQuestions;
