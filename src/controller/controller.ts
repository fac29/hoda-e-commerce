import { Request, Response } from 'express';
import { fetchAllData, fetchProduct } from './fetchFunctions';

export async function getProductByID(req: Request, res: Response) {
    try {
        //TODO....create a function which will fetch product data from sql
        const product = await fetchProduct(req.params.id);
        //send parsed data as a response
        res.json(product);
    } catch (error: any) {
        res.status(500).send(error.toString());
    }
}

export async function getProducts(req: Request, res: Response) {
    try {
        //TODO
        const products = await fetchAllData();
        res.json();
    } catch (error: any) {
        res.status(500).send(error.toString);
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