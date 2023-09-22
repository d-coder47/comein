import { toast } from "react-toastify";

const validateName = (name) => {
  if (!name || name === undefined || name?.length === 0) {
    toast.error("Nome é obrigatório!");
    return false;
  }
  return true;
};

const validateImage = (image) => {
  if (!image || image === undefined) {
    toast.error("Imagem é obrigatória!");
    return false;
  }
  return true;
};

const validateLocation = (local) => {
  if (!local || local === undefined || local?.length === 0 || local === 0) {
    toast.error("Local é obrigatório!");
    return false;
  }
  return true;
};

const validateStartDate = (startDate) => {
  if (!startDate || startDate === undefined || startDate?.length === 0) {
    toast.error("Data de início é obrigatória!");
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
    toast.error("É obrigatório adicionar pelo menos uma área cultural!");
    return false;
  }
  return true;
};

const isDatesValid = (startDate, endDate, isStartDateValid) => {
  if (!isStartDateValid) return false;

  let date1 = new Date(startDate).getTime();
  let date2 = new Date(endDate).getTime();

  if (date1 > date2) {
    toast.error("Data de fim não pode ser maior que a data de início!");
    return false;
  }
  if (date1 == date2) {
    toast.error("Datas não podem ser iguais!");
    return false;
  }
  return true;
};

export const validatePost = (values, isEvent) => {
  console.log(values);
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
