// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// get user data
export const getProfile = () => {
  return decode(getToken() as string);
};

// check if user's logged in
export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && !isTokenExpired(token); // handwaiving here
};

// check if token is expired
export const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: Date } = decode(token);
    const { exp } = decoded;
    if (exp.getDate() < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
};

export const login = (idToken: string) => {
  // Saves user token to localStorage
  localStorage.setItem('id_token', idToken);
  window.location.assign('/');
};

export const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('id_token');
  // this will reload the page and reset the state of the application
  window.location.assign('/');
};