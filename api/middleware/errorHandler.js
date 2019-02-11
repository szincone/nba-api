function errorHandler(err, req, res, next) {
  switch (err.code) {
    case 400:
      res.status(400).json({
        message: 'Request cannot be understood or processed.',
      });
      break;
    case 404:
      res.status(404).json({
        message: 'The player cannot be found.',
      });
      break;
    case 406:
      res.status(406).json({
        message: 'Missing one or more required fields.',
      });
      break;
    default:
      res.status(500).json({
        message: 'There was an error while performing this operation.',
      });
  }
}

module.exports = {
  errorHandler,
};
