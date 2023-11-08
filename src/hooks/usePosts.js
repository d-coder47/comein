import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [reachedEndPage, setReachedEndPage] = useState(false);
  const pageSize = 9;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axiosInstance.get(
          `/publicacoes/listarPaginacao/${page},${pageSize}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        setPosts(response?.data?.dados);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  const getPostsByArea = async (culturalAreaId) => {
    try {
      const response = await axiosInstance.get(
        `/publicacoes/listar/${culturalAreaId}`,
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

  const getHighlightPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `/publicacoes/listar/destaques`,
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

  const searchPosts = async (search) => {
    try {
      const response = await axiosInstance.get(
        `/publicacoes/pesquisaInput/${search}`,
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

  const likePost = async (userId, postId, postType) => {
    try {
      const body = new FormData();
      body.append("id_utilizador", userId);
      body.append("id_publicacao", postId);
      body.append("type", postType);

      const response = await axiosInstance.post(`/gostos`, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.dados.includes("Removeu")) return false;
      if (response?.data?.dados.includes("Gostou")) return true;
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const favoritePost = async (userId, postId, postType) => {
    try {
      const body = new FormData();
      body.append("id_utilizador", userId);
      body.append("id_publicacao", postId);
      body.append("type", postType);

      const response = await axiosInstance.post(
        `/favoritos/addFavoritos`,
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.dados.toLowerCase().includes("adicionado"))
        return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  };

  const getEventPostByUser = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/eventos/obterEventosPorUtilizador/${userId}`,
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

  const getProjectPostByUser = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/projetos/listarPorUtilizador/${userId}`,
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

  const getFavoritsPostByUser = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/favoritos/getFavoritos/${userId}`,
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

  const getPostsByPage = async () => {
    if (reachedEndPage) return;
    try {
      const response = await axiosInstance.get(
        `/publicacoes/listarPaginacao/${page + 1},${pageSize}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (!response?.data) return setReachedEndPage(true);

      const oldPosts = [...posts];
      const newPosts = [...oldPosts, ...response?.data?.dados];

      setPage((previous) => previous + 1);

      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getPostsByArea,
    getHighlightPosts,
    searchPosts,
    likePost,
    favoritePost,
    posts,
    getEventPostByUser,
    getProjectPostByUser,
    getFavoritsPostByUser,
    getPostsByPage,
  };
};

export default usePosts;
