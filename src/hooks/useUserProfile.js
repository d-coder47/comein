import axiosInstance from "../api/axiosInstance";

const useUserProfile = () => {
  const updateUserProfileBanner = async (idUser, photoCapa) => {
    try {
      let body = new FormData();
      body.append("idUser", idUser);
      body.append("photoCapa", photoCapa);

      const response = await axiosInstance.post(
        "/utilizadores/fotoCapa",
        body,
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
  const updateUserProfilePhoto = async (idUser, photoPerfil) => {
    try {
      let body = new FormData();
      body.append("idUser", idUser);
      body.append("photoPerfil", photoPerfil);

      const response = await axiosInstance.post(
        "/utilizadores/fotoPerfil",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserProfile = async (idUser) => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
      }).toString();
      const response = await axiosInstance.post(
        `/utilizadores/remover/${idUser}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addUserbio = async (id_utilizador, bio) => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
        id_utilizador,
        bio,
      }).toString();
      const response = await axiosInstance.post("/utilizadores/bio", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization:
          //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (idUser, password, new_password) => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
        idUser,
        password,
        new_password,
      }).toString();
      const response = await axiosInstance.post(
        "/utilizadores/mudarPalavraPasse",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const reportProblem = async (id_utilizador, msg, type) => {
    try {
      const params = new URLSearchParams({
        id_utilizador,
        msg,
        type,
      }).toString();
      const response = await axiosInstance.post(
        "/utilizadores/comunicarProblema",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserProfileFollowers = async (idUser) => {
    try {
      const response = await axiosInstance.get(
        `/utilizadores/followers/${idUser}`,
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

  const getUserProfileVisits = async (idUser) => {
    try {
      const response = await axiosInstance.get(
        `/utilizadores/visits/${idUser}`,
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

  const isFollowing = async (userId, followedId) => {
    try {
      const response = await axiosInstance.get(
        `/utilizadores/seguidor/${(followedId, userId)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.dados === "Não seguir") return false;
      if (response?.data?.dados === "Está a seguir") return true;
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const followUser = async (userId, followedId) => {
    try {
      const body = new FormData();
      body.append("id_utilizador", followedId);
      body.append("id_seguidor", userId);

      const response = await axiosInstance.post(`/utilizadores/seguir`, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.dados === "Ok") return true;
      if (response?.data?.dados === "Não seguir") return true;
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    updateUserProfileBanner,
    updateUserProfilePhoto,
    deleteUserProfile,
    changePassword,
    addUserbio,
    reportProblem,
    getUserProfileFollowers,
    getUserProfileVisits,
    isFollowing,
    followUser,
  };
};

export default useUserProfile;
