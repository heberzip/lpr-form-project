// CUSTOM COMPONENTS
import { CSeparator, CInfoCard } from "@customs/.";
// TYPES
import { BaseSectionType } from "../../types";

/******************************************************************************/
// TYPES
type SectionHeaderProps = {
  section: BaseSectionType["base"];
  className?: string;
  children?: React.ReactNode;
};
/******************************************************************************/

const CSectionHeader = ({
  section,
  className,
  children,
}: SectionHeaderProps) => {
  return (
    <div className={className}>
      <span className="text-2xl font-semibold rounded-lg px-10 py-1 mb-4 text-zip-blue2-700 bg-zip-blue2-100 select-none">
        {section?.title}
      </span>
      <p className="text-gray-600 text-sm">{section?.description}</p>

      <CSeparator className="max-w-lg mt-4 mb-4" />

      {/* Let render other specoific components down below this seccion header */}
      {children}

      {/* Shows a card that contains additional info */}
      {/* about each input when user clicks the info btn*/}
      <CInfoCard />
    </div>
  );
};

export default CSectionHeader;
