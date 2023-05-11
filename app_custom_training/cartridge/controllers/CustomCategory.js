'use strict';
var server = require('server');
server.get(
    'View', function (req, res, next) {
        var Categories = require('*/cartridge/models/categories');
        var catalogMgr = require('dw/catalog/CatalogMgr');
       
        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();

        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
            siteRootCategory.getOnlineSubCategories() : null;

        res.render('categorycustom', new Categories(topLevelCategories));
        next();
    }
);
module.exports=server.exports();