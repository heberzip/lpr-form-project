// CUSTOM COMPONENTS
import { CSeparator, CInfoCard } from "@customs/.";
// ANIMATIONS
import UnderlineEffect from "@components/animations/UnderlineHoverEffect";
import HighlightEffect from "@animations/HighlightEffect";
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
      <UnderlineEffect>
        <HighlightEffect>
          <span>{section?.title}</span>
        </HighlightEffect>
      </UnderlineEffect>
      <p className="text-gray-600 text-sm">{section?.description}</p>

      <CSeparator className="max-w-lg mt-4 mb-6" />

      {/* Shows a card that contains additional info */}
      {/* about each input when user clicks the info btn*/}
      <CInfoCard />
    </div>
  );
};

export default CSectionHeader;
