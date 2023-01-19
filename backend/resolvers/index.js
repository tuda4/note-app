import { GraphQLScalarType } from "graphql";
import { FolderModel, AuthorModel, NoteModel, NotificationModel } from "../model/index.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();


export const resolvers = {

  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({ updatedAt: "desc" });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  Folder: {
    author: async (parent, arg) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({ uid: authorId });
      return author;
    },
    notes: async (parent, arg) => {
      const notes = await NoteModel.find({ folderId: parent.id }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      pubsub.publish("FOLDER_CREATE", {
        folderCreated: {
          message: "A new folder created successfully",
        },
      });
      await newFolder.save();
      return newFolder;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);

      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content,
        },
      });

      await newNotification.save();
      return { message: 'SUCCESS'}
    }
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(['FOLDER_CREATE', 'NOTE_CREATE']),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
    }
  },
};
