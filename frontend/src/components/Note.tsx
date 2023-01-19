import { Container } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "underscore";

function Note() {
  const data: any = useLoaderData();
  const noteOfData = data.data.note;
  console.log(noteOfData.content);
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const submit = useSubmit();
  const [rawHTML, setRawHTML] = useState(data.data.note.content);
  const location = useLocation();

  useEffect(() => {
    debouncedMemoried(location.pathname, noteOfData, rawHTML);
  }, [rawHTML, location.pathname]);

  const debouncedMemoried = useMemo(() => {
    return debounce((pathname: string, noteOfData: any, rawHTML: string) => {
      if (rawHTML == noteOfData.content) return;
      submit(
        { ...noteOfData, content: rawHTML },
        {
          method: "post",
          action: pathname,
        }
      );
    }, 1000);
  }, []);

  useEffect(() => {
    const blocksFromHtml = convertFromHTML(data.data.note.content);
    const blocks = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    setEditorState(EditorState.createWithContent(blocks));
  }, [data.data.note.id]);

  useEffect(() => {
    setRawHTML(data.data.note.content);
    return () => {};
  }, [data.data.note.content]);

  const handleOnChange = (e: EditorState) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Container>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="...something"
      />
    </Container>
  );
}

export default Note;
