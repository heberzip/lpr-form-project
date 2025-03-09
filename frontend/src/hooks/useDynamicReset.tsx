import { useEffect, useState } from "react";
import { FieldValues, UseFormReset, UseFormTrigger } from "react-hook-form";

type UseDynamicResetProps<T extends FieldValues> = {
  parsedDefaultValues: T;
  resetCondition: boolean;
  reset: UseFormReset<T>;
  trigger: UseFormTrigger<T>;
  resetFields?: Partial<T>;
  isFilled?: boolean;
};

const useDynamicReset = <T extends FieldValues>({
  parsedDefaultValues,
  resetCondition,
  reset,
  trigger,
  resetFields = {},
  isFilled = false,
}: UseDynamicResetProps<T>) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (resetCondition) {
      reset({
        ...parsedDefaultValues,
        ...resetFields,
      });
    } else {
      reset(parsedDefaultValues as T & FieldValues);
    }

    if (isFirstLoad) {
      setIsFirstLoad(false);
      if (isFilled) trigger();
    } else {
      trigger();
    }
  }, [resetCondition, reset, trigger]); // eslint-disable-line
};

export default useDynamicReset;
