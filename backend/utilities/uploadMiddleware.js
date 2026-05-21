import multer from "multer";


// Store file in RAM temporarily
const storage = multer.memoryStorage();


// Allow only image files
const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

        cb(null, true);

    } else {

        cb(new Error("Only image files allowed"), false);
    }
};


// Multer config
const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter,
});

export default upload;