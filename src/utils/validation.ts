import { getUserByEmail, getUserByUsername } from '../../model/user';

async function usernameExists(username: string) {
    if ((username = '')) {
        return false;
    }
    const user = await getUserByUsername(username);
    return user ? true : false;
}

async function emailExists(email: string) {
    if ((email = '')) {
        return false;
    }
    const userEmail = await getUserByEmail(email);
    return userEmail ? true : false;
}

function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password: string) {
    return password.length >= 8;
}

async function validateInput(
    type: 'signup' | 'login',
    email: string,
    password: string,
    username?: string
): Promise<{
    isValid: boolean;
    errors: {
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
    };
}> {
    const validationErrors: {
        username?: string;
        email?: string;
        password?: string;
    } = {};

    // Validation for signup
    if (type === 'signup') {
        if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }
        if (!validatePassword(password)) {
            validationErrors.password =
                'Passwords must be at least 8 characters long';
        }
        if (!username) {
            validationErrors.username = 'Username is required';
        } else if (await usernameExists(username)) {
            validationErrors.username = 'Username already exists';
        }
        if (await emailExists(email)) {
            validationErrors.email = 'Email address already exists';
        }
    }

    // Validation for login
    if (type === 'login') {
        if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }
        if (!(await emailExists(email))) {
            validationErrors.email = 'Email address does not exist';
        }
    }

    // Determine if the input is valid based on whether there are any errors
    const isValid = Object.keys(validationErrors).length === 0;

    // Return the validation result
    return { isValid, errors: validationErrors };
}

export default validateInput;
