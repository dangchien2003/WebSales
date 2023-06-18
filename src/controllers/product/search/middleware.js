const { query } = require('express');
const {
    connection
} = require('../../../../config/config_mysql');

const until = require('../../../until/until');


async function apiProducts(req, res) {
    try {
        const key = req.params.key;
        const page = until.isNumber(req.query.page)?req.query.page : 1;
        const productInPage = 2;

        const query = `SELECT websales.products.Id, Shop, Name, Price, Category, Purchases, Evaluate, Image 
        FROM websales.products 
        LEFT JOIN websales.productinfos ON websales.products.Id = websales.productinfos.Id 
        WHERE websales.productInfos.name LIKE '%${key}%' and websales.products.DeletedAt IS NULL 
        ORDER BY websales.products.Id
        LIMIT ${(page-1)* productInPage}, ${productInPage} `;

        const products = await new Promise((resolve) => {
            connection.query(query, (e, results) => {
                resolve(results);
            })
        })

        if(products.Length > 0) {
            res.json(products);
        }else {
            res.json({
                products: 0,
            });
        }
        
    }catch(err) {
        console.log(err);
        res.json({
            error: 1,
            message: err.message
        })
    }
    
    
}

module.exports = {
    apiProducts
}