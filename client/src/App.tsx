import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
  useMutation,
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
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  if (data) console.log(data);
  if (error) console.log(error);
  if (loading) return <h1>Loading...</h1>;
  console.log(movieData);
  return (
    <div>
      <h1>Data</h1>
      {data
        ? data.users.users.map((user: any) => <div>{user.username}</div>)
        : ""}
      <CreateUser refetch={refetch} />
    </div>
  );
}

function DisplayUser() {
  const [userId, setUserId] = useState(0);
  const [fetchUser, { data, loading, error }] = useLazyQuery(QUERY_SINGLE_USER);
  if (error) console.log(error);
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

function CreateUser({ refetch }: { refetch: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log(data);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div>
      <h1>Create User</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(Number(e.target.value))}
        value={age}
      />
      <input
        type="text"
        placeholder="Nationality"
        onChange={(e) => setNationality(e.target.value)}
        value={nationality}
      />
      <button
        onClick={() =>
          createUser({
            variables: { input: { name, username, age, nationality } },
          })
        }
      >
        Create
      </button>
    </div>
  );
}

const PERSONAL_INFO = gql`
  fragment PersonalInfoAboutUser on User {
    name
    age
    nationality
  }
`;

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
      ... on UsersResultSuccess {
        users {
          id
          name
          username
          age
          nationality
          type
        }
      }
      ... on UsersResultError {
        message
      }
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
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      username
      nationality
    }
  }
`;

export default App;
