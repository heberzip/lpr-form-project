// EXTERNAL MODULES
/*import { useEffect } from "react";
import { useForm, DefaultValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { ZodSchema } from "zod";
import { PayloadAction } from "@reduxjs/toolkit";*/

/******************************************************************************/
// 📌 TIPOS GENÉRICOS PARA HACER EL HOOK REUTILIZABLE
/*type UseSectionFormProps<TFormData extends Record<string, any>> = {
  action: (payload: PayloadAction<{ key: keyof TFormData; value: string }>) => void;
  selector: (state: any) => TFormData;
  schema: ZodSchema<TFormData>;
  selectionField: Path<TFormData>;
};

const useSectionForm = <TFormData extends Record<string, any>>({
  action,
  selector,
  schema,
  selectionField,
}: UseSectionFormProps<TFormData>) => {
  const section = useSection();
  const dispatch = useAppDispatch();
  const sectionData = useSelector(selector);

  // 🔹 Transformar `sectionData` en un objeto plano para React Hook Form
  const parsedDefaultValues: DefaultValues<TFormData> = Object.fromEntries(
    Object.entries(sectionData).map(([key, field]) => [key, field.value])
  ) as DefaultValues<TFormData>;

  // 🔹 Inicializar react-hook-form con los valores del estado global
  const {
    register,
    watch,
    handleSubmit,
    formState,
    setValue,
    reset,
    trigger,
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: parsedDefaultValues,
    mode: "onChange",
  });

  // 🔥 Asegurar que `defaultValues` se actualicen dinámicamente
  useEffect(() => {
    reset(parsedDefaultValues);
    trigger();
  }, [sectionData, reset, trigger]);

  // 🔹 Manejar cambios en inputs
  const handleInputChange = (name: Path<TFormData>, value: string) => {
    dispatch(action({ key: name, value })); // 👈 Dispatch corregido con Redux PayloadAction
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
    trigger();
  };

  // 🔹 Manejar selección en dropdown evitando valores `null`
  const handleItemSelect = (selectedItem: { name: string } | null) => {
    if (selectedItem && selectedItem.name) {
      handleInputChange(selectionField, selectedItem.name);
    }
  };

  // 🔹 Enviar datos del formulario
  const onSubmit = (data: TFormData) => {
    console.log("Form Data:", data);
  };

  return {
    section,
    register,
    watch,
    handleSubmit,
    formState,
    handleInputChange,
    handleItemSelect,
    onSubmit,
  };
};

export default useSectionForm;*/
