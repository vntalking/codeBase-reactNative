const r_hasSpecialCharactersWithoutSpace = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|[0-9]+/;
const r_isPhoneNumber = /[0-9]{10,13}/;
const r_isEmail = /\w+[@]\w+[.]\w+/;

function ValidatePassword(input) {
    let error = true;
    if (input && input.trim().length === 0) {
        error = "Cannot be whitespace alone.";
    } else if (!input) {
        error = "Cannot be empty.";
    } else if (input.length < 8) {
        error = "Minimum length should be 8";
    } else if (!input.match(".[0-9].")) {
        error = "Atleast one number required.";
    } else if (!input.match(".[a-zA-Z].")) {
        error = "Atleast one letter required";
    } else if (!input.match(".[@!#%&()^~{}].")) {
        error = "Atleast one special character is required";
    }
    return error;
}

const hasOnlyTextWithoutSpace = text =>
    !r_hasSpecialCharactersWithoutSpace.test(text);
const isPhoneNumber = text => r_isPhoneNumber.test(text);
const isEmail = text => r_isEmail.test(text);
const isPassword = text => ValidatePassword(text)





export default { hasOnlyTextWithoutSpace, isPhoneNumber, isEmail, isPassword };
