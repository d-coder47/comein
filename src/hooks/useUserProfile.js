import axiosInstance from "../api/axiosInstance";

const useUserProfile = () => {
  const updateUserProfileBanner = async (idUser, token, photoCapa) => {
    try {
      const params = new URLSearchParams({
        idUser,
        photoCapa,
      }).toString();

      const response = await axiosInstance.post(
        "/utilizadores/fotoCapa",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
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
      // const params = new URLSearchParams({
      //   idUser,
      //   photoPerfil,
      // }).toString();

      const body = new FormData();
      body.append("idUser", idUser);
      body.append("photoPerfil", photoPerfil);

      console.log(photoPerfil);

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
      console.log("hello");
      console.error(error);
    }
  };
  return {
    updateUserProfileBanner,
    updateUserProfilePhoto,
  };
};

export default useUserProfile;
