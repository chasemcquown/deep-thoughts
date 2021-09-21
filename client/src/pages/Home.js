import React from 'react';

import ThoughtList from '../components/ThoughtList';

// below we are importing the useQuery hook from apollo client which will enable us to make requests to the graphQL server we cnnected to and made available to the application using the <ApolloProvider> component in App.js
import { useQuery } from '@apollo/client';
// import the QUERY_THOUGHTS query we created from utils
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS)

  // below,  we're saying is, if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {/* IMPORTANT NOTE: if the query hasn't completed and loading is still defined, we display a message to indicate just that. Once the query is complete and loading is undefined, we pass the thoughts array and a custom title to the <ThoughtList> component as props */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
