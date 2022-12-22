const removeExtension = file => {
    return file.split(".").shift()
}
module.exports = {removeExtension}