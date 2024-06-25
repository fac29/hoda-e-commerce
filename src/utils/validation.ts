import { getUserByEmail, getUserByUsername } from '../../model/user';

async function usernameExists(username: string) {
    const user = await getUserByUsername(username);
    return user ? true : false;
}

async function emailExists(email: string) {
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
    email: string,
    password: string,
    username?: string
) {
    const validationErrors: {
        username?: string;
        email?: string;
        password?: string;
    } = {};

    // check email is valid
    if (!validateEmail(email)) {
        validationErrors.email = 'Please enter a valid email address';
    }
    // check password is valid (at least 8 characters)
    if (!validatePassword(password)) {
        validationErrors.password =
            'Passwords must be at least 8 characters long';
    }
    // don't allow empty strings - think this is covered in controller
    // if (email === '' || password === '' || username === '') {
    //     return false;
    // }
    // check username doesn't already exist on database
    if (username) {
        const userExists = await usernameExists(username);
        userExists
            ? (validationErrors.username = 'Username already exists')
            : '';
    }
    // check email address doesn't already exist on database
    if (email) {
        const emailAddressExists = await emailExists(email);
        emailAddressExists
            ? (validationErrors.email = 'Email address already exists')
            : '';
    }

    return Object.keys(validationErrors).length === 0;
}

export { validateInput };
