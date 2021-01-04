// Wrapper for Axios

import axios from 'axios';
import {Storage} from '../utils';
import {API_URL} from './config';
// import {versionCode, buildNumber} from '../../package.json';

// Request interceptor function
// // eslint-disable-next-line no-unused-vars
// const reqInterceptor = (x) => {
//   const headers = {
//     ...x.headers.common,
//     ...x.headers[x.method],
//     ...x.headers,
//   };

//   ['common', 'get', 'post', 'head', 'put', 'patch', 'delete'].forEach(
//     (header) => {
//       delete headers[header];
//     },
//   );

//   const printable = `${new Date()} | Request: ${x.method.toUpperCase()} | ${
//     x.url
//   } | ${JSON.stringify(x.data)} | ${JSON.stringify(headers)}`;
//   console.log('============================');
//   console.log(printable);
//   console.log('============================');

//   return x;
// };

// // Result interceptor function
// // eslint-disable-next-line no-unused-vars
// const resInterceptor = (x) => {
//   const printable = `${new Date()} | Response: ${x.status} | ${JSON.stringify(
//     x.data,
//   )}`;
//   console.log('============================');
//   console.log(printable);
//   console.log('============================');

//   return x;
// };

// /*
//   Main axios instance with a request interceptor to add versionCode and buildNumber
//   to request as query params.
// */
let axiosInstance = axios.create({
  baseURL: API_URL,
});
// axiosInstance.interceptors.request.use((config) => ({
//   ...config,
//   params: {
//     versionCode,
//     buildNumber,
//     ...config.params,
//   },
// }));

// variable to cancel requests before request is completed
let cancel;

// Function to log network errors in console
const networkErrorLogger = (e, URL, PAYLOAD, CONFIG) => {
  console.info(
    `REQUEST TO: ${URL} with PAYLOAD: ${JSON.stringify(
      PAYLOAD,
    )} and CONFIG: ${JSON.stringify(CONFIG)} failed!`,
  );
  console.info(JSON.stringify(e));
  if (axios.isCancel(e)) {
    throw e.message;
  }
  if (e.message === 'Network Error') {
    throw 'Network Error. Ensure you are connected to internet.';
  } else {
    const {status, data} = e.response;
    console.warn(`ERROR STATUS: ${status}\n`);
    const {error, metadata} = data;
    if (typeof error === 'string') {
      if (metadata) {
        throw {error, metadata};
      } else {
        throw error;
      }
    } else {
      throw 'Something went wrong, contact admin';
    }
  }
};

// Function to add access and id token to requests
const setUpConfig = async () => {
  try {
    // await checkTokenExpiry();
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        'content-type': 'application/json',
        'x-access-token': access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    console.log('Error Setting Config');
  }
};

const setUpMultipartConfig = async () => {
  try {
    // await checkTokenExpiry();
    const access_token = await Storage.getUserAccessToken();
    const CONFIG = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': access_token,
      },
    };
    return CONFIG;
  } catch (e) {
    console.log('Error Setting Config');
  }
};

// Function for GET requests
const get = async (URL, isAuthenticated = true, params = {}) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      result = await axiosInstance.get(URL, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
      });
    } else {
      result = await axiosInstance.get(URL, {params});
    }
    // console.info(`GET TO: ${URL} and CONFIG: ${JSON.stringify(CONFIG)}`);
    // console.log(`Returned: ${JSON.stringify(result.data.data)}`);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, 'nil', CONFIG);
  }
};

// Function for POST requests
const post = async (
  URL,
  PAYLOAD = {},
  isAuthenticated = true,
  params = {},
  fileUpload = false,
) => {
  let CONFIG = 'nil';
  const CancelToken = axios.CancelToken;
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = fileUpload ? await setUpMultipartConfig() : await setUpConfig();
      result = await axiosInstance.post(URL, PAYLOAD, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      });
    } else {
      result = await axiosInstance.post(URL, PAYLOAD, {
        params,
      });
    }
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

// Function for PUT requests
const put = async (
  URL,
  PAYLOAD = {},
  isAuthenticated = true,
  params = {},
  fileUpload = false,
) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = fileUpload ? await setUpMultipartConfig() : await setUpConfig();
      result = await axiosInstance.put(URL, PAYLOAD, {
        ...CONFIG,
        params: {...CONFIG?.params, ...params},
      });
    } else {
      result = await axiosInstance.put(URL, PAYLOAD, {params});
    }
    // console.info(
    //   `PUT TO: ${URL} with PAYLOAD: ${JSON.stringify(
    //     PAYLOAD,
    //   )} and CONFIG: ${JSON.stringify(CONFIG)}`,
    // );
    // console.log(`Returned: ${JSON.stringify(result.data.data)}`);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

// Function for DELETE requests
const _del = async (URL, PAYLOAD = {}, isAuthenticated = true, params = {}) => {
  let CONFIG = 'nil';
  try {
    let result;
    if (isAuthenticated) {
      CONFIG = await setUpConfig();
      const delConfig = {data: PAYLOAD, headers: CONFIG.headers};
      result = await axiosInstance.delete(URL, {
        ...delConfig,
        params: {...delConfig?.params, ...params},
      });
    } else {
      const delConfig = {data: PAYLOAD};
      result = await axiosInstance.delete(URL, {
        ...delConfig,
        params: {...delConfig?.params, ...params},
      });
    }
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

// Function to cancel requests
const cancelRequest = (message) => {
  cancel(message);
};

/*
  Function to check token expiry
  Token generated time and current time are compared. New Token is
  requested is difference is greater than 20 minutes.
*/
const checkTokenExpiry = async () => {
  const tokenGeneratedTime = await Storage.getTokenGeneratedTime();
  if (tokenGeneratedTime + 20 * 60 * 1000 <= new Date().getTime()) {
    const email = await Storage.getUserMailID();
    try {
      const {access_token, id_token, refresh_token} = await refreshToken({
        email,
      });
      console.log('token updated');
      await Storage.setUserAccessToken(access_token);
      await Storage.setUserIDToken(id_token);
      await Storage.setUserRefreshToken(refresh_token);
      await Storage.setTokenGeneratedTime(new Date().getTime());
    } catch (e) {
      console.log('new token fetching error: ', e);
    }
  }
};

// Function to get updated tokens
const refreshToken = async (PAYLOAD = {}) => {
  let CONFIG;
  try {
    const refresh_token = await Storage.getUserRefreshToken();
    CONFIG = {
      headers: {
        'content-type': 'application/json',
        'x-refresh-token': refresh_token,
      },
    };
  } catch (e) {
    console.log('Error Setting RefreshConfig,', e);
    return;
  }
  const URL = '/users/tokens/renew';
  try {
    const result = await axiosInstance.post(URL, PAYLOAD, CONFIG);
    return result.data.data;
  } catch (e) {
    networkErrorLogger(e, URL, PAYLOAD, CONFIG);
  }
};

export {put, post, get, _del, cancelRequest, checkTokenExpiry};
