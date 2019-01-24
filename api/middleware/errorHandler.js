function errorHandler(err, req, res) {
  switch (err.code) {
    case 404:
      res.status(404).json({
        message: 'The requested post does not exist.',
      });
      break;
    case 400:
      res.status(400).json({
        message: 'There was an error regarding your input.',
      });
      break;
    case 406:
      res.status(406).json({
        message: 'Missing title or content.',
      });
      break;
    default:
      res.status(500).json({
        message: 'There was an error performing the required operation',
      });
      break;
  }
}

module.exports = {
  errorHandler,
};
