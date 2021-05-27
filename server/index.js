const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3001;

const app = express();

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`   
    type Query
    {
        hello(name: String): String!
        getPage(id: Int!): Result
        getPerson(person: String!): Result
    }

    type Result
    {
        next: String
        results: [People]
    }

    type Planet
    {
        name: String
        rotation_period: String
        orbital_period: String
    }

   type People
   {
    name: String 
    height: String 
    mass: String
    gender: String 
    homeworld: Planet
   } 
`;

const resolvers = {
    // Result:
    // {
    //     results: prop =>
    //     {
    //         const promises = prop.results.map(async (url) =>
    //         {
    //             const res = await fetch(url);
    //             return res.json;
    //         });
    //         return Promise.all(promises);  
    //     }
    // },
    People:
    {
        homeworld: async prop =>
        {
            const resp = await fetch(prop.homeworld);
            return resp.json();
        }
    },
    Query: {
      hello:(_, {name}) => `Hello ${name || "World"}`,
      getPage: async (_, {id})=>
      {
        const response = await fetch(`https://swapi.dev/api/people/?page=${id}`);     
        return response.json();   
      },
      getPerson: async (_, {person})=>
      {
        const response = await fetch(`https://swapi.dev/api/people/?search=${person}`);     
        return response.json();   
      }
    }
  };

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
  
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
// server.listen().then(({ url }) => {
// console.log(`🚀  Server ready at ${url}`);
// });
  
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// app.listen(PORT, () => {
// console.log(`Server listening on ${PORT}`);
// });