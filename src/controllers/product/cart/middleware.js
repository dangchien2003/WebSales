const helper = require('../../../until/helper');

const until = require('../../../until/until');

function getIdProduct(id) {
    return id.slice(2);
}

async function apiCart(req, res) {

    try {
        //const idCustomer = req.cookies.user;
        const idCustomer = req.body.user;
        var idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const idAttribute = req.body.idAttribute;
        const idCategory = req.body.idCategory;

        idProduct = getIdProduct(idProduct);
        
        if(!until.isNumber(idProduct)) {
            res.json({
                message: 'no existing product' 
            })
            return;
        }

        const query = `INSERT INTO carts (carts.IdCustomer, carts.IdProduct, carts.Quantity, carts.Attribute, carts.Category)
        SELECT '${idCustomer}' , '${idProduct}', '${quantity}', ${idAttribute}, ${idCategory}
        FROM dual
        WHERE
        EXISTS (
            SELECT websales.products.Id 
            FROM websales.products 
            WHERE websales.products.Id = '${idProduct}'
        )
        AND 
        EXISTS (
            SELECT websales.customers.Id 
            FROM websales.customers 
            WHERE websales.customers.Id = '${idCustomer}'
        )`;

        const addCart = await helper.query(query);

        if(addCart.affectedRows != 0) {
            res.json({
                insert: 1,
            })
        }
        else {
            res.json({
                insert: 0,
            })
        }
    }catch(error) {
        console.log(error);
        res.json({
            message: error.message,
        })
    }
    
}




module.exports = {
    apiCart
}