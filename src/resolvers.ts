import { MessageAddInput, MessageAddPayload } from "./types";

const messages: string[] = [];

export const resolvers = {
  Query: {
    messages(_root: any, { page }: { page: number }) {
      // throw new Error("I'm an error!");
      return {
        items: messages,
        itemCount: 1,
        isLastPage: false,
        currentPage: page,
        totalCount: 100,
      };
    }
  },
  Mutation: {
    messageAdd(_root: any, args: { input: MessageAddInput }): MessageAddPayload {
      if (args.input.body.length > 1) {
        messages.push(args.input.body);
        return {
          message: args.input.body
        }
      }

      return {
        errors: ['Body must be longer than 1 char']
      }
    }
  }
};
