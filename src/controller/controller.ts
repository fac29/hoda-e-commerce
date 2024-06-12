import { Request, Response } from 'express';
import { getProductByName, listProductsAll } from '../../model/product';
import { getProductByID } from '../../model/product';
export function getProducts(req: Request, res: Response) {
    try {
        res.status(200).send(listProductsAll());
    } catch (error: any) {
        res.status(500).send(error.toString());
    }
}

export function getID(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const product = getProductByID(parseInt(id));
        res.status(200).send(product);
    } catch (error: any) {
        res.status(500).send(error.toString());
    }
}

//I need to
export function getName(req: Request, res: Response) {
    try {
        const name = req.params.name;
        const product = getProductByName(name);
        const encodedProduct = encodeURIComponent(name);
        res.status(200).send(product);
    } catch (error: any) {
        res.status(500).send(error.toString());
    }
}
