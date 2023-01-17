const handleErrorResponse = (res, error, code=401) => {
    console.log("Error", error);
    res.status(code).json({Error: error})
}

module.exports = { handleErrorResponse }