import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

// import fs from "fs";
// const data = fs.readFileSync("./mocks/checkin-detail.json");

const data = {
  bookingCode: "PZIGZ3",
  contactDetails: [
    {
      "@class": "EmailAddress",
      address: "TRAINER@YAHOO.FR",
    },
  ],
  itinerary: {
    type: "ONE_WAY",
    connections: [
      {
        id: 1,
        duration: "120",
        origin: {
          IATACode: "AMS",
          name: "Schiphol",
          city: {
            IATACode: "AMS",
            name: "Amsterdam",
            country: {
              code: "NL",
              name: "The Netherlands",
            },
          },
        },
        destination: {
          IATACode: "NCE",
          name: "Cote D'Azur Airport",
          city: {
            IATACode: "NCE",
            name: "Nice",
            country: {
              code: "FR",
              name: "France",
            },
          },
        },
        segments: [
          {
            id: 2,
            type: "LOCAL",
            informational: false,
            departFrom: {
              IATACode: "AMS",
              name: "Schiphol",
              city: {
                IATACode: "AMS",
                name: "Amsterdam",
                country: {
                  code: "NL",
                  name: "The Netherlands",
                },
              },
            },
            arriveOn: {
              IATACode: "NCE",
              name: "Cote D'Azur Airport",
              city: {
                IATACode: "NCE",
                name: "Nice",
                country: {
                  code: "FR",
                  name: "France",
                },
              },
            },
            marketingFlight: {
              number: "1263",
              carrier: {
                code: "KL",
                name: "KLM",
              },
              status: {
                code: "CONFIRMED",
                name: "Confirmed",
              },
              numberOfStops: 0,
              sellingClass: {
                code: "Z",
              },
              operatingFlight: {
                number: "1263",
                carrier: {
                  code: "KL",
                  name: "KLM",
                },
                duration: "PT2H",
                flown: false,
                checkInStart: "2016-10-13T03:35+02:00",
                localCheckInStart: "2016-10-13T03:35",
                checkInEnd: "2016-10-14T08:35+02:00",
                localCheckInEnd: "2016-10-14T08:35",
                scheduledArrival: "2016-10-14T11:35+02:00",
                localScheduledArrival: "2016-10-14T11:35",
                scheduledDeparture: "2016-10-14T09:35+02:00",
                localScheduledDeparture: "2016-10-14T09:35",
                arrivalTerminal: {
                  name: "2",
                },
                cabin: {
                  code: "10",
                  name: "Business",
                },
                equipment: {
                  code: "73H",
                  name: "Boeing 737-800",
                },
              },
            },
          },
        ],
      },
    ],
  },
  passengers: {
    id: 1,
    firstName: "RUUD",
    lastName: "HESP",
    title: {
      code: "MR",
      name: "Mr",
    },
  },
};

const typeDefs = `#graphql
  type Query {
    checkinInfo(input: CheckInInput): CheckInDataResponse
  }

  union CheckInDataResponse = CheckinData | ErrorContent

  input CheckInInput {
    bookingCode: String
    lastName: String
  }

  type ErrorContent {
    errorCode: Int
    message: String
  }

  type CheckinData {
    bookingCode: String
    contactDetails: [Contact]
    passengers: PassengerInfo
    itinerary: ItineraryItem
  }

  type Contact {
    address: String
  }

  type PassengerInfo {
    id: Int
    firstName: String
    lastName: String
    title: Title
  }

  type Title {
    code: String
    name: String
  }

  type ItineraryItem {
    type: ConnectionType
    connections: [ConnectionData]
  }

  enum ConnectionType {
    ONE_WAY
    MULTI_WAY
  }

  type ConnectionData {
    id: Int
    duration: String
    origin: IATAData
    destination: IATAData
    segments: [Segments]
  }

  type Segments {
    id: Int
    type: String
    informational: String
    departFrom:IATAData
    arriveOn:IATAData
  }

  type MarketFlightData {
    number: String
    carrier: String
    status: String
    numberOfStops:String
    sellingClass:String
    operatingFlight:String
  }

  interface IATAData {
    IATACode: String
    name: String
    city: City
  }

  type City {
    IATACode: String
    name: String
    country:Country
  }

  type Country{
    code: String
    name: String
  }
`;

const resolvers = {
  Query: {
    checkinInfo: (_, { input }) => {
      console.log("Input===>" + JSON.stringify(input));

      if (
        data.bookingCode === input.bookingCode &&
        data.passengers.lastName === input.lastName
      ) {
        return data;
      }

      return {
        errorCode: "404",
        message: "Booking Code and last Name is invalid",
      };
    },
  },
  CheckInDataResponse: {
    __resolveType: (parameter, context, info) => {
      if (parameter.bookingCode) {
        return "CheckinData";
      } else {
        return "ErrorContent";
      }

      return null; // GraphQLError is thrown
    },
  },
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
