// const { body, validationResult } = require("express-validator");
 
// //Validate user info
// const validateUserInput = {
//     body("username")
//         .trim()
//         .notEmpty()
//         .withMessage("Username is required")
//         .isLength({ min: 3 })
//         .withMessage("Username must be at least 3 characters long"),
//      // Validate user email
//     body("email")
//         .trim()
//         .notEmpty()
//         .withMessage("Email is required")
//         .isEmail()
//         .withMessage("Invalid email address"),
//     //Validate password
//     body("password")
//         .notEmpty()
//         .withMessage("Password is required")
//         .isLength({ min: 6 })
//         .withMessage("Password must be at least 6 characters long")
//         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)
//         .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
// };

// // Middleware function to handle validation errors
// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// module.exports = {
//     validateUserInput,
//     // handleValidationErrors
// };
    
