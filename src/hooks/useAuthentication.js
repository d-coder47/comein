import { useState } from "react";

const useAuthentication = () => {
  const [token, setToken] = useState();

  const getToken = () => {
    return token;
  };

  return {
    getToken,
    setToken,
  };
};

export default useAuthentication;
