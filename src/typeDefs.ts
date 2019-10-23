export const typeDefs = `
type MessagesPage {
    items: [String!]!
    itemCount: Int!
    currentPage: Int!
    totalCount: Int!
    isLastPage: Boolean!
}

type MessageAddPayload {
    message: String
    errors: [String!]
}

input MessageAddInput {
    body: String!
}

type Query {
    messages(page: Int = 1, itemsPerPage: Int = 10): MessagesPage!
}

type Mutation {
    messageAdd(input: MessageAddInput!): MessageAddPayload!
}
`;
