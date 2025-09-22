// import { useDrag, useDrop } from 'react-dnd';
import React, { useState, useCallback } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { DraggableBoxProps, DragDropGridProps } from '../customTypes/container/DragDropGridTypes';
import GridLayout  from "react-grid-layout";
import type { Layout, Layouts } from "react-grid-layout";
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
// import { WidthProvider, Responsive } from 'react-grid-layout';

export function DragDropGrid<T>({    
  gridContentDescriptor,
  gridData,
  gridWidth,
  callback,
  renderItem,
  compactType,
  layout,
  colCount,
  onLayoutChange,
  rowHeight,
  dragHandleClass }: DragDropGridProps<T>) {

  return (
    <div>
      <GridLayout
        // verticalCompact={false}
        draggableHandle={"."+dragHandleClass}
        className="layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={colCount}
        rowHeight={rowHeight}
        width={gridWidth}
        compactType={compactType}
      >
        {gridData && gridData.length > 0 && gridData.map((item:any, index:number) => (
          <div key={gridContentDescriptor+"_"+item.id+"_"+Object.keys(item).join('_')}>
           {renderItem(item, gridContentDescriptor+"_"+item.id+"_"+Object.keys(item).join('_'))}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
