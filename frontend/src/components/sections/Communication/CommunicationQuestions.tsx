// STYLES
import style from "@styles/global.style";
// TYPES
import { CommunicationSectionType, CommunicationType } from "../../../types";

/******************************************************************************/
// TYPES
type CommunicationQuestionsProps = {
  section: CommunicationSectionType;
  hasWhatsapp: boolean;
  communicationData: CommunicationType;
  handleWhatsappChange: (value: boolean) => void;
};
/******************************************************************************/

const CommunicationQuestions = ({
  section,
  hasWhatsapp,
  handleWhatsappChange,
}: CommunicationQuestionsProps) => {
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
    </>
  );
};

export default CommunicationQuestions;
