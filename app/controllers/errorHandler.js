const pageNotFound = (req, res) => {
    res.status(404).json({error: "Page not found", solution: "Look at the entry point of the API for the available endpoints and methods."})
}

const noMethod = (req,res) => {
    res.status(501).json({error: "Method not allowed at this endpoint", solution: "Look at the entry point of the API for the available endpoints and methods."})
}

const noID = (req,res) => {
    res.status(400).json({error: "You must provide a valid ID", solution: "ID must be an integer."})
}

module.exports = { pageNotFound, noMethod, noID }