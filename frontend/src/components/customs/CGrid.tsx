// TYPES
import { CInputStyType } from "./CInput";

/******************************************************************************/
// TYPES
export type CGridStyType = CInputStyType & {
  gridContainer?: string;
};

type GridItemType = {
  id: number;
  name: string;
  label: string;
  type: string;
  role?: string;
  placeholder: string;
  required: boolean;
  gridPosition: number;
  additionalInfo?: string;
};

type CGridProps = {
  data: GridItemType[];
  children?: (field: GridItemType) => React.ReactNode;
  sty?: CGridStyType;
};

/******************************************************************************/

const CGrid = ({ data, children, sty }: CGridProps) => {
  const sortedData = [...data].sort((a, b) => a.gridPosition - b.gridPosition);

  return (
    <div className={sty?.gridContainer}>
      {sortedData.map((field) =>
        children && typeof children === "function" ? children(field) : null
      )}
    </div>
  );
};

export default CGrid;
