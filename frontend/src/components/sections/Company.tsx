import useSection from "../../hooks/useSection";
import style from "../../styles/global.style";
import CInfo from "../customs/CInfo";
import CSeparator from "../customs/CSeparator";

const Company = () => {
  const section = useSection();

  return (
    <section id="company" className={style.section.grid}>
      <div className={style.section.leftCol}>
        <h3>{section?.title}</h3>
        <small>{section?.description}</small>
        <CSeparator />
      </div>

      <div className={style.section.rightCol}>
        <form>
          {section?.formData.map((field) => (
            <div key={field.id} className={style.input.container}>
              <label htmlFor={field.name} className={style.input.label}>
                {field.small && (
                  <CInfo color="#309eb5" width="18" height="18" />
                )}
                {field.label}
                {field.required && (
                  <span className={style.input.required}>*</span>
                )}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className={style.input.standard}
              />
            </div>
          ))}

          <CSeparator />

          <AddressSection address={section?.address || []} />
        </form>
      </div>
    </section>
  );
};

export default Company;

type AddressType = {
  id: number;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  gridPosition: number;
  small?: string;
};

const AddressSection = ({ address }: { address: AddressType[] }) => {
  const sortedAddress = [...address].sort(
    (a, b) => a.gridPosition - b.gridPosition
  );

  return (
    <div className="my-2">
      <div className="grid grid-cols-2 gap-2">
        {sortedAddress.map((field) => (
          <div key={field.id} className={`${style.input.container}`}>
            <label htmlFor={field.name} className={style.input.label}>
              {field.small && <CInfo color="#309eb5" width="18" height="18" />}
              {field.label}
              {field.required && (
                <span className={style.input.required}> *</span>
              )}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className={style.input.standard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
