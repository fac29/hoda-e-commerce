import { db } from './product';

type User = {
    username: string;
    email: string;
    hashed_password: string;
};

type UserWithoutPass = Partial<User> & { user_id: number };

const insert_user = db.prepare(`
INSERT INTO users
(username, email, hashed_password)
VALUES ($username, $email, $hashed_password)
RETURNING user_id
`);

export function createUser(
    username: User['username'],
    email: User['email'],
    hashed_password: User['hashed_password']
) {
    return insert_user.get({ username, email, hashed_password });
}

const select_user_by_email = db.prepare(`
    SELECT user_id, email, hashed_password, username FROM users WHERE email = ? 
  `);

export function getUserByEmail(email: User['email']) {
    return select_user_by_email.get(email);
}

const select_user_by_id = db.prepare(/* sql */ `
    SELECT user_id, username FROM users WHERE user_id = ?
    `);

export function getUserByID(id: UserWithoutPass['user_id']) {
    return select_user_by_id.get(id);
}
