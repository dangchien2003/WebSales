const helper = require('../../until/helper');
const until = require('../../until/until')


// res product list
async function apiProducts(req, res) {
    const api = {};
    try {
        var page = req.query.page;
        if (!page || !until.isNumber(page)) {
            page = 1;
        }
        const productInPage = 2;

        const query = `SELECT websales.products.Id, Shop, Name, Price, Category, Purchases, Evaluate, Image FROM websales.products 
        LEFT JOIN websales.productinfos ON websales.products.Id = websales.productinfos.Id 
        WHERE websales.products.DeletedAt IS NULL 
        ORDER BY websales.products.Id 
        LIMIT ${(page-1)* productInPage}, ${productInPage}`;

        const products = await helper.query(query);


        // Tạo header Set-Cookie
        res.setHeader('Set-Cookie', `test1= 1; Path=/trangchu/page; Max-Age = 30`);
        // Phản hồi từ server
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        // api json
        res.end(JSON.stringify({
            page,
            products
        }));


    } catch (e) {
        console.log(e.message);
        api.server = {
            message: e.message,
        };
        res.json(api);
    }
}

module.exports = {
    apiProducts
}