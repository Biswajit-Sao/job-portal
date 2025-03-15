import multer from "multer";

const storage=multer.memoryStorage()

export const singleUpload=multer({storage}).single("profilePhoto")

export const singleUploadd=multer({storage}).single("file")
