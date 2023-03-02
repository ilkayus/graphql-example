import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
        <DisplayUser />
      </div>
    </ApolloProvider>
  );
}

function DisplayData() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  console.log(data, movieData);
  if (error) console.log(error);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Data</h1>
      {data ? data.users.map((user: any) => <div>{user.username}</div>) : ""}
    </div>
  );
}

function DisplayUser() {
  const [userId, setUserId] = useState(0);
  const [fetchUser, { data, loading, error }] = useLazyQuery(QUERY_SINGLE_USER);
  // if (error) console.log(error);
  if (loading) return <h1>Loading...</h1>;
  console.log(userId);
  console.log(data);
  return (
    <div>
      <h1>User</h1>
      <input
        type="text"
        onChange={(e) => setUserId(Number(e.target.value))}
        value={userId}
      />
      <button onClick={() => fetchUser({ variables: { userId } })}>Get</button>
    </div>
  );
}

const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      age
      name
      nationality
      favoriteMovies {
        id
        name
        year
        rating
        inTheaters
      }
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      id
      name
      year
    }
  }
`;

export default App;
