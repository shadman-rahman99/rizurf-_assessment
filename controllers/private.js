// eslint-disable-next-line no-unused-vars
exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'You got access to the private data in the route',
  });
};