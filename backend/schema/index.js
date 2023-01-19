export const typeDefs = `#graphql
scalar Date
type Author {
  uid: String!,
  name: String,
}

type Folder {
  id: String!,
  createdAt: String,
  name: String,
  author: Author,
  notes: [Note]
}

type Note {
  id: String!,
  content: String,
  updatedAt: Date,
}

type Query {
  folders: [Folder],
  folder(folderId: String!): Folder,
  note(noteId: String): Note,
}
type Mutation {
    addFolder(name: String!): Folder
    addNote(content: String!, folderId: ID!) : Note
    updateNote(id: String!, content: String): Note
    register(uid: String!, name: String): Author
    pushNotification(content: String): Message
}

type Message {
  message: String
}
type Subscription {
  folderCreated: Message
  notification: Message
}
`;
