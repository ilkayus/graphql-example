import { userList, movieList } from "../fakeData";

const resolvers = {
  Query: {
    users: () => userList,
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
  },
};

export default resolvers;
