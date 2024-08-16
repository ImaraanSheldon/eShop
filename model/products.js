import { connection as db } from '../config/index.js';

class Products {
    // Fetch all products
    fetchProducts(req, res) {
        const strQry = `
        SELECT productID, productName, productDescription, price, stock 
        FROM products;
        `;
        db.query(strQry, (err, results) => {
            try {
                if (err) throw new Error('Unable to fetch products');
                res.json({
                    status: res.statusCode,
                    results      
                });
            } catch (e) {
                res.json({
                    status: 404,
                    msg: e.message
                });
            }
        });
    }
    recentProducts(req,res){
        try{
            const strQry = `
        SELECT productID, productName, productDescription, price, stock 
        FROM products ORDER BY productID DESC LIMIT 5;
        `
        db.query(strQry,(err, results)=>{
            if(err)throw new Error(err)
            res.json({
                status: res.statusCode,
                results      
            });
        })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
    // Fetch a single product by ID
    fetchProduct(req, res) {
        try {
            const strQry = `
            SELECT productID, productName, productDescription, price, stock 
            FROM products 
            WHERE productID = ${req.params.id};
            `;
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Error fetching product');
                res.json({
                    status: res.statusCode,
                    result: result[0]
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
    // Add a new product
    addProduct(req, res) {
        try {
            let data = req.body;
            const regQry = `
            INSERT INTO products SET ?;
            `;
            db.query(regQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        msg: 'Failed to add product'
                    });
                } else {
                    res.json({
                        msg: 'Product added successfully'
                    });
                }
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
    // Update a product by ID
    updateProduct(req, res) {
        try {
            let data = req.body;
            const strQry = `UPDATE products SET ? WHERE productID = ${req.params.id}`;
            db.query(strQry, [data], (err) => {
                if (err) throw new Error('Failed to update product');
                res.json({
                    status: res.statusCode,
                    msg: 'Product updated successfully'
                });
            });
        } catch (e) {
            res.json({
                status: 400,
                msg: e.message
            });
        }
    }
    // Delete a product by ID
    deleteProduct(req, res) {
        try {
            const strQry = `
            DELETE FROM products WHERE productID = ${req.params.id};
            `;
            db.query(strQry, (err) => {
                if (err) throw new Error('Failed to delete product');
                res.json({
                    status: res.statusCode,
                    msg: 'Product deleted successfully'
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
}

export { Products };
