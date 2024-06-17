export async function getProductID(req: Request, res: Response) {
    try {
        const product = req.params.id;
        const productId = parseInt(product);
        const result = getProductByID(productId);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.toString());
    }
}
