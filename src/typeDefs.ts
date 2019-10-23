export const typeDefs = `
type Person {
    id: ID!
    name: String!
    films(limit: Int = 5): [Film!]!
}

type Film {
    id: ID!
    title: String!
    rtScore: Int!
    people(limit: Int = 5): [Person!]!
}

type Query {
  films(limit: Int = 5): [Film!]!
  people(limit: Int = 5): [Person!]!
}
`;
