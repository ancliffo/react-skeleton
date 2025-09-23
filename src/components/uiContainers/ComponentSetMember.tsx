import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { ComponentSetMemberProps } from "../../types/customTypes";
import TextBoxSingle from "../uiElements/controls/TextBoxSingle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Stack from "@mui/material/Stack";

// import { Grid, Paper, Typography } from '@mui/material';

// const Section: React.FC<SectionProps> = ({ pageId, apiPath, children }: PropsWithChildren<PageContainerProps>) => {
function ComponentSetMember<T>({
  apiPath,
  callback,
  data,
  dragHandleClass,
}: ComponentSetMemberProps<T>) {
  //   const [pageInfo, setPageInfo] = useState<UI_PageSerializer | null>(null);

  //   const [componentSets, setComponentSets] = useState<UI_ComponentSetSerializer[] | null>(null);
  //   const [componentBehaviors, setComponentBehaviors] = useState<UI_BehaviorSerializer[] | null>(null);
  //   const [componentBehaviorMappings, setComponentBehaviorMappings] = useState<UI_ComponentBehavior_MappingSerializer[] | null>(null);
  // const [container, setContainer] = useState<UI_ContainerSerializer[] | null>(null);
  //   const [members, setMembers] = useState<UI_Section_ComponentSet_MemberSerializer[] | null>(null);
  //   const [sections, setSections] = useState<UI_SectionSerializer[] | null>(null);

  function getAPIInfo(path: string, stateVarSetter: any) {
    axios
      .get(apiPath + path)
      .then((res) => {
        stateVarSetter(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    // Get all initial data for page construction
    // getAPIInfo('/api/page/4/', setPageInfo);
    // getAPIInfo('/api/component/set/', setComponentSets);
    // getAPIInfo('/api/component/behavior/', setComponentBehaviors);
    // getAPIInfo('/api/component/behavior/mapping/', setComponentBehaviorMappings);
    // getAPIInfo(`/api/container/${data.Container_id}`, setContainer);
    // getAPIInfo('/api/member/', setMembers);
    // getAPIInfo('/api/section/', setSections);
  }, []);

  // useEffect(() => {
  // Get all initial data for page construction
  // getAPIInfo('/api/page/4/', setPageInfo);
  // getAPIInfo('/api/component/', setComponents);
  // if (container && container.Name == "ComponentSet") {
  //     getAPIInfo('/api/component/set/', setComponentSets);
  // } else if (container && container.Name == "Section") {
  //     getAPIInfo(`/api/component/${data.Section_id}`, ComponentSetMembers);
  // }

  // getAPIInfo('/api/section/', setSections);

  // }, [container]);

  // function controlCallback(updatedMembers:UI_Section_ComponentSet_MemberSerializer[]) {
  //   setMembers(updatedMembers);
  // }
  //   function sectionCallback(updatedSections:UI_SectionSerializer[]) {
  //     setSections(updatedSections);
  //   }

  return (
    <Stack direction="row" spacing={1}>
      <TextBoxSingle
        name={data.Name as string}
        callback={callback}
        label={data.DisplayLabelText as string}
        rules={{ required: "Required" }}
      />
      <DragIndicatorIcon className={dragHandleClass} />
    </Stack>
  );
}

export default ComponentSetMember;
