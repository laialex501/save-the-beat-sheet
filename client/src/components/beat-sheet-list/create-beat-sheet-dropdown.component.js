import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import styleConfig from "../utils/styleConfig";
import { v4 as uuidv4 } from "uuid";
import beatSheetTemplates from "../utils/beatSheetTemplates";

const default_beat_sheets = beatSheetTemplates.default_beat_sheets;

const CreateBeatSheetDropdown = (props) => {
  return (
    <DropdownButton
      variant={styleConfig.createBeatSheetButtonVariant}
      id="create-beat-sheet-dropdown"
      title="Create New Beat Sheet"
    >
      {default_beat_sheets.map((beat_sheet_option) => {
        return (
          <Dropdown.Item
            onClick={() => {
              props.onClick(beat_sheet_option.beat_sheet_data);
            }}
            as="button"
            key={uuidv4()}
          >
            {beat_sheet_option.beat_sheet_display_name}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default CreateBeatSheetDropdown;
