import 'dotenv/config';
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
      },
    });
  },
});

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(
        first: 5
        orderBy: { direction: ASC, field: STARGAZERS }
      ) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  fragment repository on Repository {
    name
    url
    stargazers {
      totalCount
    }
  }
`;

client
  .query({
    query: GET_REPOSITORIES_OF_ORGANIZATION,
    variables: { organization: 'the-road-to-learn-react' },
  })
  .then(res => {
    res.data.organization.repositories.edges.forEach(edge => {
      console.log(edge.node.stargazers.totalCount);
    });
  });

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};
