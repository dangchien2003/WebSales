const {
    connection
} = require('../../../config/config_mysql')

// request dont exist numper page
function urlHaventPage(req, res) {
    console.log(req.url);
    res.redirect('/trangchu/page/1')
}

// res product list
async function apiProducts(req, res) {
    const api = {}; 
    try {
        page = req.params.page;
        const productInPage = 2;

        const query = `SELECT websales.products.Id, Shop, Name, Price, Category, Purchases, Evaluate, Image FROM websales.products 
        LEFT JOIN websales.productinfos ON websales.products.Id = websales.productinfos.Id 
        WHERE websales.products.DeletedAt IS NULL 
        ORDER BY websales.products.Id 
        LIMIT ${(page-1)* productInPage}, ${productInPage}`;
        
        const products = await new Promise((resolve) => {
            connection.query(query, (e, results) => {
                resolve(results);
            })
        });

        res.json({
            page,
            products
        })

    }catch(e){
        console.log(e.message);
        api.server = {
            message: e.message,
        };
        res.json(api);
    }
}

module.exports = {
    apiProducts,
    urlHaventPage
}