
async function errorHandler(err, req, res, next) {
  console.log("\n\n");
  console.log(err);

  res.status(500).json({ msg: err.message });
}

module.exports = errorHandler;
