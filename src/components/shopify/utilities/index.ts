const formatMonth = (value: number) => {
  const appendZero = value <= 8 ? `0${value + 1}` : value + 1;
  return appendZero;
};

const formatDay = (value: number) => {
  const appendZero = value < 10 ? `0${value}` : value;
  return appendZero;
};

export const formatDate = (date: Date) => {
  const getFullYear = new Date(date).getFullYear();
  const getMonth = new Date(date).getMonth();
  const getDate = new Date(date).getDate();

  return `${getFullYear}-${formatMonth(getMonth)}-${formatDay(getDate)}`;
};

export const nextDay = (date: string) => {
  const nextDay = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);
  const getFullYear = nextDay.getFullYear();
  const getMonth = nextDay.getMonth();
  const getDate = nextDay.getDate();
  console.log("TODAY",date)
  console.log(`${getFullYear}-${formatMonth(getMonth)}-${formatDay(getDate)}`)
  return `${getFullYear}-${formatMonth(getMonth)}-${formatDay(getDate)}`;
};

export const previousDay = (date: string) => {
  const nextDay = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000);
  const getFullYear = nextDay.getFullYear();
  const getMonth = nextDay.getMonth();
  const getDate = nextDay.getDate();
  console.log(`${getFullYear}-${formatMonth(getMonth)}-${formatDay(getDate)}`)
  return `${getFullYear}-${formatMonth(getMonth)}-${formatDay(getDate)}`;
};
