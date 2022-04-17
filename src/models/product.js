const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const productModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(
      `SELECT * from products`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }), 
  getList: (appId,search,fieldSearch, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
    `SELECT p.productUid, pId.appId, p.productName, p.productImg, c.categoryUid, c.categoryName, p.barcodeId, p.buyPrice,
        p.sellPrice, p.stock, m.mainUnit, p.pinyin, p.customerPrice, p.description, p.isCustomerDiscount, p.productionDate,
        p.usablePeriod, l.nameLabel, b.BrandName, f.nameFlavor, s.supplierUid, s.number, s.SupplierName, s.linkman,s.gender,s.tel,s.email,s.address,s.remarks,p.isEnabled 
      from products as p left join category as c on p.categoryID=c.id
        left join appId as pId on p.appId=pId.id left join itemlabel as l on p.labelItem=l.id
        left join itembrand as b on p.itemBrand=b.id left join mainunit  as m on p.mainUnit=m.id
        left join supplier as s on p.supplier=s.supplierUid left join itemflavor as f on p.itemFlavor=f.id
      where pId.appId like "%${appId}%" && ${search} LIKE "%${fieldSearch}%"
      ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset} `
            , (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (appId, id) => new Promise((resolve, reject) => {
    db.query(
      `SELECT p.productUid, p.appId, p.productName, p.productImg, c.categoryUid, c.categoryName, p.barcodeId, p.buyPrice,
      p.sellPrice, p.stock, m.mainUnit, p.pinyin, p.customerPrice, p.description, p.isCustomerDiscount, p.productionDate,
      p.usablePeriod, l.nameLabel, b.BrandName, f.nameFlavor, s.supplierUid, s.number, s.SupplierName, s.linkman,s.gender,s.tel,s.email,s.address,s.remarks,p.isEnabled 
    from products as p left join category as c on p.categoryID=c.id
      left join appId as pId on p.appId=pId.id left join itemlabel as l on p.labelItem=l.id
      left join itembrand as b on p.itemBrand=b.id left join mainunit  as m on p.mainUnit=m.id
      left join supplier as s on p.supplier=s.supplierUid left join itemflavor as f on p.itemFlavor=f.id
        where p.appId like "%${appId}%" &&  p.productUid like "${id}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insertProduct: (body,appId, filename) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (appId,ProductName,productImg,categoryId,barcodeId,buyPrice,sellPrice,stock,
          pinyin,description,isCustomerDiscount,supplier,isEnabled) 
        VALUE ('${appId}','${body.name}','${filename}','${body.categoryId}','${body.barcodeId}','${body.buyPrice}',
          '${body.sellPrice}','${body.stock}','${body.pinyin}','${body.description}',
          '${body.isCustomerDiscount}','${body.supplierUid}','${body.enabled}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  update: (body, id, filename, resultDetail) => new Promise((resolve, reject) => {
    db.query(`update products set productName='${body.productName}',productImg='${filename}',categoryId='${body.categoryId}',
    barcodeId='${body.barcodeId}',buyPrice='${body.buyPrice}',sellPrice='${body.sellPrice}',
    stock='${body.stock}',pinyin='${body.pinyin}',description='${body.description}',
    isCustomerDiscount='${body.isCustomerDiscount}',supplier='${body.supplier}',isEnabled='${body.isEnabled}'
    where productUid='${id}'`, 
    (err, result) => {
      if (err) {
        reject(err);
      } else {
        const filelama = resultDetail
        if (filelama !== 'image.jpg') {
          const pathfile = path.join(__dirname, `../../uploads/product-Img/${filelama}`);
          fs.unlink(pathfile, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } 
        resolve(result);
      }
    });
  }),
};

module.exports = productModel;
