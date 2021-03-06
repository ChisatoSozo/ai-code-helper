import React from 'react';
import { render } from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, MessengerPage, SignupPage } from './pages';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';

const httpLink = createHttpLink({
  uri: `${process.env.PUBLIC_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#39603D',
    },
    secondary: {
      main: '#678e85',
    },
    info: {
      main: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
    background: {
      default: '#daded4',
      paper: '#ffffffcc',
    },
  },
  typography: {
    fontFamily: "'Exo 2',sans-serif",
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignupPage />} />
          <Route path={'/messenger'} element={<MessengerPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
