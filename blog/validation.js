import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5 символов').isLength({min: 5}),
    body('fullName', 'Имя должно состоять минимум из 3 символов').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),

]

export const PostCreateValidation = [
    body('title', 'Введите заголовок статьи, минимум 3 символа').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи, минимум 10 символов').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка').optional().isString(),

]