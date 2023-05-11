'use strict';
var base=module.superModule;
function getLoginRedirectURL(redirectUrl) {


    var cusValue = dw.system.Site.getCurrent().getCustomPreferenceValue("loginLand");
 
    if (cusValue){
        var endpoint = 'Home-Show';
    var result;
   
    }
    else{
        var endpoint = 'Account-Show';
    }
    return endpoint;
}
base.getLoginRedirectURL=getLoginRedirectURL;
module.exports=base;