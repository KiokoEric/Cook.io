const Joi = require("@hapi/joi");

const RecipeSchema = (data) => { 
    const Recipe = {
        Name: yup.string().required("Name is required"),
        Description: yup.string().required("Email address is required"),
        Ingredients: yup.string().required("Ingredients is required"),
        Instructions: yup.string().required("Instructions is required"),
        Image: yup.string().required("Image is required"),
    }
    return Joi.validate(data, Recipe)
};


const UserSchema = (data) => { 
    const User = {
        Name: yup.string().required("Name is required"),
        EmailAddress: yup.string().email("Email format is not valid").required("Valid email address is required"),
        Password: yup.string().required("Password is required")
    }
    return Joi.validate(data, User) 
};


module.exports.RecipeSchema = RecipeSchema;
module.exports.UserSchema = UserSchema;