'use strict';
var productHelper = module.superModule;

productHelper.showProductPage = function (querystring, reqPageMetaData) {
var URLUtils = require("dw/web/URLUtils");
var ProductFactory = require("*/cartridge/scripts/factories/product");
var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");

var params = querystring;
var product = ProductFactory.get(params);
var addToCartUrl = URLUtils.url("Cart-AddProduct");
var canonicalUrl = URLUtils.url("Product-Show", "pid", product.id); // var breadcrumbs = getAllBreadcrumbs(null,product.id, []).reverse();
var template = "product/productDetails";

if (product.productType === "bundle" && !product.template) {
template = "product/bundleDetails";
} else if (product.productType === "set" && !product.template) {
template = "product/setDetails";
} else if (product.template) {
template = product.template;
}

pageMetaHelper.setPageMetaData(reqPageMetaData, product);
pageMetaHelper.setPageMetaTags(reqPageMetaData, product);
var schemaData =
require("*/cartridge/scripts/helpers/structuredDataHelper").getProductSchema(
product
);
var CustomerMgr = require("dw/customer/CustomerMgr"); // var customerNo= req.params.customerNo;
var profile = CustomerMgr.getProfile("00010001");
var txn = require("dw/system/Transaction");
var recentitems = profile.custom.listOfProductsViewed ? profile.custom.listOfProductsViewed.toString() : '';
var productView = recentitems + ' , ' + product.id;
txn.wrap(function () {
    
    profile.custom.listOfProductsViewed = productView;

});
// var prof=profile.custom.listOfProductsViewed;
return {
template: template,
product: product,
addToCartUrl: addToCartUrl, // resources: getResources(), // breadcrumbs: breadcrumbs,
canonicalUrl: canonicalUrl,
schemaData: schemaData,
// product_id: product.id,
// profData: prof
};
};
module.exports = productHelper;