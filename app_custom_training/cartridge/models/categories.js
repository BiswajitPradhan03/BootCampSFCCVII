'use strict';
var collections = require('*/cartridge/scripts/util/collections');
var URLUtils = require('dw/web/URLUtils');
var base = module.superModule;
function categories(items){
      base.call(this, items);
     
     collections.forEach(items, function (item) {
        if (item.custom && item.custom.showInMenu &&
                (item.hasOnlineProducts() || item.hasOnlineSubCategories())) {
            this.categories.push(categoryToObject(item));
        }
    }, this);
}


function getCategoryUrl(category) {
    return category.custom && 'alternativeUrl' in category.custom && category.custom.alternativeUrl
        ? (category.custom.alternativeUrl.toString()).replace(/&amp;/g, '&')
        : URLUtils.url('Search-Show', 'cgid', category.getID()).toString();
}

function categoryToObject(category) {
    if (!category.custom || !category.custom.showInMenu) {
        return null;
    }
    var result = {
        name: category.getDisplayName(),
        url: getCategoryUrl(category),
        id: category.ID,
        number:category.products.length
    };
    var subCategories = category.hasOnlineSubCategories() ?
        category.getOnlineSubCategories() : null;

    if (subCategories) {
        collections.forEach(subCategories, function (subcategory) {
            var converted = null;
            if (subcategory.hasOnlineProducts() || subcategory.hasOnlineSubCategories()) {
                converted = categoryToObject(subcategory);
            }
            if (converted) {
                if (!result.subCategories) {
                    result.subCategories = [];
                }
                result.subCategories.push(converted);
            }
        });
        if (result.subCategories) {
            result.complexSubCategories = result.subCategories.some(function (item) {
                return !!item.subCategories;
            });
        }
    }
    result.attr1=category.custom.customCategoryDisplay;
    return result;
}
module.exports = categories;