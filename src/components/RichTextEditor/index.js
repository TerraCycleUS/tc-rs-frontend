import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import { useController } from "react-hook-form";
import { Labeled } from "react-admin";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";
import http from "../../utils/http";

export default function RichTextEditor({ source }) {
  const input = useController({ name: source });
  const error = input.formState.errors[input.field.name];

  let color;
  if (error) {
    color = "error";
  }

  function MyCustomUploadAdapterPlugin(editor) {
    // eslint-disable-next-line no-param-reassign
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new MyUploadAdapter(loader);
  }

  return (
    <Labeled source={source} color={color}>
      <>
        <CKEditor
          editor={ClassicEditor}
          data={input.field.value}
          onChange={(event, editor) => {
            const data = editor.getData();
            input.field.onChange(data);
          }}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
          }}
        />
        {error ? (
          <FormHelperText className="Mui-error ">
            {error?.message}
          </FormHelperText>
        ) : null}
      </>
    </Labeled>
  );
}

RichTextEditor.propTypes = {
  source: PropTypes.string,
};

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  request(formData) {
    const sendFileConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return http.post("/api/upload/product", formData, sendFileConfig);
  }

  abort(e) {
    throw e;
  }

  upload() {
    const formData = new FormData();

    return this.loader.file.then((filenew) => {
      formData.append("file", filenew);
      return new Promise((resolve, reject) => {
        this.request(formData)
          .then((response) => response)
          .then((success) => {
            resolve({
              default: `${process.env.REACT_APP_SERVER_API_URL}/api/file/${success.data.name}`,
            });
          })
          .catch((error) => reject(error));
      });
    });
  }
}
