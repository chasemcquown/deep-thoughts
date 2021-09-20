// import the gql tagged template function 
const { gql } = require('apollo-server-express');

// create our typeDefs
// NOTE: all type definitions need to specify what type of data is expected in return, no matter what--in our case its a string.
const typeDefs = gql`

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

`;

// export the typeDefs
module.exports = typeDefs

// NOTES:
// Notice the exclamation point ! after the query parameter data type definitions? That indicates that for that query to be carried out, that data must exist. Otherwise, Apollo will return an error to the client making the request and the query won't even reach the resolver function associated with it