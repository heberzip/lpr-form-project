// STYLES
import style from "@styles/global.style";
// TYPES
import {
  CommunicationSectionType,
  CommunicationType,
  DecisionDataType,
} from "../../../types";

/******************************************************************************/
// TYPES
type CommunicationQuestionsProps = {
  section: CommunicationSectionType;
  hasWhatsapp: boolean;
  isSameAsEmergency: boolean;
  communicationData: CommunicationType;
  handleWhatsappChange: (value: boolean) => void;
  handleSameAsEmergencyChange: (value: boolean) => void;
};
/******************************************************************************/

const CommunicationQuestions = ({
  section,
  hasWhatsapp,
  isSameAsEmergency,
  communicationData,
  handleWhatsappChange,
  handleSameAsEmergencyChange,
}: CommunicationQuestionsProps) => {
  const secondQuestion = section.decisionData[0]
    .dependents[0] as DecisionDataType;

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

      <div className={style.radio.container}>
        <div
          className={
            communicationData.whatsappAvailable
              ? style.radio.question
              : style.radio.questionDisabled
          }
        >
          {secondQuestion.label}
        </div>

        <div className={style.radio.panel}>
          {secondQuestion.options.map((option) => (
            <label
              key={option.value.toString()}
              className={style.radio.label}
              htmlFor={option.label}
            >
              <input
                type="radio"
                id={option.label}
                value={option.value.toString()}
                checked={isSameAsEmergency === option.value}
                disabled={!communicationData.whatsappAvailable}
                onChange={() => handleSameAsEmergencyChange(option.value)}
                className={
                  communicationData.whatsappAvailable
                    ? style.radio.input
                    : style.radio.inputDisabled
                }
              />
              <span
                className={
                  !communicationData.whatsappAvailable
                    ? style.radio.labelDisabled
                    : isSameAsEmergency === option.value
                    ? style.radio.labelActive
                    : style.radio.label
                }
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommunicationQuestions;
