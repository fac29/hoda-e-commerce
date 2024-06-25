import { getUserByEmail, getUserByUsername } from '../../model/user';

function isInputUnique(username?: string, email?: string) {}

function validateInput(email: string, password: string, username?: string) {
    // check username doesn't already exist on database
    // check email address doesn't already exist on database
    // check email is valid
    // check password is valid (at least 8 characters)
    // don't allow empty strings
}

export { validateInput };
