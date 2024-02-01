const convertDate = (date) => {
  const dateObj = new Date(date);
  const formatDate = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
  return formatDate;
};

export default convertDate;
