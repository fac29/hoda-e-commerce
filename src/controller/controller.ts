import { Request, Response } from 'express';
import {
    getProductByID,
    getProductBySearchTerm,
    listProductsAll,
    addNewOrder,
} from '../../model/product';

import { createUser, getUserByEmail } from '../../model/user';
import { createSession, removeSession } from '../../model/session';

const bcyrpt = require('bcrypt');

export function getAllProducts(req: Request, res: Response) {
    try {
        const searchQuery = req.query.search;
        if (searchQuery) {
            const stringQ = searchQuery.toString();
            const result = getProductBySearchTerm(stringQ);
            return res.status(200).json(result);
        }
        const result = listProductsAll();
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.toString() });
    }
}

export function getProductID(req: Request, res: Response) {
    try {
        const product = req.params.id;
        const productId = parseInt(product);
        const result = getProductByID(productId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
}

export async function checkout(req: Request, res: Response) {
    try {
        const object = req.body;
        await addNewOrder(object);
        res.status(200).send('Order complete'); // send a success response
    } catch (error) {
        console.error(error); // log the error
        res.status(500).send('An error occurred while processing your order'); // send an error response
    }
}

export function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = getUserByEmail(email);
    if (!email || !password) {
        return res.status(400).json({ response: 'Login failed!' });
    }
    try {
        bcyrpt
            .compare(password, user.hashed_password)
            .then((match: boolean) => {
                if (!match) {
                    return res.status(400).send('Login failed!');
                } else {
                    const session_id = createSession(user.user_id);
                    res.cookie('sid', session_id, {
                        signed: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                        sameSite: 'lax',
                        httpOnly: true,
                    });
                }
                res.status(200).json({ response: 'Logged in!' });
            });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export function signup(req: Request, res: Response) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        res.status(400).json({ response: 'Bad input' });
    } else {
        try {
            bcyrpt.hash(password, 12).then((hash: string) => {
                const user = createUser(username, email, hash);
                const sessionId = createSession(user.user_id);
                res.cookie('sid', sessionId, {
                    signed: true,
                    httpOnly: true,
                    maxAge: 5 * 60 * 1000,
                    sameSite: 'lax',
                });
                res.status(200).json({ response: 'Cookie Created!' });
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export function logout(req: Request, res: Response) {
    const sid = req.signedCookies.sid;
    if (!sid) {
        res.status(400).json({ response: 'No cookie!' });
    }
    try {
        removeSession(sid);
        res.clearCookie(sid);
        res.status(200).json({ response: 'Logged out successfully!' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
