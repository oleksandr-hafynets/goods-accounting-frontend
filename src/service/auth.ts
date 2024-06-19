import type { UserSignUp, UserSignIn } from "../types/auth";
import http from "../http-common";

export const signUpWithUserDate = async (user: UserSignUp) => {
  const data = await http.post("/api/user/registration", user);
  return data.data;
};

export const signInWithUsernameAndPassword = async (user: UserSignIn) => {
  const data = await http.post("/api/user/login", user);
  return data.data;
};

export const logOutUser = async () => {
  return await http.post("/api/log-out");
};

export const checkUserToken = async () => {
  const token = localStorage.getItem("token") || "";
  const data = await http.post(
    "/api/user/check",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data;
};
