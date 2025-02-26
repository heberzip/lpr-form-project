// CUSTOM COMPONENTS
import { CInput } from "@customs/.";

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
        field.role === "select" ? (
          children && typeof children === "function" ? (
            children(field)
          ) : null
        ) : (
          <CInput
            key={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            additionalInfo={field.additionalInfo}
            sty={sty}
          />
        )
      )}
    </div>
  );
};

export default CGrid;
