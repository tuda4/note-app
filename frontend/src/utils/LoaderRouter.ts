import { graphQLRequest } from "./request";
export const HomeLoader = async () => {
  const query = `query Folders  {
      folders {
        createdAt
        id
        name
      }
    }
    `;
  const data = await graphQLRequest({ query });
  return data;
};


export const NoteListLoader = async ({ params: { folderId } }: any) => {
  const query = `query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          id
          content
          updatedAt
        }
      }
    }`;
  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;
};

export const NoteLoader = async ({ params: { noteId } }: any) => {
  const query = `query Note($noteId: String) {
        note(noteId: $noteId) {
          content
          id
        }
      }`;

  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};

export const addNewFolder = async (newFolder: any) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;
  const data = graphQLRequest({
    query,
    variables: {
      name: newFolder.name,
    },
  });
  return data;
};

export const addNewNote = async ({ params, request }: any) => {
  const newNote = await request.formData();
  const formDataObj: any = {};
  newNote.forEach((value: any, key: any) => (formDataObj[key] = value));

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const addNote = await graphQLRequest({
    query,
    variables: formDataObj,
  });

  console.log({ addNote });
  return addNote;
};

export const updateNote = async ({ params, request }: any) => {
  const updatedNote = await request.formData();
  const formDataObj: any = {};

  updatedNote.forEach((value: any, key: any) => (formDataObj[key] = value));

  const query = `mutation Mutation($id: String!, $content: String) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;
  const updateNote = await graphQLRequest({
    query,
    variables: formDataObj,
  });

  return updateNote;
};
