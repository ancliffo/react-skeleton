import { Stack } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import type {
  UI_PageSerializer,
  UI_SectionSerializer,
  UI_Section_AppearanceSerializer,
} from "../../types/serializedTypes/api.serializers";
import type { PageContainerProps } from "../../types/customTypes/container/PageTypes";
import Section from "./Section";
import PageBreadcrumbs from "../uiElements/PageBreadcrumbs";
import { FormDialog } from "./FormDialog";
import SingleSelect from "../uiElements/controls/SingleSelect";
import { DragDropGrid } from "./DragDropGrid";
import * as apiUtils from "../../utilities/apiUtils";
import { useQuery } from "@tanstack/react-query";
import TextBoxSingle from "../uiElements/controls/TextBoxSingle";

const Page: React.FC<PageContainerProps> = ({ pageId, apiPath }) => {
  const [pageInfo, setPageInfo] = useState<UI_PageSerializer | null>(null);
  // const [sectionAppearances, setSectionAppearances] = useState<UI_Section_AppearanceSerializer[]>(
  //   [],
  // );
  const [sections, setSections] = useState<UI_SectionSerializer[] | null>(null);
  //this needs to be updated to use the serialized layout type:
  const [layout, setLayout] = useState<{ i: string; x: number; y: number; w: number; h: number }[]>(
    [],
  );
  //Make these user-editable!
  const colCount = 12;
  const rowHeight = 60;
  const itemWidth = 1;
  const itemHeight = 1;
  // const [open, setOpen] = useState(false);
  //const methods = useForm();

  // const { control } = useFormContext();

  // This is the key function that handles the height change.
  const handleItemHeightChange = useCallback(
    (itemId: string | number, newHeightInPixels: number) => {
      console.log("Item height change handling turned off", itemId, newHeightInPixels);
      // const newHeightInRows = Math.ceil(newHeightInPixels / rowHeight);
      // console.log("NEW LAYOUT",newHeightInRows, itemId)
      // setLayout((prevLayout:any) => {
      //   // Find the item in the layout and update its height
      //   const updatedLayout = prevLayout.map((item:any) => {
      //     if (item.i === itemId) {
      //       return { ...item, h: newHeightInRows };
      //     }
      //     return item;
      //   });
      //   return updatedLayout;
      // });
    },
    [],
  );

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const {
    data: sectionAppearances = [],
    // isLoading: isLoadingSectionAppearances,
    error: sectionAppearancesError,
    refetch: getSectionAppearances,
  } = useQuery({
    queryKey: ["sectionAppearances", apiPath],
    queryFn: () => apiUtils.getAPIInfo(`${apiPath}/api/section/appearance/`),
    enabled: false, // Disable automatic query on mount
  });

  console.log("Running in mode:", process.env.NODE_ENV);
  const hasFetched = useRef(false);

  useEffect(() => {
    //trying to limit re-renders - we can probably make this better
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Get all initial data for page construction
    getInitialPageData();
    getSectionAppearances();
  }, []);

  useEffect(() => {
    if (sectionAppearancesError) {
      console.error("Error fetching section appearances:", sectionAppearancesError);
    }
  }, [sectionAppearancesError]);

  // Leaving this here so we can see how to use something like this in react-query
  // const getSectionAppearances = async () => {
  //   try {
  //     const tempAppearances = await apiUtils.getAPIInfo(`${apiPath}/api/section/appearance/`);
  //     setSectionAppearances(tempAppearances);
  //   } catch (error) {
  //     console.error("Error getting section appearances:", error);
  //   }
  // };

  function sectionCallback() {
    //Currently not implemented
  }

  async function getInitialPageData() {
    try {
      const tempPageInfo = await apiUtils.getAPIInfo(`${apiPath}/api/page/${pageId}/`);
      setPageInfo(tempPageInfo);
      const tempSections = await apiUtils.getAPIInfo(`${apiPath}/api/page/section/${pageId}/`);
      setSections(tempSections);
      // Comes back from the server wrapped in object for API use: {Layout_id: <layout array>}
      let tempLayout =
        tempPageInfo && tempPageInfo.Layout_id
          ? await apiUtils.getAPIInfo(`${apiPath}/api/layout/${tempPageInfo.Layout_id}/`)
          : null;
      if (tempSections) {
        // or use custom merge logic
        if (!tempLayout) {
          tempLayout = tempSections
            ? tempSections.map((item: UI_SectionSerializer, index: number) => {
                const itemsPerRow = Math.floor(colCount / itemWidth);
                const x = (index % itemsPerRow) * itemWidth;
                const y = Math.floor(index / itemsPerRow) * itemHeight;
                return {
                  i: "section_" + item.id + "_" + Object.keys(item).join("_"),
                  x: x,
                  y: y,
                  w: colCount,
                  h: itemHeight,
                };
              })
            : [];

          //Need to wrap the layout in an object like this for API compatability,
          // since a list by itself is not valid json:
          const dbLayoutObject = await apiUtils.createAPIInfo(`${apiPath}/api/layout/`, {
            Layout: tempLayout,
          });
          if (dbLayoutObject) {
            //Update the Page Layout foreign key value if the layout was successfully stored:
            tempPageInfo.Layout_id = dbLayoutObject.id;
            apiUtils.updateAPIInfo(`${apiPath}/api/page/${pageId}/`, tempPageInfo);
            setPageInfo(tempPageInfo);
            setLayout(tempLayout);
          }
        } else {
          setLayout(tempLayout.Layout);
        }
        setSections(tempSections);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onLayoutChange = useCallback(
    (newLayout: { i: string; x: number; y: number; w: number; h: number }[]) => {
      // We only update the state if a change actually occurred
      if (JSON.stringify(layout) !== JSON.stringify(newLayout)) {
        if (pageInfo && pageInfo.Layout_id) {
          apiUtils.updateAPIInfo(`${apiPath}/api/layout/${pageInfo.Layout_id}/`, {
            Layout: newLayout,
          });
        }
        setLayout(newLayout);
      }
    },
    [layout],
  );

  //eventually get these from the backend dynamically
  const tempLinks = [
    { displayText: "Enterprise", href: "#" },
    { displayText: "Discrepancy Reports - TOR", href: "" },
  ];

  async function handleNewSectionSubmit(event: React.FormEvent<HTMLFormElement>) {
    //**Need to ensure uniqueness of section Names using form validation
    // BEFORE this function is called, or here**
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson["Page_id"] = String(pageId);
    //Need to address this ternary
    formJson["Appearance_id"] = formJson["Appearance_id"].id
      ? formJson["Appearance_id"].id
      : formJson["Appearance_id"];
    //ENSURE THAT USER AND ANY OTHER APPROPRIATE COLUMNS ARE ADDED AS WELL,
    // like User, last_modified, etc on the backend
    await apiUtils.createAPIInfo(`${apiPath}/api/section/`, formJson);
    const tempSections = await apiUtils.getAPIInfo(`${apiPath}/api/page/section/${pageId}/`);
    setSections(tempSections);
    // handleClose();
  }

  return (
    <div>
      <PageBreadcrumbs links={tempLinks} />
      <Stack direction="row" justifyContent="flex-end">
        <FormDialog
          title="Add New Section"
          description="Configure your new page section:"
          openButtonLabel="Add Section"
          submitButtonText="Add Section"
          handleSubmitCallback={handleNewSectionSubmit}
        >
          {/* ALL OF THE BELOW NEEDS TO BE ADDED BACK IN TO ENABLE REACT-HOOK-FORM */}
          {/* <div> */}
          {/* <BasicButton callback={handleClickOpen} label="Add Section"  />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Section</DialogTitle>
              <DialogContent sx={{ paddingBottom: 0 }}>
                <DialogContentText>
                  Configure your new page section:
                </DialogContentText> */}
          {/* <FormProvider {...methods}> */}
          {/* <form onSubmit={handleNewSectionSubmit}> */}
          {/* {methods.handleSubmit(handleNewSectionSubmit)}> */}
          <TextBoxSingle
            // {...field}
            name="Name"
            label="Name (no spaces)"
            callback={null}
            rules={{ required: "Required" }}
            // error={!!fieldState.error}
            // helperText={fieldState.error?.message}
            // fullWidth
            // variant="outlined"
          />
          <TextBoxSingle
            // {...field}
            name="DisplayText"
            label="Display Title Text"
            callback={null}
            rules={{ required: "Required" }}
            // error={!!fieldState.error}
            // helperText={fieldState.error?.message}
            // fullWidth
            // variant="outlined"
          />
          <SingleSelect
            name="Appearance_id"
            value={undefined}
            options={sectionAppearances ? sectionAppearances : []}
            callback={null}
            label={"Appearance"}
            optionDisplayKey={"ReferenceName"}
            optionValueKey={"id"}
            fullwidth={true}
          />
          {/* <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Add Section</Button>
                    </DialogActions> */}
          {/* </form> */}
          {/* </FormProvider> */}
          {/* </DialogContent>
            </Dialog> */}
          {/* </div> */}
        </FormDialog>
      </Stack>

      <DragDropGrid
        compactType="vertical"
        gridContentDescriptor="section"
        gridData={sections ? sections : []}
        gridWidth={window.innerWidth - 10}
        colCount={colCount}
        callback={sectionCallback}
        layout={layout}
        onLayoutChange={onLayoutChange}
        rowHeight={rowHeight}
        dragHandleClass={"section-drag-handle"}
        renderItem={(section: UI_SectionSerializer, i: number) => (
          <Section
            i={i}
            onHeightChange={handleItemHeightChange}
            data={section}
            apiPath={apiPath}
            callback={sectionCallback}
            dragHandleClass="section-drag-handle"
          />
        )}
      />
    </div>
  );
};

export default Page;
