import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CKEditor from "@ckeditor/ckeditor5-react";
import { InlineEditor, MinimumEditor } from "ckeditor5-build-custom";
import DeleteButton from "../utils/delete-button.component";
import styleConfig from "../utils/styleConfig";

// Beat Component
const Beat = (props) => {
  if (!props.beat_props) return null;
  const { beat_name, beat_description, act_uuid, beat_uuid } = props.beat_props;
  return (
    <Col className="my-3">
      <Card
        bg="light"
        className="h-100"
        style={{ minHeight: styleConfig.beatMinHeight }}
      >
        {/* Beat content */}
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            {/* Title Editor */}
            <div
              className="mx-2"
              style={{ width: "80%", marginBottom: "-10px" }}
            >
              <CKEditor
                editor={MinimumEditor}
                data={beat_name}
                onInit={(editor) => {
                  editor.execute("heading", { value: "heading3" });
                }}
                onChange={(event, editor) => {
                  const data = { beat_name: editor.getData() };
                  props.handleEditBeat(act_uuid, beat_uuid, data);
                }}
              />
            </div>
            {/* Delete Button */}
            <div style={{ width: "20%" }}>
              <DeleteButton
                onClick={props.handleDeleteBeat}
                params={[act_uuid, beat_uuid]}
              />
            </div>
          </Card.Title>
          <hr />
          {/* Description editor */}
          <div className="mx-2">
            <CKEditor
              editor={InlineEditor}
              data={beat_description}
              onChange={(event, editor) => {
                const data = { beat_description: editor.getData() };
                props.handleEditBeat(act_uuid, beat_uuid, data);
              }}
              className="m-2"
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Beat;
