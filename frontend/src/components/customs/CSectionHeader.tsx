// CUSTOM COMPONENTS
import { CSeparator, CInfoCard } from "@customs/.";
// TYPES
import { BaseSectionType } from "../../types";

/******************************************************************************/
// TYPES
type SectionHeaderProps = {
  section: BaseSectionType["base"];
  className?: string;
};
/******************************************************************************/

const CSectionHeader = ({ section, className }: SectionHeaderProps) => {
  return (
    <div className={className}>
      <h3>{section?.title}</h3>
      <p>{section?.description}</p>

      <CSeparator className="max-w-lg mt-4 mb-6" />

      <CInfoCard />
    </div>
  );
};

export default CSectionHeader;
