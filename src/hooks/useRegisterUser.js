import axiosInstance from "../api/axiosInstance";

const useRegisterUser = () => {
  const getAddresses = async (address, token) => {
    try {
      const response = await axiosInstance.get(`/geografia/search/${address}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCountries = async (address, token) => {
    try {
      const response = await axiosInstance.get(
        `/geografia/search-nationality/${address}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userID) => {
    try {
      const response = await axiosInstance.get(
        `/utilizadores/obterUtilizador/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserByMail = async (email) => {
    try {
      const response = await axiosInstance.get(
        `/utilizadores/obterUtilizadorPorEmail/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, palavra_passe) => {
    try {
      const params = new URLSearchParams({
        email,
        palavra_passe,
      }).toString();
      const response = await axiosInstance.post("/utilizadores/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTermsPolicy = async () => {
    try {
      const response = await axiosInstance.get("/termos_politicas", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async (email, password) => {
    try {
      const params = new URLSearchParams({
        palavra_passe: password,
        email,
      }).toString();

      const response = await axiosInstance.post(
        "/utilizadores/adicionar",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const sendForgotPassEmail = async (email) => {
    try {
      const params = new URLSearchParams({
        email,
      }).toString();

      const response = await axiosInstance.post(
        "/forgotPassword/sendMail",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  const verifyForgotPassEmailLink = async (email, key) => {
    try {
      const params = new URLSearchParams({
        email,
        key,
      }).toString();

      const response = await axiosInstance.post(
        "/forgotPassword/verifyLink",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const changeForgotPass = async (email, new_password) => {
    try {
      const params = new URLSearchParams({
        email,
        new_password,
      }).toString();

      const response = await axiosInstance.post(
        "/forgotPassword/changePassword",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (
    sexo,
    data_nasc,
    contatos,
    residencia,
    nacionalidade,
    userId,
    token,
    nome,
    _method,
    img_perfil,
    img_capa
  ) => {
    try {
      const params = new URLSearchParams({
        _method,
        sexo,
        data_nasc,
        contatos,
        residencia,
        nacionalidade,
        nome,
        img_perfil,
        img_capa,
      }).toString();

      const response = await axiosInstance.post(
        `/utilizadores/atualizar/${userId}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAddresses,
    getUser,
    addUser,
    updateUser,
    getTermsPolicy,
    login,
    getUserByMail,
    getCountries,
    sendForgotPassEmail,
    verifyForgotPassEmailLink,
    changeForgotPass,
  };
};

export default useRegisterUser;
