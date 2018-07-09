export default (usernameInput, passwordInput, repeatPasswordInput, emailInput) => {
    const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
    const isEmailValid = emailRegex.test(emailInput);

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const isPasswordValid = passwordRegex.test(passwordInput);

    if (usernameInput.length === 0) {
        return 'Username field is empty';
    } else if (emailInput.length === 0) {
        return 'Email field is empty';
    } else if (!isEmailValid) {
        return 'Invalid email';
    } else if (passwordInput.length === 0) {
        return 'Password field is empty';
    } else if (!isPasswordValid) {
        return 'Invalid password';
    } else if (repeatPasswordInput.length === 0) {
        return 'Repeat password field is empty';
    } else if (passwordInput !== repeatPasswordInput) {
        return 'Password and repeat password are different';
    } else {
        return 'success';
    }
};