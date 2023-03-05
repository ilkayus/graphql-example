import { userList, movieList } from "../fakeData";

const resolvers = {
  Query: {
    users: () => {
      if (userList) return { users: userList };
      return { message: "There was an error!" };
    },
    user: (parent: any, { id }: { id: string }) =>
      userList.find((user) => user.id === Number(id)),
    movies: () => movieList,
    movie: (parent: any, { name }: { name: string }) =>
      movieList.find((movie) => movie.name === name),
  },
  User: {
    favoriteMovies: () => movieList.filter((movie) => movie.rating > 3),
  },

  Mutation: {
    createUser: (parent: any, args: any) => {
      const user = args.input;
      const id = userList.length + 1;
      user.id = id;
      userList.push(user);
      console.log(user);
      return user;
    },

    updateUsername: (user: any, args: any) => {
      userList[args.input.id - 1].username = args.input.username;
      return userList[args.input.id - 1];
    },

    deleteUser: (user: any, args: any) => {
      userList.splice(args.id - 1, 1);
      return "User deleted";
    },
  },

  UsersResult: {
    __resolveType(obj: any) {
      if (obj.users) return "UsersResultSuccess";
      if (obj.message) return "UsersResultError";
      return null;
    },
  },
};

export default resolvers;
