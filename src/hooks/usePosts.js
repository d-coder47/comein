import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axiosInstance.get(`/publicacoes/listar`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        setPosts(response.data.dados);
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
          // Authorization:
          //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
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
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
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

  return {
    getPostsByArea,
    getHighlightPosts,
    searchPosts,
    likePost,
    favoritePost,
    posts,
  };
};

export default usePosts;
