import {API_URL} from './config';
import {put, post, get} from './networkUtils';

// Endpoints that Doesn't Require Authentication
// const login = async (PAYLOAD) => {
//   const URL = `/auth/users/login`;
//   return post(URL, PAYLOAD, false);
// };

export {login};
