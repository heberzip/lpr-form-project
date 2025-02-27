// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@store/store";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
// CUSTOM COMPONENTS
import { CAutocomplete, CSeparator, CInput, CGrid } from "@customs/.";
// CUSTOM HOOKS
import useSection from "@hooks/useSection";
// STORE
import { setCompanyData, selectCompany } from "@store/slices/companySlice";
// STYLES
import style from "@styles/global.style";
// STYLES CONFIGURATION
const cInputSty = {
  container: style.input.container,
  label: style.input.label,
  required: style.input.required,
  input: style.input.standard,
};

const cGridSty = {
  ...cInputSty,
  gridContainer: style.grid.container,
};

const cAutocompleteSty = {
  ...cInputSty,
  dropdown: style.autocomplete.dropdown,
  dropdownItem: style.autocomplete.dropdownItem,
};
// DATA
import countriesData from "@data/countriesData.json";
// SCHEMAS
import { companySchema } from "@schema/sectionSchemas";

/******************************************************************************/
// TYPES
type CountryType = {
  name: string;
  code: string;
};

type CompanyType = z.infer<typeof companySchema>;

/******************************************************************************/

const Company = () => {
  const section = useSection();
  const dispatch = useAppDispatch();
  const companyData = useSelector(selectCompany);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      ...companyData,
      ...companyData.additionalFields,
    },
  });

  const handleInputChange = (name: keyof CompanyType, value: string) => {
    dispatch(setCompanyData({ [name]: value }));
    setValue(name, value);
  };

  const onSubmit = (data: CompanyType) => {
    console.log("Form Data:", data);
  };

  const handleSelect = (selectedItem: CountryType) => {
    handleInputChange("country", selectedItem.name);
    setValue("country", selectedItem.name);
  };

  const filterFn = (item: CountryType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  return (
    <section id="company" className={style.section.grid}>
      <div className={style.section.leftCol}>
        <h3>{section?.title}</h3>
        <div className="prose prose-zinc max-w-none leading-relaxed">
          <ReactMarkdown>{section?.description}</ReactMarkdown>
        </div>
        <CSeparator />
      </div>

      <div className={style.section.rightCol}>
        <form
          className={style.form.container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {section?.formMainData.map((field) => (
            <CInput
              key={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              additionalInfo={field.additionalInfo}
              sty={cInputSty}
              {...register(field.name as keyof CompanyType)}
              error={errors[field.name as keyof CompanyType]?.message}
              onChange={(e) =>
                handleInputChange(
                  field.name as keyof CompanyType,
                  e.target.value
                )
              }
            />
          ))}

          <CSeparator />

          <CGrid data={section?.formGridData || []} sty={cGridSty}>
            {(field) =>
              field.role === "select" ? (
                <CAutocomplete
                  key={field.id}
                  data={countriesData}
                  filterFn={filterFn}
                  onSelect={handleSelect}
                  placeholder={field.placeholder}
                  renderItem={(item) => item.name}
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  additionalInfo={field.additionalInfo}
                  sty={cAutocompleteSty}
                  {...register(field.name as keyof CompanyType)}
                  error={errors[field.name as keyof CompanyType]?.message}
                  onChange={(e) =>
                    handleInputChange(
                      field.name as keyof CompanyType,
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
                  {...register(field.name as keyof CompanyType)}
                  error={errors[field.name as keyof CompanyType]?.message}
                  onChange={(e) =>
                    handleInputChange(
                      field.name as keyof CompanyType,
                      e.target.value
                    )
                  }
                />
              )
            }
          </CGrid>
        </form>
        <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-3 md:hidden" />
        <CSeparator className="flex justify-center items-center w-full max-w-[90px] m-0 p-0 md:hidden" />
      </div>
    </section>
  );
};

export default Company;
