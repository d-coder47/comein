import axiosInstance from "../api/axiosInstance";

const useRegisterFormData = () => {
  const getCountries = async () => {
    try {
      const response = await axiosInstance.get("/geografia/search/Mind,3", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization:
          //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
        },
      });
      // Handle successful response
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return { getCountries };
};

export default useRegisterFormData;
