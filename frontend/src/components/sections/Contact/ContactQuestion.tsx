// STYLES
import style from "@styles/global.style";
// TYPES
import { ContactSectionType } from "../../../types";

/******************************************************************************/
// TYPES
type ContactQuestionProps = {
  section: ContactSectionType;
  hasDetails: boolean;
  handleRadioChange: (value: boolean) => void;
};
/******************************************************************************/

const ContactQuestion = ({
  section,
  hasDetails,
  handleRadioChange,
}: ContactQuestionProps) => {
  return (section.decisionData || []).map((field) => (
    <div key={field.id} className={style.radio.container}>
      {/* Question that needs to be answeres with a yes or no radiobtns */}
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
              checked={hasDetails === option.value}
              onChange={() => handleRadioChange(option.value)} // Handles the change of the radio button and dispatch the new value
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
  ));
};

export default ContactQuestion;
