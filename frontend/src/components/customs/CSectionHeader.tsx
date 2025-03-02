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

      <CSeparator className="max-w-lg" />

      <CInfoCard />
    </div>
  );
};

export default CSectionHeader;
