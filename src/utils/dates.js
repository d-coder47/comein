export const defaultDatetimeToCVDateFormat = (datetime = "") => {
  const [date, time] = datetime.split(" ");
  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year} ${time}`;
};

export const defaultDateToCVDateFormat = (date = "") => {
  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year}`;
};
