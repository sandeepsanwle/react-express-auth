
const uploadFile = async (req, res) => {

    if (!req.file) {
        res.locals.message = "No file found please attach file";
        return res.status(400).json();
    }
    res.locals.message = "Single file uploaded successfully";
    res.status(200).json();

}

module.exports = { uploadFile };