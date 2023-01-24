const handleErrorResponse = (res, error, code=401) => {
    if(typeof error === 'string'){return res.status(code).json({error: error})}

    return res.status(code).json({error: error.message})
}

module.exports = { handleErrorResponse }