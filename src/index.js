import 'dotenv/config';
import { ApolloClient } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
console.log(process.env.GITHUB_PERSONAL_ACCESS_TOKEN);
