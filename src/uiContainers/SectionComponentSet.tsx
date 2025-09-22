import { Container, Grid, Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import type { UI_Section_ComponentSetSerializer,
              UI_ComponentSet_MemberSerializer
            } from '../serializedTypes/api.serializers';
import type { SectionComponentSetProps } from '../customTypes/container/SectionComponentSetTypes';
import { PropsWithChildren } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Stack from '@mui/material/Stack';
import ComponentSetMember from './ComponentSetMember';
import { DragDropGrid } from './DragDropGrid';
import * as apiUtils from '../utilities/apiUtils';

// import { Grid, Paper, Typography } from '@mui/material';

// const Section: React.FC<SectionProps> = ({ pageId, apiPath, children }: PropsWithChildren<PageContainerProps>) => {
function SectionComponentSet<T>({
    apiPath,
    callback,
    data,
    dragHandleClass
  } : SectionComponentSetProps<T>) {
//   const [pageInfo, setPageInfo] = useState<UI_PageSerializer | null>(null);
  const [componentSetInfo, setComponentSetInfo] = useState<UI_Section_ComponentSetSerializer | null>(null);
  const [componentSetMembers, setComponentSetMembers] = useState<UI_ComponentSet_MemberSerializer[] | null>(null);
  const [layout, setLayout] = useState<{ i: any; x: number; y: number; w: number; h: number; }[]>([]);
  //Make these user-editable!
  const colCount = 8;
  const rowHeight = 40;
  const itemWidth = 1;
  const itemHeight = 1;

  // This is a special handler that captures the initial layout
  // and all subsequent user-triggered changes.
  const onLayoutChange = useCallback((newLayout:any) => {
    // We only update the state if a change actually occurred
    if (JSON.stringify(layout) !== JSON.stringify(newLayout)) {
      if (componentSetInfo && componentSetInfo.Layout_id) {
        apiUtils.updateAPIInfo(`${apiPath}/api/layout/${componentSetInfo.Layout_id}/`, {Layout: newLayout});
      }
      setLayout(newLayout);
    }
  }, [layout]);

  const hasFetched = useRef(false);

  useEffect(() => {
    // Get all initial data for page construction
    if (hasFetched.current) return;
    hasFetched.current = true;
    getInitialMembers();
  }, []);

  async function getInitialMembers() {
    try {
      let tempComponentSetInfo = await apiUtils.getAPIInfo(`${apiPath}/api/section/component/set/${data.id}/`);
      setComponentSetInfo(tempComponentSetInfo);
      const tempMembers = await apiUtils.getAPIInfo(`${apiPath}/api/component/set/member/${data.ComponentSet_id}/`);
      setComponentSetMembers(tempMembers);
      let tempLayout = tempComponentSetInfo && tempComponentSetInfo.Layout_id ? await apiUtils.getAPIInfo(`${apiPath}/api/layout/${tempComponentSetInfo.Layout_id}/`) : null;
      if (tempMembers) {
        if (!tempLayout) {
          tempLayout = (tempMembers ? tempMembers.map((item:any, index:number) => {
            const itemsPerRow = Math.floor(colCount / itemWidth);
            const x = (index % itemsPerRow) * itemWidth;
            const y = Math.floor(index / itemsPerRow) * itemHeight;
            return {
              i: "component_set_member_"+item.id+"_"+Object.keys(item).join('_'),
              x: x,
              y: y,
              w: itemWidth,
              h: itemHeight
            }
          }) : []);
          let dbLayoutObject = await apiUtils.createAPIInfo(`${apiPath}/api/layout/`, {Layout: tempLayout});
          if (dbLayoutObject) {
            //Update the Component Set Layout foreign key value if the layout was successfully stored:
            tempComponentSetInfo.Layout_id = dbLayoutObject.id;
            apiUtils.updateAPIInfo(`${apiPath}/api/section/component/set/${data.id}/`, tempComponentSetInfo);
            setLayout(tempLayout);
          }
        } else {
          setLayout(tempLayout.Layout);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function memberCallback(updatedMembers:UI_ComponentSet_MemberSerializer[]) {
    setComponentSetMembers(updatedMembers);
  }

  return (
    // <Paper>
      <Stack sx={{margin: 0, padding: 0}} direction="row" spacing={1}>
        <DragDropGrid
          compactType={null}
          gridContentDescriptor='component_set_member'
          gridData={componentSetMembers ? componentSetMembers : []}
          gridWidth={window.innerWidth-200}
          colCount={colCount}
          callback={memberCallback}
          layout={layout}
          onLayoutChange={onLayoutChange}
          rowHeight={rowHeight}
          dragHandleClass={"component-set-member-handle"}
          renderItem={(member:UI_ComponentSet_MemberSerializer, i:any) => (
            <ComponentSetMember
              apiPath={apiPath}
              data={member}
              callback={memberCallback}
              dragHandleClass="component-set-member-handle" />
          )} 
        />
        <DragIndicatorIcon className={dragHandleClass} />
      </Stack>
    // </Paper>
  );
};

export default SectionComponentSet;