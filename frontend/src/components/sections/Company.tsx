import useSection from "../../hooks/useSection";
import style from "../../styles/global.style";
import CAutocomplete from "../customs/CAutocomplete";
import CInfo from "../customs/CInfo";
import CSeparator from "../customs/CSeparator";

import countriesData from "../../assets/countriesData.json";

type CountryType = {
  name: string;
  code: string;
};

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
              <div className="flex gap-2">
                {field.small && (
                  <CInfo color="#309eb5" width="18" height="18" />
                )}
                <label htmlFor={field.name} className={style.input.label}>
                  {field.label}
                  {field.required && (
                    <span className={style.input.required}>*</span>
                  )}
                </label>
              </div>
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
  autocomplete?: boolean;
};

const AddressSection = ({ address }: { address: AddressType[] }) => {
  const sortedAddress = [...address].sort(
    (a, b) => a.gridPosition - b.gridPosition
  );

  const filterFn = (item: CountryType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleSelect = (selectedItem: CountryType) => {
    console.log(selectedItem);
  };

  return (
    <div className="my-1">
      <div className="grid grid-cols-2 gap-x-4">
        {sortedAddress.map((field) => (
          <div key={field.id} className={`${style.input.container}`}>
            <div className="flex gap-2">
              {field.small && <CInfo color="#309eb5" width="18" height="18" />}
              <label htmlFor={field.name} className={style.input.label}>
                {field.label}
                {field.required && (
                  <span className={style.input.required}> *</span>
                )}
              </label>
            </div>
            {field.autocomplete ? (
              <CAutocomplete
                data={countriesData}
                filterFn={filterFn}
                onSelect={handleSelect}
                placeholder={field.placeholder}
                renderItem={(item) => item.name}
                className={style.input.standard}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className={style.input.standard}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
