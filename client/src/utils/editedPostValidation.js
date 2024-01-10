import { toast } from "react-toastify";

export const validateEditedPost = (values, isEvent, translatedStrings) => {
  const validateName = (name) => {
    if (Object.keys(values).includes("nome")) {
      if (!name || name === undefined || name?.length === 0) {
        toast.error(translatedStrings[0]);
        return false;
      }

      return true;
    }

    return true;
  };

  const validateImage = (image) => {
    if (Object.keys(values).includes("imagem")) {
      if (!image || image === undefined) {
        toast.error(translatedStrings[1]);
        return false;
      }
      return true;
    }
    return true;
  };

  const validateResizedImage = (image) => {
    if (Object.keys(values).includes("imagem")) {
      if (!image || image === undefined) {
        toast.error(translatedStrings[8]);
        return false;
      }
      return true;
    }
    return true;
  };

  const validateLocation = (location) => {
    if (Object.keys(values).includes("local")) {
      if (!location.local || !location.lat || !location.lng) {
        toast.error(translatedStrings[2]);
        return false;
      }
      return true;
    }
    return true;
  };

  const validateStartDate = (startDate) => {
    if (
      Object.keys(values).includes("data_inicio") ||
      Object.keys(values).includes("hora_inicio")
    ) {
      if (!startDate || startDate === undefined || startDate?.length === 0) {
        toast.error(translatedStrings[3]);
        return false;
      }

      if (!startDate.includes("T")) {
        toast.error(translatedStrings[4]);
        return false;
      }
      return true;
    }

    if (
      Object.keys(values).includes("data_fim") ||
      Object.keys(values).includes("hora_fim")
    ) {
      return true;
    }
    return true;
  };

  const validateEndDate = () => {
    if (
      Object.keys(values).includes("data_fim") ||
      Object.keys(values).includes("hora_fim")
    ) {
      return true;
    }
    return true;
  };

  const validateCulturalArea = (culturarArea) => {
    if (Object.keys(values).includes("areasCulturais")) {
      if (
        !culturarArea ||
        culturarArea === undefined ||
        culturarArea?.length === 0
      ) {
        toast.error(translatedStrings[5]);
        return false;
      }
      return true;
    }
    return true;
  };

  const validateOwners = () => {
    if (Object.keys(values).includes("proprietarios")) {
      return true;
    }
    return true;
  };

  const isDatesValid = (startDate, endDate, isStartDateValid) => {
    if (
      Object.keys(values).includes("data_inicio") ||
      Object.keys(values).includes("hora_inicio") ||
      Object.keys(values).includes("data_fim") ||
      Object.keys(values).includes("hora_fim")
    ) {
      if (!isStartDateValid) return false;
      if (!endDate) return true;

      let date1;
      let date2;

      if (!endDate.includes("T")) {
        const charIndex = startDate.indexOf("T");

        if (charIndex !== -1) {
          const modifiedStartDateString = startDate.slice(0, charIndex);

          date1 = new Date(modifiedStartDateString).getTime();
          date2 = new Date(endDate).getTime();
        }
      } else {
        date1 = new Date(startDate).getTime();
        date2 = new Date(endDate).getTime();
      }

      if (date1 > date2) {
        toast.error(translatedStrings[6]);
        return false;
      }
      if (date1 == date2 && endDate.includes("T")) {
        toast.error(translatedStrings[7]);
        return false;
      }

      return true;
    }

    return true;
  };

  const successOnValidateName = validateName(values?.nome);
  const successOnValidateImage = validateImage(
    isEvent ? values?.imgEvento : values?.imgProjeto
  );
  const successOnValidateResizedImage = validateResizedImage(
    isEvent ? values?.imgEventoRecortada : values?.imgProjetoRecortada
  );
  const successOnValidateLocation = validateLocation(values?.local);
  const successOnValidateStartDate = isEvent
    ? validateStartDate(values?.data_inicio)
    : true;
  const successOnValidateEndDate = isEvent
    ? validateEndDate(values?.data_fim)
    : true;
  const successOnValidateCulturalArea = validateCulturalArea(
    values?.areasCulturais
  );
  const successOnValidateOwners = validateOwners(values?.proprietarios);

  const successOnIsDatesValid = isEvent
    ? isDatesValid(
        values?.data_inicio,
        values?.data_fim,
        successOnValidateStartDate
      )
    : true;

  return (
    successOnValidateName &&
    successOnValidateImage &&
    successOnValidateResizedImage &&
    successOnValidateLocation &&
    successOnValidateStartDate &&
    successOnValidateCulturalArea &&
    successOnValidateOwners &&
    successOnIsDatesValid &&
    successOnValidateEndDate
  );
};
