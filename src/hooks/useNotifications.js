import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useNotifications = () => {
  const getAllNotifications = async () => {
    try {
      const response = await axiosInstance.get(
        "/notificacoes/obterNotificacoes",
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

  const getUserNotifications = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/notificacoes/obterNotificacoesPorUtilizador/${userId}`,
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

  const addNotifications = async (userId, pubId, pubType, msg) => {
    try {
      const params = new URLSearchParams({
        id_promotor: userId,
        id_publicacao: pubId,
        tipo_publicacao: pubType,
        mensagem: msg,
      }).toString();
      const response = await axiosInstance.post(
        "/notificacoes/adicionarNotificacao",
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

  const countNotifications = async (userId) => {
    try {
      const notificationData = await getUserNotifications(userId);
      var count = 0;

      notificationData.dados.map((notification) => {
        if (notification.vista === "N") {
          ++count;
        }
      });

      return count;
    } catch (error) {
      console.error(error);
    }
  };

  const alterarEstadoNotificacoes = async () => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
      }).toString();
      const response = await axiosInstance.post(
        "/notificacoes/alterarEstadoNotificacoes",
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

  const alterarEstadoNotificacao = async (idNotificacao) => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
      }).toString();
      const response = await axiosInstance.post(
        `/notificacoes/alterarEstadoNotificacao/${idNotificacao}`,
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

  const removerNotificacao = async (idNotificacao) => {
    try {
      const params = new URLSearchParams({
        _method: "PUT",
      }).toString();
      const response = await axiosInstance.post(
        `/notificacoes/removerNotificacao/${idNotificacao}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getAllNotifications,
    getUserNotifications,
    addNotifications,
    countNotifications,
    alterarEstadoNotificacoes,
    alterarEstadoNotificacao,
    removerNotificacao,
  };
};

export default useNotifications;
