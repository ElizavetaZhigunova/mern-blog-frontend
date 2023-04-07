import express from "express";
import mongoose from "mongoose";
import multer from 'multer';
import cors from 'cors'

import {registerValidation, loginValidation, PostCreateValidation} from './validation.js'
import {UserController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from "./utils/index.js";

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (__, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static('uploads'))


mongoose.connect(
    'mongodb+srv://adminLiza:lizaanna12@cluster0.vqkrbqw.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log("db OK"))
 .catch(() => console.log("db errror", err)
)

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.post('/posts', checkAuth, PostCreateValidation, handleValidationErrors, PostController.create)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostCreateValidation, handleValidationErrors, PostController.update)

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server OK')
})