const arrayToString = (array) => {
  return array.reduce((total, current, index, arr) => {
    if (index === 1) return `${total},${current},`;
    if (index === arr.length - 1) return total + current;
    return total + current + ",";
  });
};

export const objectToFormData = (object, userId) => {
  const keys = Object.keys(object);
  const values = Object.values(object);

  var formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("id_utilizador", userId);

  keys.forEach((key, index) => {
    formData.append(key, values[index]);
  });

  return formData;
};

export const filterStartDate = (date) => {
  if (!date) return null;
  return date.length === 16 ? date + ":00" : date;
};

export const filterEndDate = (date) => {
  if (!date) return null;
  return date.length === 16 ? date + ":00" : date;
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
  if (!associatedOwners) return null;
  return associatedOwners.length > 0
    ? associatedOwners.length > 1
      ? arrayToString(associatedOwners.map((item) => item.id)).slice(0, -1)
      : arrayToString(associatedOwners.map((item) => item.id))
    : null;
};

export const cleanPost = (post) => {
  Object.keys(post).forEach((key) => {
    if (post[key] === null || post[key] === "imagem") {
      delete post[key];
    }
  });
  console.log(post);
  return post;
};
