// CUSTOM COMPONENTS
import { CSeparator, CInfoCard } from "@customs/.";
// ANIMATIONS
import UnderlineHoverEffect from "@components/animations/UnderlineHoverEffect";
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
      <UnderlineHoverEffect>
        <span>{section?.title}</span>
      </UnderlineHoverEffect>
      <p className="text-gray-600 text-sm">{section?.description}</p>

      <CSeparator className="max-w-lg mt-4 mb-6" />

      {/* Let render other specoific components down below this seccion header */}
      {children}

      {/* Shows a card that contains additional info */}
      {/* about each input when user clicks the info btn*/}
      <CInfoCard />
    </div>
  );
};

export default CSectionHeader;
