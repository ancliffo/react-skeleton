import { Container, Divider, Grid, Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useEffect, useState, useRef, useCallback, ReactNode } from 'react';
import axios from 'axios';
import type { UI_ComponentSetSerializer, 
              UI_BehaviorSerializer, 
              UI_ComponentBehavior_MappingSerializer,
              UI_SectionSerializer,
              UI_Section_ComponentSerializer,
              UI_Section_ComponentSetSerializer,
              UI_Section_AppearanceSerializer
            } from '../serializedTypes/api.serializers';
import type { SectionProps, SectionItem } from '../customTypes/container/SectionTypes';
// import { PropsWithChildren } from 'react'
import SectionComponent from './SectionComponent';
import SectionComponentSet from './SectionComponentSet';
import { FormDialog } from './FormDialog';
import { DragDropGrid } from './DragDropGrid';
import TextBoxSingle from '../uiElements/controls/TextBoxSingle';
import SingleSelect from '../uiElements/controls/SingleSelect';
import CheckboxSingle from '../uiElements/controls/Checkbox';
import * as apiUtils from '../utilities/apiUtils';
import { AddItemPopover } from './AddItemPopover';

// import { Grid, Paper, Typography } from '@mui/material';

// const Section: React.FC<SectionProps> = ({ pageId, apiPath, children }: PropsWithChildren<PageContainerProps>) => {
function Section<T>({
    data,
    apiPath,
    callback,
    i, 
    onHeightChange,
    dragHandleClass
  } : SectionProps<T>) {
  const [componentBehaviorMappings, setComponentBehaviorMappings] = useState<UI_ComponentBehavior_MappingSerializer[] | null>(null);
  const [componentSets, setComponentSets] = useState<UI_ComponentSetSerializer[] | null>(null);
  const [sectionInfo, setSectionInfo] = useState<UI_SectionSerializer | null>(null);
  const [sectionComponents, setSectionComponents] = useState<UI_Section_ComponentSerializer[]>([]);
  const [sectionComponentSets, setSectionComponentsets] = useState<UI_Section_ComponentSetSerializer[]>([]);
  const [sectionItems, setSectionItems] = useState<SectionItem[]>([]);
  const [sectionItemTypeSelection, setSectionItemTypeSelection] = useState<String>();
  const [sectionAppearance, setSectionAppearance] = useState<UI_Section_AppearanceSerializer>();
  const [layout, setLayout] = useState<{ i: any; x: number; y: number; w: number; h: number; }[]>([]);
  //Make these user-editable!
  const colCount = 8;
  const rowHeight = 40;
  const itemWidth = 1;
  const itemHeight = 1;
  
  const sectionStyle = { marginBottom: 0, 
                         position: 'relative', 
                         height: "100%", 
                         overflow: 'hidden'}

  // This is a special handler that captures the initial layout
  // and all subsequent user-triggered changes.
  const onLayoutChange = useCallback((newLayout:any) => {
    // We only update the state if a change actually occurred
    if (JSON.stringify(layout) !== JSON.stringify(newLayout)) {
      if (sectionInfo && sectionInfo.Layout_id) {
        apiUtils.updateAPIInfo(`${apiPath}/api/layout/${sectionInfo.Layout_id}/`, {Layout: newLayout});
      }
      setLayout(newLayout);
    }
  }, [layout]);

  const hasFetched = useRef(false);

  useEffect(() => {
    // Get all initial data for page construction
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Get all initial data for section construction
    getInitialSectionItems();
    getSectionAppearance();
    getComponentBehaviorMappings();
    getComponentSets();
  }, []);

  //This should be called once at the Page level and stored in global state eventually?
  const getComponentSets = async () => {
    try {
      let tempComponentSets = await apiUtils.getAPIInfo(`${apiPath}/api/component/set/`);
      setComponentSets(tempComponentSets)
    } catch (error) {
      console.error('Error getting component sets:', error);
    }
  };

  //This should be called once at the Page level and stored in global state eventually?
  const getComponentBehaviorMappings = async () => {
    try {
      let tempBehaviorMappings = await apiUtils.getAPIInfo(`${apiPath}/api/component/behavior/mapping/`);
      setComponentBehaviorMappings(tempBehaviorMappings)
    } catch (error) {
      console.error('Error getting component behavior mappings:', error);
    }
  };
  
  const getSectionAppearance = async () => {
    try {
      let tempAppearance = await apiUtils.getAPIInfo(`${apiPath}/api/section/appearance/${data.Appearance_id}/`);
      setSectionAppearance(tempAppearance)
    } catch (error) {
      console.error('Error getting section appearance:', error);
    }
  };

  async function getInitialSectionItems() {
    try {
      let tempSectionInfo = await apiUtils.getAPIInfo(`${apiPath}/api/section/${data.id}/`);
      setSectionInfo(tempSectionInfo);
      let [tempSectionComponents, tempSectionComponentSets] = await Promise.all([
        apiUtils.getAPIInfo(`${apiPath}/api/section/component/${data.id}/`),
        apiUtils.getAPIInfo(`${apiPath}/api/section/component/set/list/${data.id}/`)
      ]);
      tempSectionComponents = tempSectionComponents ? tempSectionComponents : [];
      tempSectionComponentSets = tempSectionComponentSets ? tempSectionComponentSets : [];
      setSectionComponents(tempSectionComponents);
      setSectionComponentsets(tempSectionComponentSets);
      let tempLayout = tempSectionInfo && tempSectionInfo.Layout_id ? await apiUtils.getAPIInfo(`${apiPath}/api/layout/${tempSectionInfo.Layout_id}/`) : null;
      if (tempSectionComponents.length > 0 || tempSectionComponentSets.length > 0) {
        const mergedItems = [...tempSectionComponents, ...tempSectionComponentSets]; // or use custom merge logic
        setSectionItems(mergedItems);
        if (!tempLayout) {
          tempLayout = (mergedItems ? mergedItems.map((item:any, index:number) => {
            const itemsPerRow = Math.floor(colCount / itemWidth);
            const x = (index % itemsPerRow) * itemWidth;
            const y = Math.floor(index / itemsPerRow) * itemHeight;
            return {
              i: "section_item_"+item.id+"_"+Object.keys(item).join('_'),
              x: x,
              y: y,
              w: Object.keys(item).includes("ComponentSet_id") ? colCount : itemWidth,
              h: itemHeight
            }
          }) : []);
          
          let dbLayoutObject = await apiUtils.createAPIInfo(`${apiPath}/api/layout/`, {Layout: tempLayout});
          if (dbLayoutObject) {
            //Update the Section Layout foreign key value if the layout was successfully stored:
            tempSectionInfo.Layout_id = dbLayoutObject.id;
            apiUtils.updateAPIInfo(`${apiPath}/api/section/${data.id}/`, tempSectionInfo);
            setSectionInfo(tempSectionInfo);
            setLayout(tempLayout);
          } //LAYOUT IS NOT BEING STORED UNLESS SECTION ITEMS EXIST
        } else {
          setLayout(tempLayout.Layout);
        }
      } else if (!tempLayout) {
          //if we reached here, there are NO section items yet, and there is NO layout stored - so store an empty layout to match the stateful var initial value ([]):
          let dbLayoutObject = await apiUtils.createAPIInfo(`${apiPath}/api/layout/`, {Layout: []});
          if (dbLayoutObject) {
            //Update the Section Layout foreign key value if the layout was successfully stored:
            tempSectionInfo.Layout_id = dbLayoutObject.id;
            apiUtils.updateAPIInfo(`${apiPath}/api/section/${data.id}/`, tempSectionInfo);
            setSectionInfo(tempSectionInfo);
          }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setSectionItems([...sectionComponents, ...sectionComponentSets])
  }, [sectionComponents, sectionComponentSets]);

  useEffect(() => {
  }, [sectionAppearance]);

  // const accordionRef = useRef(null);

  // This effect sets up a ResizeObserver to listen for height changes.
  // useEffect(() => {
  //   if (!accordionRef.current) return;

  //   // The observer will fire whenever the element's size changes.
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     // Get the height from the first observed entry.
  //     const newHeight = entries[0].contentRect.height;
  //     onHeightChange(i, newHeight);
  //   });

  //   resizeObserver.observe(accordionRef.current);

  //   // Cleanup function to disconnect the observer when the component unmounts.
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [i, expanded, onHeightChange]);

  function sectionItemCallback(updatedSectionItems:SectionItem[]) {
    setSectionItems(updatedSectionItems);
  }
  // const handleChange = useCallback(() => {
  //   setExpanded((prev) => !prev);
  // }, []);

  // const handleClose = () => {
  //   setAddComponentOpen(false);
  // };


  async function handleNewComponentSubmit(event:any) {
    // id	Name	Section_id	Component_Behavior_Mapping_id	DisplayLabelText	Enabled	Visible	Row	Column	Width	Height	AddedBy	DateAdded
    //**Need to ensure uniqueness of section Names using form validation BEFORE this function is called, or here**
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries((formData as any).entries());
    formJson["Section_id"] = data.id;
    //Need to address this ternary
    formJson["Component_Behavior_Mapping_id"] = formJson["Component_Behavior_Mapping_id"].id ? formJson["Component_Behavior_Mapping_id"].id : formJson["Component_Behavior_Mapping_id"];
    //ENSURE THAT USER AND ANY OTHER APPROPRIATE COLUMNS ARE ADDED AS WELL, like User, last_modified, etc on the backend
    await apiUtils.createAPIInfo(`${apiPath}/api/section/component/${data.id}/`, formJson);
    let tempSectionCompopnents = await apiUtils.getAPIInfo(`${apiPath}/api/section/component/${data.id}/`);
    setSectionComponents(tempSectionCompopnents);
    // handleClose();
  };

  async function handleNewComponentSetSubmit(event:any) {
    // id	Section_id	ComponentSet_id	Visible	Row	Column	AddedBy	DateAdded	LastModifiedBy	LastModifiedDate

    //**Need to ensure uniqueness of section Names using form validation BEFORE this function is called, or here**
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries((formData as any).entries());
    formJson["Section_id"] = data.id;
    //Need to address this ternary
    // formJson["Appearance_id"] = formJson["Appearance_id"].id ? formJson["Appearance_id"].id : formJson["Appearance_id"];
    //ENSURE THAT USER AND ANY OTHER APPROPRIATE COLUMNS ARE ADDED AS WELL, like User, last_modified, etc on the backend
    await apiUtils.createAPIInfo(`${apiPath}/api/section/component/set/`, formJson);
    let tempSectionComponentSets = await apiUtils.getAPIInfo(`${apiPath}/api/section/component/set/list/${data.id}/`);
    setSectionComponentsets(tempSectionComponentSets);
    // handleClose();
  };

  function SectionHeader() {
    return (
          <div>
          { sectionItemTypeSelection == "Section Component" ? 
            <div>
              <TextBoxSingle
                // {...field}
                name="Name"
                label="Name (no spaces)"
                // callback={null}
                rules={{ required: 'Required' }}
                // error={!!fieldState.error}
                // helperText={fieldState.error?.message}
                // fullWidth
                // variant="outlined"
              />
              <TextBoxSingle
                // {...field}
                name="DisplayLabelText"
                label="Display Label"
                // callback={null}
                rules={{ required: 'Required' }}
                // error={!!fieldState.error}
                // helperText={fieldState.error?.message}
                // fullWidth
                // variant="outlined"
              />
              <SingleSelect
                name="Component_Behavior_Mapping_id"
                options={componentBehaviorMappings ? componentBehaviorMappings : []} 
                // callback={null}
                label={'Components'}
                optionDisplayKey={"display_name"}
                optionValueKey={"id"}
                fullwidth={true}
              />
              <CheckboxSingle
                // {...field}
                name="Enabled"
                label="Enabled"
                // callback={null}
                rules={{ required: 'Required' }}
                // error={!!fieldState.error}
                // helperText={fieldState.error?.message}
                // fullWidth
                // variant="outlined"
              />
            </div> : <div>
                <SingleSelect
                  name="ComponentSet_id"
                  options={componentSets ? componentSets.filter(set => sectionComponentSets.some(sectionSet => sectionSet.ComponentSet_id == set.id) == false) : []}
                  // callback={null}
                  label={'Component Sets'}
                  optionDisplayKey={"Name"}
                  optionValueKey={"id"}
                  fullwidth={true}
                /> 
              </div> }
              <CheckboxSingle
                // {...field}
                name="Visible"
                label="Visible"
                // callback={null}
                rules={{ required: 'Required' }}
                // error={!!fieldState.error}
                // helperText={fieldState.error?.message}
                // fullWidth
                // variant="outlined"
              />
          </div>

    )
  }

  function SectionContent() {
    return (
      <DragDropGrid
        compactType={null}
        gridContentDescriptor="section_item"
        gridData={sectionItems ? sectionItems : []}
        gridWidth={window.innerWidth-100}
        colCount={colCount}
        callback={sectionItemCallback}
        layout={layout}
        onLayoutChange={onLayoutChange}
        rowHeight={rowHeight}
        dragHandleClass={"section-item-drag-handle"}
        renderItem={(sectionItem:SectionItem, i:any) => (
          <div>
            { Object.keys(sectionItem).includes("ComponentSet_id") ? 
              // <div key={"section-item-component-set-"+sectionItem.id}>
                <SectionComponentSet
                  data={sectionItem as UI_Section_ComponentSetSerializer}
                  apiPath={apiPath}
                  callback={sectionItemCallback}
                  dragHandleClass="section-item-drag-handle"
                />
              // </div>
                  :
              // <div key={"section-item-component-"+sectionItem.id}>
                <SectionComponent
                  data={sectionItem as UI_Section_ComponentSerializer}
                  apiPath={apiPath}
                  callback={sectionItemCallback}
                  dragHandleClass="section-item-drag-handle"
                />
              // </div>
            }
          </div>
        )} />
      )
  };

  {/* openButtonCallback--for keeping track of which thing was selected, and what to display as form elements */}
  const hoverPopover = (handleClickOpen:any): ReactNode => {
    return <AddItemPopover callback={null}>
        <Stack spacing={2} direction="row">
          <Button onClick={(e:any) => {
            handleClickOpen(e);
            setSectionItemTypeSelection("Section Component");
          }} 
          variant="text">Add Component</Button>
          <Button onClick={(e:any) => {
            handleClickOpen(e);
            setSectionItemTypeSelection("Section Component Set");
          }} 
          variant="text">Add Component Set</Button>
        </Stack>
      </AddItemPopover>
  };

  return (
    <div style={{height:"100%"}}>
      {/* { sectionAppearance && sectionAppearance.Expandable ?       
      //   <Accordion 
      //     ref={accordionRef}
      //     key={data.id}
      //     // expanded={expanded} 
      //     expanded={true}
      //     // defaultExpanded
      //     // onChange={handleChange}
      //     sx={{marginBottom: 0, width: "100%"}} 
      //   >
      //     <AccordionSummary
      //       id={"accordian-summary"+data.id}
      //       key={"accordian-summary"+data.id}
      //       // onClick={(e) => (handleChange(e))}
      //       sx={{backgroundColor: 'rgb(204,229,255)', color: 'rgb(55,100,160)'}}
      //       // expandIcon={<ExpandMoreIcon />}
      //       // aria-controls="panel1-content"
      //       // id="panel1-header"
      //     >
      //       <Typography component="span">{data.DisplayText}</Typography>
      //     </AccordionSummary>
      //     <AccordionDetails>
      //       <SectionContent />
      //     </AccordionDetails>
      //   </Accordion> :
      //   <div style={{marginBottom: 0, width: "100%"}}>
      //     <Typography component="span">{data.DisplayText}</Typography>
      //     <Divider orientation="horizontal" sx={{ borderBottomWidth: 2, borderColor: "black"}} />
      //     <SectionContent />
      //   </div>
      // } */}

      { sectionAppearance && sectionAppearance.Border && sectionAppearance.Panel ?
        <Paper
          // component="section"
          key={data.id}
          sx={sectionStyle} 
        >
          <div style={{backgroundColor: 'rgb(204,229,255)', color: 'rgb(55,100,160)', width: "100%", }}>
            <Stack sx={{width: "100%"}} direction="row" spacing={1}>
              <div
                id={"accordian-summary"+data.id}
                key={"accordian-summary"+data.id}>
                <Typography component="span">{data.DisplayText}</Typography>
              </div>
              
              <FormDialog
                title={`Add New ${sectionItemTypeSelection}`}
                description={`Configure your new ${sectionItemTypeSelection}`}
                openButton={hoverPopover}
                submitButtonText="Add"
                handleSubmitCallback={sectionItemTypeSelection=="Section Component" ? handleNewComponentSubmit : handleNewComponentSetSubmit} 
              >
                <SectionHeader />
              </FormDialog>
              <DragIndicatorIcon style={{marginLeft: "auto"}} className={dragHandleClass} />
            </Stack>
          </div>
          <div style={{border: sectionAppearance.BorderWidth+"px solid", borderRadius: 3, overflow: 'auto', height: "90%"}}>
            <SectionContent />
          </div>
        </Paper> :
        <div style={{marginBottom: 0, width: "100%"}}>
          <Stack sx={{width: "100%"}} direction="row" spacing={1}>
            <div
              id={"accordian-summary"+data.id}
              key={"accordian-summary"+data.id}>
              <Typography component="span">{data.DisplayText}</Typography>
            </div>
            
            <FormDialog
              title={`Add New ${sectionItemTypeSelection}`}
              description={`Configure your new ${sectionItemTypeSelection}`}
              openButton={hoverPopover}
              submitButtonText="Add"
              handleSubmitCallback={sectionItemTypeSelection=="Section Component" ? handleNewComponentSubmit : handleNewComponentSetSubmit} 
            >
              <SectionHeader />
            </FormDialog>
            <DragIndicatorIcon style={{marginLeft: "auto"}} className={dragHandleClass} />
          </Stack>
          <Divider orientation="horizontal" sx={{ borderBottomWidth: 1, borderColor: "black"}} />
          <SectionContent />
        </div>
      }
    </div>
  );
};

export default Section;