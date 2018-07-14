export default (firstName, lastName, reason) => {
    const namesRegex = /^[A-Za-z]{2,}$/;
    const isFirstNameValid = namesRegex.test(firstName);
    const isLastNameValid = namesRegex.test(lastName);

    const reasonRegex = /^.{20,}$/gm;
    const isReasonValid = reasonRegex.test(reason);

    if (!isFirstNameValid) {
        return 'First name must be at least 2 characters';
    } else if (!isLastNameValid) {
        return 'Last name must be at least 2 characters';
    } else if (!isReasonValid) {
        return 'Reason for access must be at least 20 characters';
    }else{
        return 'success';
    }
};