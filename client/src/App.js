import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// import Header from './components/Header';
// import Footer from './components/Footer';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import NoMatch from './pages/NoMatch';
// import SingleThought from './pages/SingleThought';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';

// // below, we establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink()
// const httpLink = createHttpLink({
//   uri: '/graphql'
// });

// // below, we use the ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

// function App() {
//   return (
//     // enable our entire application to interact with our Apollo Client instance below as follows:
//     <ApolloProvider client={client}>
//       {/* NOTE: we've wrapped the <div className="flex-column"> element in a Router component, which makes all of the child components on the page aware of the client-side routing that can take place now */}
//       <Router>
//         <div className='flex-column justify-flex-start min-100-vh'>
//           <Header />
//           <div className='container'>
//             <Switch>
//               {/* NOTE: we've set up several Route components that signify this part of the app as the place where content will change according to the URL route. When the route is /, the Home component will render here. When the route is /login, the Login component will render */}
//               <Route exact path='/' component={Home} />
//               <Route exact path='/login' component={Login} />
//               <Route exact path='/signup' component={Signup} />
//               <Route exact path="/profile/:username?" component={Profile} />
//               <Route exact path="/thought/:id" component={SingleThought} />

//               <Route component={NoMatch} />
//             </Switch>
//           </div>
//           <Footer />
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;
