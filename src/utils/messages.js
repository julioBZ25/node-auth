export const errorValidation = (err) => {
  if (err.length === 1) return err[0].message
  const messagesError = [];
  err.forEach(element => {
    messagesError.push({
      [element.path[0]]: element.message
    })
  });
  return Object.assign({}, ...messagesError)
}