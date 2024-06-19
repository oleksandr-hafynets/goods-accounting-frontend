import { defineStore } from "pinia";
import type { UserSignUp, UserSignIn } from "../types/auth";
import {
  checkUserToken,
  logOutUser,
  signInWithUsernameAndPassword,
  signUpWithUserDate,
} from "../service/auth";
import { ref } from "vue";

export const authStore = defineStore("auth", () => {
  const role = ref("");
  const signUp = async (user: UserSignUp) => {
    return await signUpWithUserDate(user);
  };

  const signIn = async (user: UserSignIn) => {
    return await signInWithUsernameAndPassword(user);
  };

  const logOut = async () => {
    return await logOutUser();
  };

  const check = async () => {
    const data = await checkUserToken();
    role.value = data.role;
  };

  return { signUp, signIn, logOut, check, role };
});
