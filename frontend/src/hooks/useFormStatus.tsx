// hooks/useFormStatus.ts
import useCompanySection from "@hooks/useCompanySection";
import useCommunicationSection from "@hooks/useCommunicationSection";
import useContactSection from "@hooks/useContactSection";
import useBankSection from "@hooks/useBankSection";
//import { useFleetSection } from "@hooks/useFleetSection";
//import { useExtrasSection } from "@hooks/useExtrasSection";
//import { useMeetingPointSection } from "@hooks/useMeetingPointSection";

export const useFormStatus = () => {
  const { formState: companyForm } = useCompanySection();
  const { formState: communicationForm } = useCommunicationSection();
  const { formState: contactForm } = useContactSection();
  const { formState: bankForm } = useBankSection();

  return [
    companyForm.isValid,
    communicationForm.isValid,
    contactForm.isValid,
    bankForm.isValid,
    false,
    false,
    false,
  ];
};
