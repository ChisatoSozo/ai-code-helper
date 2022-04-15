// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

export const auth = {
  // get user data
  getMessage: () => {
    // TODO
    //@ts-ignore
    return decode(this.getToken() as string);
  },

  // check if user's logged in
  isLoggedIn: () => {
    // Checks if there is a saved token and it's still valid
    // TODO
    // @ts-ignore
    const token = this.getToken();
    // TODO
    // @ts-ignore
    return !!token && !this.isTokenExpired(token); // handwaiving here
  },

  // check if token is expired
  isTokenExpired: (token: string) => {
    try {
      const decoded: { exp: Date } = decode(token);
      const { exp } = decoded;
      if (exp.getDate() < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  },

  getToken: (): string => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token') as string;
  },

  saveJwtToken: (idToken: string) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  },

  logout: () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  },
};
