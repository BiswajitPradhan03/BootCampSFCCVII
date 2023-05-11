'use strict';

var server = require('server');

function getList(customerNo) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var AddressModel = require('*/cartridge/models/address');
    var collections = require('*/cartridge/scripts/util/collections');

    var customer = CustomerMgr.getCustomerByCustomerNumber(customerNo);
    var rawAddressBook = customer.addressBook.getAddresses();
    var addressBook = collections.map(rawAddressBook, function (rawAddress) {
        var addressModel = new AddressModel(rawAddress);
        addressModel.address.UUID = rawAddress.UUID;
        return addressModel;
    });
    return addressBook;
}
server.get('Address', function (req, res, next) {
    var add= getList(req.querystring.customerNo);
    res.render('addbook', {

        addressBook: add
       
    });
    next();
});
module.exports=server.exports();