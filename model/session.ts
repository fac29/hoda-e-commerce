import { db } from './product';
const crypto = require('node:crypto');

const insert_session = db.prepare(/*sql*/ `
    INSERT INTO sessions (session_id, user_id, expires_at)
    VALUES (
      $session_id,
      $user_id,
      DATE('now', '+7 day'))
    `);

export function createSession(user_id: number) {
    const session_id = crypto.randomBytes(18).toString('base64');
    insert_session.run({ session_id, user_id });
    return session_id;
}

const select_session = db.prepare(`
    SELECT session_id, user_id, expires_at
    FROM sessions WHERE session_id = ?
  `);

export function getSession(sid: string) {
    const session = select_session.get(sid); // Retrieve session from the database
    if (session) {
        return session; // Ensure a plain object is returned
    }
    return null;
}
