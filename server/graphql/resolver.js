// const fs = require("fs");
// const data = fs.readFileSync('../mocks/checkin-detail.json');


const resolvers = {
  Query: {
    hello: () => JSON.parse(data),
  },
};
