export const redirectToProfilePage = (userId, userName) => {
  const validName = userName
    .toLowerCase()
    .trim()
    .replaceAll(" ", "_")
    .replaceAll("/", "_")
    .replaceAll(".", "");

  return `/perfil/${userId}/${validName}`;
};

export const redirectToProfileConfigPage = (userId, userName) => {
  const validName = userName
    .toLowerCase()
    .trim()
    .replaceAll(" ", "_")
    .replaceAll("/", "_")
    .replaceAll(".", "");

  return `/perfil-utilizador-configuracao/${userId}/${validName}`;
};
