
const {
    connection
} = require('../../../config/config_mysql');

const helper = require('../../until/helper');

const until = require('../../until/until');




function getId(id) {
    return id.slice(2);
}

// trả về thông tin 1 sản phẩm khi có id và name
async function apiProduct(req, res) {

    try {
        const productId = getId(req.query.id);
        const name = req.params.name;

        if (until.isNumber(productId)) {
            const query = `SELECT products.Id, Name, Date, Origin, Description
            FROM websales.productInfos 
            LEFT JOIN websales.products ON websales.products.Id = websales.productInfos.Id
            WHERE websales.products.Id = '${productId}' and Name = '${name}' and DeletedAt IS NULL`;

            const productInfos = await helper.query(query);

            if (productInfos[0]) {
                // Tạo header Set-Cookie
                res.setHeader('Set-Cookie', `sp=${productId}; Path=/;`);
                // Phản hồi từ server
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(
                    productInfos[0]
                ));
                return;
            }
        }

        // productInfos[0]) == undefine
        res.json({
                id: req.query.id,
                name: req.params.name,
                exist: false,
        });

    } catch (err) {
        console.log(err);
        res.json({
            error: 1,
            message: err.message
        })
    }

}

module.exports = {
    apiProduct,
};