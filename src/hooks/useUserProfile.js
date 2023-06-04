import axiosInstance from "../api/axiosInstance";

const useUserProfile = () => {
  const updateUserProfilePhotos = async (
    userId,
    _method,
    img_perfil,
    img_capa
  ) => {
    try {
      let params;
      if (img_perfil === null) {
        params = new URLSearchParams({
          _method,
          img_capa,
        }).toString();
      } else {
        params = new URLSearchParams({
          _method,
          img_perfil,
        }).toString();
      }
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
    updateUserProfilePhotos,
  };
};

export default useUserProfile;
