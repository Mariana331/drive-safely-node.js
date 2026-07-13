export const sendResponse = (res, { status = 200, message = 'Success', data = null }) => {
  const response = { status, message };
  if (data !== null) {
    response.data = data;
  }
  return res.status(status).json(response);
};
