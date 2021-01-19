import { getJwt } from "./auth";

const defaultError = { message: "Something wrong!" };

// const request = async (url, method = "GET", body) => {
//   const config = {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   if (body) {
//     config.body = JSON.stringify(body);
//   }
//   const response = await fetch(url, config);
//   const json = await response.json();
//   return json;
// };

async function request(url, method = "GET", body) {
  const jwt = await getJwt();
  if (!jwt) {
    return Promise.reject(defaultError);
  }
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        throw result.error;
      }

      return result;
    });
}

export default request;
