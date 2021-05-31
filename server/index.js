const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3001;

const app = express();

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    getPage(id: Int): Result
    getPerson(person: String!): Detail
  }

  type Result {
    count: Int
    next: String
    results: [People]
  }

  input UserInput {
    id: Int
  }

  type Detail {
    results: [Details]
  }

  type Details {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: Planet
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    films: [Film]
    species: [Species]
    vehicles: [Vehicles]
    starships: [Starships]
  }

  type Planet {
    name: String
  }

  type Species {
    name: String
  }

  type Vehicles {
    name: String
  }

  type Starships {
    name: String
  }

  type Film {
    title: String
  }

  type People {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: Planet
  }
`;

const resolvers = {
  People: {
    homeworld: async (prop) => {
      const resp = await fetch(prop.homeworld);
      return resp.json();
    }
  },
  Details: {
    homeworld: async (prop) => {
      const resp = await fetch(prop.homeworld);
      return resp.json();
    },
    films: (parent) => {
      const prom = parent.films.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      });
      return Promise.all(prom);
    },
    starships: (parent) => {
      const prom = parent.starships.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      });
      return Promise.all(prom);
    },
    vehicles: (parent) => {
      const prom = parent.vehicles.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      });
      return Promise.all(prom);
    },
    species: (parent) => {
      const prom = parent.species.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      });
      return Promise.all(prom);
    }
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getPage: async (_, { id }) => {
      const response = await fetch(`https://swapi.dev/api/people/?page=${id}`);
      return response.json();
    },
    getPerson: async (_, { person }) => {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${person}`
      );
      return response.json();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers ,introspection: true, playground: true});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
