// EXTERNAL MODULES
import ReactMarkdown from "react-markdown";
// CUSTOM COMPONENTS
import { CAutocomplete, CSeparator, CInput, CGrid } from "@customs/.";
// CUSTOM HOOKS
import useCompanySection from "@hooks/useCompanySection";
// STYLE
import style from "@styles/global.style";
import { cInputSty, cGridSty, cAutocompleteSty } from "@styles/styleObjs";
// DATA
import countriesData from "@data/countriesData.json";

/******************************************************************************/
// TYPES
import { CompanyType } from "../../types";

/******************************************************************************/

const Company = () => {
  const {
    section,
    register,
    handleSubmit,
    formState: { errors },
    handleInputChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  } = useCompanySection();

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
                  onSelect={handleItemSelect}
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
