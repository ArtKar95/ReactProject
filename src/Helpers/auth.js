import store from "../redux/store";
import { history } from "./history";
import { LOGOUT_SUCCESS } from "../redux/authActionTypes";
import decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

export function saveJwt(data) {
  localStorage.setItem("token", JSON.stringify(data));
}

export function removeJwt() {
  localStorage.removeItem("token");
}

export function getJwt() {
  const token = localStorage.getItem("token");
  if (!token) {
    logout();
    return null;
  }

  const parsed = JSON.parse(token);

  const decoded = decode(parsed.jwt);

  if (decoded.exp - Date.now() / 1000 < 60) {
    return fetch(`${apiUrl}/user/${decoded.userId}/token`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: parsed.refreshToken }),
    })
      .then((response) => response.json())
      .then((newToken) => {
        if (newToken.error) {
          throw newToken.error;
        }
        saveJwt(newToken);
        return newToken.jwt;
      })
      .catch(() => {
        logout();
        return null;
      });
  }
  return Promise.resolve(parsed.jwt);
}

export function checkLoginStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
}

export const loginRequest = (data) => {
  return authRequest(data, "login");
};

export const registerRequest = (data) => {
  return authRequest(data, "register");
};

export const authRequest = (data, type) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let url;
  if (type === "login") {
    url = `${apiUrl}/user/sign-in`;
  } else if (type === "register") {
    url = `${apiUrl}/user`;
  }

  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        throw result.error;
      }
      return result;
    });
};

function logout() {
  store.dispatch({ type: LOGOUT_SUCCESS });
  history.push("/login");
}
