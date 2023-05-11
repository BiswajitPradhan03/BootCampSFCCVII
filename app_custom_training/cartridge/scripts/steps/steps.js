'use strict';

var Site = require('dw/system/Site');
var ProductMgr = require('dw/catalog/ProductMgr');

function execute(args) {
  var siteID = args.SiteID || Site.getCurrent().getID();
  var products = ProductMgr.queryAllSiteProducts();
  var product;
  var productList = [];
  
  while(products.hasNext()){
     product = products.next();

        productList.push({
           pid : product.ID,
           //name:product.name
        });
  }
}

module.exports = {
  execute: execute
};

function createInventoryFile(productList){
   
    //Creating file
    var newFile = new IO.File(IO.File.getRootDirectory(IO.File.IMPEX), 'Book.xml');
    var fileWriter = new IO.FileWriter(newFile, false);
    var xmlWriter = new IO.XMLIndentingStreamWriter(fileWriter);
    xmlWriter.writeStartDocument('UTF-8', '1.0');
 
    //inventory element
    xmlWriter.writeStartElement('Products');
    xmlWriter.writeAttribute('xmlns', 'http://www.demandware.com/xml/impex/inventory/2007-05-31');
    xmlWriter.writeCharacters(xmlWriter.newLine);
    xmlWriter.writeCharacters(xmlWriter.indent);
 
    // inventory-list element
    xmlWriter.writeStartElement('inventory-list'); 
    xmlWriter.writeCharacters(xmlWriter.newLine);
    xmlWriter.writeCharacters(xmlWriter.indent);
 
    // header element
    xmlWriter.writeStartElement('header'); 
    xmlWriter.writeAttribute('list-id', invtData.ID);
    xmlWriter.writeCharacters(xmlWriter.newLine);
    xmlWriter.writeCharacters(xmlWriter.indent);
 
    // description element
    xmlWriter.writeStartElement('description');
    xmlWriter.writeCharacters(invtData.description);
    xmlWriter.writeEndElement();   
    xmlWriter.writeCharacters(xmlWriter.newLine);
 
 
    //End for header
    xmlWriter.writeEndElement(); 
 
    // records element
    xmlWriter.writeStartElement('records'); 
    xmlWriter.writeCharacters(xmlWriter.newLine);
    xmlWriter.writeCharacters(xmlWriter.indent);
 
    for(var i=0; i < productList.length; i++){
 
       //record element
       xmlWriter.writeStartElement('record'); 
       xmlWriter.writeAttribute('product-id', productList[i].pid)
       xmlWriter.writeCharacters(xmlWriter.newLine);
       xmlWriter.writeCharacters(xmlWriter.indent);
 
       //End for record element
       xmlWriter.writeEndElement();    
 
    } 
 
    //End for records element
    xmlWriter.writeEndElement(); 
    
    //End for inventory-list element
    xmlWriter.writeEndElement(); 
    
    //End for inventory element
    xmlWriter.writeEndElement(); 
 
    xmlWriter.close();
    fileWriter.close();
    
 }