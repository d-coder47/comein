const arrayToString = (array) => {
  return array.join(",");
};

export const objectToFormData = (object, userId, isAdding = false) => {
  const keys = Object.keys(object);
  const values = Object.values(object);

  var formData = new FormData();
  if (!isAdding) {
    formData.append("_method", "PUT");
  }
  // formData.append("id_utilizador", userId);

  keys.forEach((key, index) => {
    formData.append(key, values[index]);
  });

  return formData;
};

export const generateLocalDateTime = (date, time) => {
  if (!date || !time) return null;
  return `${date} ${time}`;
};

export const extractDateFromLocalDateTime = (date) => {
  if (!date) return null;
  return date.split("T")[0];
};

export const extractHourFromLocalDateTime = (date) => {
  if (!date) return null;
  return date.split("T")[1] + ":00";
};

export const filterStartDate = (date) => {
  if (!date) return null;
  return date.length === 16 ? date + ":00" : date;
};

export const filterScheduleDate = (date) => {
  if (!date) return "1900-01-01T23:59:59";
  return date.length === 16 ? date + ":00" : date;
};

export const filterEndDate = (date) => {
  if (!date) return null;
  return date.length === 16 || date.length === 5 ? date + ":00" : date;
};

export const filterCulturalAreas = (culturalAreas = []) => {
  if (!culturalAreas || culturalAreas.length === 0) return null;
  return culturalAreas.length > 1
    ? arrayToString(culturalAreas.map((item) => item.id))
    : culturalAreas[0].id;
};

export const filterAssociatedProjects = (associatedProject) => {
  if (!associatedProject) return null;
  return associatedProject.length > 0
    ? associatedProject.length > 1
      ? arrayToString(associatedProject.map((item) => item.id)).slice(0, -1)
      : arrayToString(associatedProject.map((item) => item.id))
    : null;
};

export const filterAssociatedOwners = (associatedOwners) => {
  let isArray = Array.isArray(associatedOwners);
  if (!associatedOwners || associatedOwners?.length === 0 || !isArray)
    return null;

  return arrayToString(associatedOwners.map((item) => item.id));
};

export const cleanPost = (post, isAdding = true) => {
  Object.keys(post).forEach((key) => {
    if (key === "local" && !isAdding) {
      post["id_geografia"] = !post[key].id ? null : post[key].id;
    }

    if (isAdding && key === "data_fim" && post[key] === null) {
      delete post[key];
    }

    if (!isAdding && post[key] === null && key !== "idsProprietarios") {
      delete post[key];
    }

    if (key === "imagem" || key === "proprietarios" || key === "local") {
      delete post[key];
    }
  });
  return post;
};

export const cleanProgram = (post, isAdding = true) => {
  Object.keys(post).forEach((key) => {
    if (
      !isAdding &&
      (post[key] === null || post[key] === undefined || post[key] === "")
    ) {
      delete post[key];
    }
  });
  return post;
};
