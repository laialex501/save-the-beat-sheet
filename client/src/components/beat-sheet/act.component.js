import React from "react";
import Beat from "./beat.component";
import AddBeat from "./add-beat.component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteButton from "../utils/delete-button.component";
import CKEditor from "@ckeditor/ckeditor5-react";
import { InlineEditor, MinimumEditor } from "ckeditor5-build-custom";

// Act Component.
const Act = (props) => {
  if (!props.act_props) return null;
  // Receive props
  const { act_name, act_description, beats, act_uuid } = props.act_props;
  return (
    <Row
      xl={4}
      lg={3}
      md={2}
      xs={1}
      className="p-5 m-5 rounded-lg bg-dark d-flex align-items-stretch"
    >
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="text-white d-flex"
      >
        <div className="w-75">
          {/* Title Editor */}
          <div className="mx-2" style={{ marginBottom: "-10px" }}>
            <CKEditor
              editor={MinimumEditor}
              data={act_name}
              onInit={(editor) => {
                editor.execute("heading", { value: "heading2" });
              }}
              onChange={(event, editor) => {
                const data = { act_name: editor.getData() };
                props.handleEditAct(act_uuid, data);
              }}
            />
          </div>
          <hr style={{ borderTop: "1px solid white" }} />
          {/* Description editor */}
          <div className="mx-2">
            <CKEditor
              editor={InlineEditor}
              data={act_description}
              onChange={(event, editor) => {
                const data = { act_description: editor.getData() };
                props.handleEditAct(act_uuid, data);
              }}
              className="m-2"
            />
          </div>
        </div>
        {/* Delete Button */}
        <div className="w-25">
          <DeleteButton onClick={props.handleDeleteAct} params={[act_uuid]} />
        </div>
      </Col>
      {beats.map((beat_props) => (
        <Beat
          beat_props={beat_props}
          key={beat_props.beat_uuid}
          handleDeleteBeat={props.handleDeleteBeat}
          handleEditBeat={props.handleEditBeat}
        />
      ))}
      {/* Include a button to add a new default beat. Modify function call to include this act's act_uuid */}
      <AddBeat act_uuid={act_uuid} handleAddBeat={props.handleAddBeat} />
    </Row>
  );
};

export default Act;
