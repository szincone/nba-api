function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.code) {
    case 404:
      res.status(404).json({
        message: "The requested post does not exist.",
      });
      break;
    case 400:
      res.status(400).json({
        message: "There was an error regarding your input.",
      });
    case 406:
      res.status(406).json({
        message: "Missing title or content.",
      });
    default:
      res.status(500).json({
        message: "There was an error performing the required operation",
      });
      break;
  }
}

module.exports = {
  errorHandler,
};
