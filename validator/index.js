const { check } = require('express-validator');

exports.createPostValidator = () => {
     
       return[ check('title').notEmpty().withMessage('Write a title').isLength({
            min:4,
            max:150
        }).withMessage('Title must be between 4 and 150 characters'),
    
        check('body').notEmpty().withMessage('Write a body').isLength({
            min: 4,
            max: 2000
        }).withMessage('Body must be between 4 and 2000 characters')]
       
}

exports.userSignUpValidator = () => {

    return[ check('name').notEmpty().withMessage('Name is required').isLength({
        min:4,
        max:10
    }).withMessage('Name must be between 4 and 10 characters'),

    check('email').notEmpty().withMessage('Email is required').matches(/.+\@..+/)
    .withMessage('Email must contain @').isLength({
        min: 4, max:2000
    }).withMessage('Email must be between 4 and 2000 characters'),

    check('password').notEmpty().withMessage('Password is required').isLength({
        min:6
    }).withMessage('Paswword must contain at least 6 characters').matches(/\d/)
    .withMessage('Password must contain a number')]     

}