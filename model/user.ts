import { db } from './product';

type User = {
    username: string;
    email: string;
    hashed_password: string;
};

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
    return insert_user.run({ username, email, hashed_password });
}
