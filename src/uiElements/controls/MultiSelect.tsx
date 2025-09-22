import './App.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MultiSelect(title:string, values:any) {
  values = values.sort((a:any, b:any) => -b.sort_value.localeCompare(a.sort_value))
  const [selectedPriorities, setSelectedPriorities] = React.useState<Array<any>>([]);
  const lastClickedIndex = useRef(null);
  const [filterExpanded, setFilterExpanded] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = React.useState<Array<any>>([]);

  const handleShiftClick = (event: MouseEvent | KeyboardEvent, option:any, selected:boolean) => {
    const index = values.findIndex((item:any) => item.value === option.value);
    //setSelectedPriorities([option]);
    if (event.shiftKey && lastClickedIndex.current !== null) {
      const start = Math.min(lastClickedIndex.current, index);
      const end = Math.max(lastClickedIndex.current, index);
      const range = values.slice(start, end + 1);
      const newSelection = Array.from(new Set([...selectedPriorities, ...range]));
      setSelectedPriorities(newSelection);
    } else {
      // Regular click toggles selection
      setSelectedPriorities((prev:any) =>
        prev.includes(option)
          ? prev.filter((item:any) => item !== option)
          : [...prev, option]
      );
    }
    lastClickedIndex.current = index;
  };


  return (
    <Accordion 
      style={{ width: 380, marginLeft: 10, marginTop: 5 }} 
      expanded={filterExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{backgroundColor: 'lightgray', display: 'flex', minHeight: 50, maxHeight: 50}}
          onClick={(event) => setFilterExpanded(!filterExpanded)} 
        >
          <Typography component="span">{title}</Typography>
          {selectedPriorities.length > 0 ?<Typography component="span" style={{marginLeft: 'auto', color: 'blue'}}>({selectedPriorities.length})</Typography>:null}
        </AccordionSummary>
        <AccordionDetails style={{position: 'relative',  height: 'auto',  overflow: 'visible'}}>
        <div 
        //onClick={(event)=> event.stopPropagation()}
        >
          <div style={{display: 'flex'}}>
            <Button component="span" variant="text" onClick={() => setSelectedPriorities([...filteredOptions])}>Select All</Button>
            <Button component="span" variant="text" onClick={() => {setSelectedPriorities([]); setInputValue("");}} >Clear All</Button>
            <Button component="span" variant="text" onClick={() => {setFilterExpanded(false)}} style={{marginLeft: 'auto', color: 'green'}}>Done</Button>
          </div>
          <div style={{ width: 350 }}>

            {/* <p>You have selected {selectedPriorities.length} out of {values.length} films.</p> */}

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              // options={values}
              options={values}
              disableCloseOnSelect
              getOptionLabel={(option) => option.val_display}
              value={selectedPriorities}
              inputValue={inputValue}

              onChange={(event, newValue, reason) => {
                if (reason === 'clear') {
                  setSelectedPriorities([]);
                  // Custom logic here
                }
              }}
              onInputChange={(event, newInputValue, reason) => {
                if (reason !== 'reset' && reason !== 'blur') {
                  setInputValue(newInputValue); // 💡 Ignore reset to persist filter
                  const filtered = values.filter((opt:any) =>
                    opt.val_display.toLowerCase().includes(newInputValue.toLowerCase())
                  );
                  setFilteredOptions(filtered); 
                }
              }}

              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li onMouseDown={(event:any) => handleShiftClick(event, option, selected)} key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      
                    />
                    <Typography color={option.val_display == "[ No Value ]" ? "error": "black"}>{option.val_display}</Typography>
                  </li>
                );
              }}
              style={{ width: 345}}
              renderInput={(params) => (
                <TextField {...params} label={""} placeholder="Type, or Click to select a value" />
              )}
            />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    
  );

}

const priorities = [

  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 1 MANDATORY", "is_fk": true, "related_table_row_id": 1, "value": 1, "val_display": "PRI 1 MANDATORY"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 2 ESSENTIAL", "is_fk": true, "related_table_row_id": 2, "value": 2, "val_display": "PRI 2 ESSENTIAL"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 3 HIGHLY DESIRABLE", "is_fk": true, "related_table_row_id": 3, "value": 3, "val_display": "PRI 3 HIGHLY DESIRABLE"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 4 DESIRABLE", "is_fk": true, "related_table_row_id": 4, "value": 4, "val_display": "PRI 4 DESIRABLE"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 5 NEGLIGIBLE", "is_fk": true, "related_table_row_id": 5, "value": 5, "val_display": "PRI 5 NEGLIGIBLE"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 1 - Prevents Operational or Mission Function Completion", "is_fk": true, "related_table_row_id": 6, "value": 6, "val_display": "PRI 1 - Prevents Operational or Mission Function Completion"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 2 - Affects Function, unable to Work Around", "is_fk": true, "related_table_row_id": 7, "value": 7, "val_display": "PRI 2 - Affects Function, unable to Work Around"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 3 - Affects Function, able to Work Around", "is_fk": true, "related_table_row_id": 8, "value": 8, "val_display": "PRI 3 - Affects Function, able to Work Around"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 4 - Inconvenience or Annoyance", "is_fk": true, "related_table_row_id": 9, "value": 9, "val_display": "PRI 4 - Inconvenience or Annoyance"}, 
  {"model_name": "torprimarydata", "related_model": "torprioritytype", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "PRI 5 - Other", "is_fk": true, "related_table_row_id": 10, "value": 10, "val_display": "PRI 5 - Other"}, 
  {"value": "No Value", "val_display": "[ No Value ]", "model_name": "torprimarydata", "model_col_name": "priorityId", "column_friendly_name": "Priority", "field_type": "text", "sort_value": "\u0000", "is_fk": true}
];



const probabilities = [
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "CONSISTENTLY", "is_fk": true, "related_table_row_id": 1, "value": 1, "val_display": "CONSISTENTLY"}, 
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "FREQUENTLY", "is_fk": true, "related_table_row_id": 2, "value": 2, "val_display": "FREQUENTLY"}, 
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "OCCASIONALLY", "is_fk": true, "related_table_row_id": 3, "value": 3, "val_display": "OCCASIONALLY"}, 
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "RARELY", "is_fk": true, "related_table_row_id": 4, "value": 4, "val_display": "RARELY"}, 
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "CANNOT REPRODUCE", "is_fk": true, "related_table_row_id": 5, "value": 5, "val_display": "CANNOT REPRODUCE"}, 
  {"model_name": "torprimarydata", "related_model": "torprobability", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "NA", "is_fk": true, "related_table_row_id": 6, "value": 6, "val_display": "NA"}, 
  {"value": "No Value", "val_display": "[ No Value ]", "model_name": "torprimarydata", "model_col_name": "probabilityId", "column_friendly_name": "Probability", "field_type": "text", "sort_value": "\u0000", "is_fk": true}
]

export default MultiSelect;