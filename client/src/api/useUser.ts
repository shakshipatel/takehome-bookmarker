import { axios_instance } from "@/lib/axios";
import { errorToast } from "@/lib/toast";

import { useState } from "react";

const useUser = () => {
  const [userLoading, setUserLoading] = useState(false);

  const signUp = async (
    payload: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    },
    callback: Function
  ) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.post("/user/signup", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to register. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setUserLoading(false);
    }
  };

  const signIn = async (
    payload: { email: string; password: string },
    callback: Function
  ) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.post("/user/signin", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to login. Please try again"
        );
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setUserLoading(false);
    }
  };

  return {
    userLoading,
    signUp,
    signIn,
  };
};

export default useUser;
