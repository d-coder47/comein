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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const countNotifications = async (userId) => {
    try {
      const notificationData = await getUserNotifications(userId);
      var count = 0;

      console.log(notificationData);

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

  return {
    getAllNotifications,
    getUserNotifications,
    addNotifications,
    countNotifications,
  };
};

export default useNotifications;
