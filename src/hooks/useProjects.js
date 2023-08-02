import React from "react";
import axiosInstance from "../api/axiosInstance";

const useProjects = () => {
  const createProject = async () => {
    try {
      const response = await axiosInstance.post(`/projetos/criar`, {
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

  const updateProject = async (projectId, newName, newDescription) => {
    try {
      const params = new URLSearchParams({
        nome: newName,
        descricao: newDescription,
        _method: "PUT",
      }).toString();
      const response = await axiosInstance.post(
        `/projetos/atualizar/${projectId}`,
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

  const deleteProject = async (projectId) => {
    try {
      const params = new URLSearchParams({
        _method: "DELETE",
      }).toString();
      const response = await axiosInstance.post(
        `/projetos/eliminar/${projectId}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axiosInstance.get(`/projetos/listar`, {
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

  const getProject = async (projectId) => {
    try {
      const response = await axiosInstance.get(
        `/projetos/listar/${projectId}`,
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

  const getProjectsByUser = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/projetos/listarPorUtilizador/${userId}`,
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

  const likeProject = async (projectId, userId) => {
    try {
      const params = new URLSearchParams({
        id_utilizador: userId,
        id_publicacao: projectId,
      }).toString();
      const response = await axiosInstance.post(
        `/gostosProjetos/gosto`,
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

  const removeLikeFromProject = async (projectId) => {
    try {
      const params = new URLSearchParams({
        _method: "DELETE",
      }).toString();
      const response = await axiosInstance.post(
        `/gostosProjetos/eliminar/${projectId}`,
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

  const getProjectLikes = async (userId, projectId) => {
    try {
      const response = await axiosInstance.get(
        `/gostosProjetos/gostos/${userId},${projectId}`,
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

  const removeFavoriteFromProject = async (projectId, userId) => {
    try {
      const params = new URLSearchParams({
        _method: "DELETE",
      }).toString();
      const response = await axiosInstance.post(
        `/favoritos/removerProjetoFavoritos/${projectId},${userId}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );
      if (response?.data?.dados.toLowerCase().includes("sucesso")) return true;
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const addProjetVisit = async (idProjeto) => {
    try {
      const body = new FormData();
      body.append("idProjeto", idProjeto);
      const response = await axiosInstance.post(`/projetos/addVisit`, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization:
          //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProject,
    getProjectsByUser,
    likeProject,
    removeLikeFromProject,
    getProjectLikes,
    removeFavoriteFromProject,
    addProjetVisit,
  };
};

export default useProjects;
