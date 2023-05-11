'use strict';
var server = require('server');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');


server.post('Show', 
  function(req, res, next) {

  var SFRAhelloform = server.forms.getForm('newsletterdef'); 
  var gender = request.httpParameterMap.gender.stringValue;
  var languages = request.httpParameterMap.programmingLanguages.values;
  var department = request.httpParameterMap.department.value;
  var customObj = CustomObjectMgr.getCustomObject('Group_A_custom', SFRAhelloform.mail.value);
  if (customObj) {
    
    res.render('newslettererror', {});
  } else {
 

    Transaction.wrap(function () {
  
var customerObj = CustomObjectMgr.createCustomObject('Group_A_custom', 'SFRAhelloform.mail.value');
customerObj.custom.name = SFRAhelloform.name.value;
 customerObj.custom.age = SFRAhelloform.age.value;
 customerObj.custom.mail = SFRAhelloform.mail.value;
 customerObj.custom.gender = gender;
 
 customerObj.custom.programmingLanguages = languages;
 customerObj.custom.department = department;
    });
 var customObjview = CustomObjectMgr.getCustomObject('Group_A_custom', SFRAhelloform.mail.value);
    var viewData = {
      customObjview: customObjview
    };
    res.render('newsletterresult', viewData);
  }
   next();
  });
  
module.exports = server.exports();



