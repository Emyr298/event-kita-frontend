export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  return day + '/' + month + '/' + year;
}

export const formatDateInput = (date: Date) => {
  return date.toISOString().split('T')[0];
}
