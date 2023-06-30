export const errorValidation = (err) => {
  const messagesError = [];
  err.forEach((element) => {
    messagesError.push({
      [element.path[0]]: element.message,
    });
  });
  return Object.assign({}, ...messagesError);
};
