import { Request, Response } from 'express';
import {listProductsAll} from '../../model/product'
// export async function getProductByID(req: Request, res: Response) {
//     try {
//         //TODO....create a function which will fetch product data from sql
//         const product = fetchProduct(req.params.id);
//         //send parsed data as a response
//         res.json(product);
//     } catch (error: any) {
//         res.status(500).send(error.toString());
//     }
// }

export function getProducts(req: Request, res: Response) {
    try {
        const products = listProductsAll;
        console.log(typeof products)
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
