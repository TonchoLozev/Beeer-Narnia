export default (usernameInput, passwordInput) => {
    const usernameRegex = /^[A-za-z]+$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return !usernameRegex.test(usernameInput) || usernameInput.length === 0 || !passwordRegex.test(passwordInput) || passwordInput.length === 0;
};