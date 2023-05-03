export const convertDateToCorrectFormat = (inputDate: string | Date): string => {
  let date: Date;
  if (typeof inputDate === 'string') {
    date = new Date(inputDate);
  } else {
    date = inputDate;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;

  return formattedDate;
};
