import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const validateName = (name) => {
  if (!name || name === undefined || name?.length === 0) {
    toast.error(t("postValidationsErrors.nomeObrigatorio"));
    return false;
  }
  return true;
};

const validateImage = (image) => {
  if (!image || image === undefined) {
    toast.error(t("postValidationsErrors.imagemObrigatorio"));
    return false;
  }
  return true;
};

const validateLocation = (local) => {
  if (!local || local === undefined || local?.length === 0 || local === 0) {
    toast.error(t("postValidationsErrors.localObrigatorio"));
    return false;
  }
  return true;
};

const validateStartDate = (startDate) => {
  if (!startDate || startDate === undefined || startDate?.length === 0) {
    toast.error(t("postValidationsErrors.dataInicioObrigatorio"));
    return false;
  }

  if (!startDate.includes("T")) {
    toast.error(t("postValidationsErrors.horaInicioObrigatorio"));
    return false;
  }
  return true;
};

const validateCulturalArea = (culturarArea) => {
  if (
    !culturarArea ||
    culturarArea === undefined ||
    culturarArea?.length === 0
  ) {
    toast.error(t("postValidationsErrors.areaCulturalObrigatorio"));
    return false;
  }
  return true;
};

const isDatesValid = (startDate, endDate, isStartDateValid) => {
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
    toast.error(t("postValidationsErrors.dataFimMaiorInicio"));
    return false;
  }
  if (date1 == date2 && endDate.includes("T")) {
    toast.error(t("postValidationsErrors.datasNaoPodemSerIguais"));
    return false;
  }

  return true;
};

export const validatePost = (values, isEvent) => {
  const successOnValidateName = validateName(values?.nome);
  const successOnValidateImage = validateImage(
    isEvent ? values?.imgEvento : values?.imgProjeto
  );
  const successOnValidateLocation = validateLocation(values?.id_geografia);
  const successOnValidateStartDate = isEvent
    ? validateStartDate(values?.data_inicio)
    : true;
  const successOnValidateCulturalArea = validateCulturalArea(
    values?.areasCulturais
  );
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
    successOnValidateLocation &&
    successOnValidateStartDate &&
    successOnValidateCulturalArea &&
    successOnIsDatesValid
  );
};
