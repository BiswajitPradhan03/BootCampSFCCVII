'use strict';
var base = module.superModule;

function account(currentCustomer, addressModel, orderModel) {
    base.call(this, currentCustomer, addressModel, orderModel);

    this.profile = getProfile(currentCustomer);

}
function getProfile(currentCustomer) {
    var result;
    //var CustomerMgr = require('dw/customer/CustomerMgr');
    if (currentCustomer) {
        result = {
            firstName: currentCustomer.profile.firstName,
            lastName: currentCustomer.profile.lastName,
            email: currentCustomer.profile.email,
            phone: Object.prototype.hasOwnProperty.call(currentCustomer.profile, 'phone') ? currentCustomer.profile.phone : currentCustomer.profile.phoneHome,
            password: '********',
            //   cust1:profile.addprofile_1,
            //   cust2:profile.addprofile_2,
            //   cust3:profile.addprofile_3
        };
    } else {
        result = null;
    }
    result.addprofile_1= currentCustomer.raw.profile.custom.addprofile_1;
    result.addprofile_2= currentCustomer.raw.profile.custom.addprofile_2;
    result.addprofile_3= currentCustomer.raw.profile.custom.addprofile_3;
    result.list= currentCustomer.raw.profile.custom.listOfProductsViewed;
    
    return result;
}

module.exports = account;

