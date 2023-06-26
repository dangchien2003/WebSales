const {
    query
} = require('express');
const helper = require('../../../until/helper');

const until = require('../../../until/until');

const jwt = require('jsonwebtoken');

function getIdProduct(id) {
    return id.slice(2);
}

function getParagraphDeleteProducts(listProduct) {
    para = '';
    for (let i = 0; i < listProduct.length; i++) {
        para += ` websales.carts.IdProduct = '${listProduct[i]}' `;
        if (i < listProduct.length - 1) {
            para += "OR";
        }
    }
    return ` AND (${para})`;
}

async function apiAddCart(req, res) {

    try {
        //const idCustomer = req.cookies.user;
        const idCustomer = req.body.user;
        var idProduct = req.body.idProduct;
        const quantity = req.body.quantity;
        const idAttribute = req.body.idAttribute;
        const idCategory = req.body.idCategory;

        idProduct = getIdProduct(idProduct);

        if (!until.isNumber(idProduct)) {
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

        if (addCart.affectedRows != 0) {
            res.json({
                insert: 1,
            })
        } else {
            res.json({
                insert: 0,
                idProduct,
                idAttribute,
                idCategory,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        })
    }
}

async function apiDeleteCart(req, res) {
    try {
        listProduct = req.body.boughtProduct;

        // user = req.cookies.user;
        user = 1;
        // quantity = req.cookies.cart.quantity;
        quantity = 3;
        var endQuery = "";
        if (listProduct.length < quantity) {
            endQuery = getParagraphDeleteProducts(listProduct);
        }
        const query = `DELETE FROM websales.carts 
        WHERE websales.carts.IdCustomer = '1' 
        ${endQuery}`;
        console.log("🚀 ~ file: middleware.js:90 ~ apiDeleteCart ~ query:", query)

        data = await helper.query(query);

        if (data.affectedRows == 0) {
            res.status(400).json("không tìm thấy sản phẩm")
        } else {
            res.status(200).json({
                affected: data.affectedRows,
                listProduct,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        })
    }
}


module.exports = {
    apiDeleteCart,
    apiAddCart
}