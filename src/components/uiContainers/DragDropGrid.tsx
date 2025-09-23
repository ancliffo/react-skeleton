import type { DragDropGridProps } from "../../types/customTypes/container/DragDropGridTypes";
import GridLayout from "react-grid-layout";

export function DragDropGrid<T extends { id: string | number }>({
  gridContentDescriptor,
  gridData,
  gridWidth,
  renderItem,
  compactType,
  layout,
  colCount,
  onLayoutChange,
  rowHeight,
  dragHandleClass,
}: DragDropGridProps<T>) {
  return (
    <div>
      <GridLayout
        // verticalCompact={false}
        draggableHandle={"." + dragHandleClass}
        className="layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={colCount}
        rowHeight={rowHeight}
        width={gridWidth}
        compactType={compactType}
      >
        {gridData &&
          gridData.length > 0 &&
          gridData.map((item: T) => (
            <div key={gridContentDescriptor + "_" + item.id + "_" + Object.keys(item).join("_")}>
              {renderItem(
                item,
                gridContentDescriptor + "_" + item.id + "_" + Object.keys(item).join("_"),
              )}
            </div>
          ))}
      </GridLayout>
    </div>
  );
}
