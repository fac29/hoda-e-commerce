import { Request, Response } from 'express';
import {
    getProductByID,
    getProductBySearchTerm,
    listProductsAll,
} from '../../model/product';
import { createUser } from '../../model/user';
import { createSession } from '../../model/session';

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

export function checkout(req: Request, res: Response) {
    try {
        //do something
    } catch {
        //do something else
    }
}

export function login(req: Request, res: Response) {
    try {
        //do something
    } catch {
        //do something else
    }
}

export function signup(req: Request, res: Response) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        res.status(400).send('Bad input');
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
                res.status(200).send('Cookie Created!');
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}
