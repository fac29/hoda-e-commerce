import { Request, Response } from 'express';
import {
    getProductByID,
    getProductBySearchTerm,
    listProductsAll,
    addNewOrder,
} from '../../model/product';

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
    try {
        //do something
    } catch {
        //do something else
    }
}
