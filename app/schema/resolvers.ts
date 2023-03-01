import { userList } from "../fakeData";

const resolvers = {
  Query: {
    users() {
      return userList;
    },
  },
};

export default resolvers;
