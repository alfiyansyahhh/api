/* eslint-disable max-len */
const _ = require('lodash');
const productModel = require('../models/product');
const { success, failed } = require('../helpers/respon');
const appIdModel = require('../models/appId')

const product = {

  getList: (req, res) => {
      const { query } = req;
      const {appId} = req.body
      const search2 = (value) => {
          let field = ''
          if (value == 'product') {
              field = 'p.productName'
          } else if (value == 'category' ){
              field = 'c.categoryName'
          } else if ( value == 'barcode'){
              field = 'p.barcodeId'
          }
        return field
      }
      const search = query.search === undefined ? 'p.productName' : search2(query.search);
      const fieldSearch = query.fieldSearch === undefined ? '' : query.fieldSearch;
      const field = query.field === undefined ? 'p.productUid' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      
        if (appId === undefined || appId === '') {
            failed(res, 401, "client sent an invalid request, such as lacking required request body or parameter", 'appId undefined')
        } else {
            appIdModel.getList(req.body.appId).then((result)=>{
                productModel.getList(appId, search,fieldSearch , field, typeSort, limit, offset).then(async (result2) => {
                    const allData = await productModel.getAll();
                    const output = {
                      product: result2,
                      totalDataProduct: allData.length,
                      totalPage: Math.ceil(allData.length / limit),
                      limit,
                      page,
                      search:{
                          totalDataSearch: result2.length,
                          fieldSearch
                      }
                    };
                    success(res, output, 'succes');
                  }).catch((err) => {
                      console.log(err)
                    failed(res, 400, err, 'client sent an invalid request, such as lacking required request body or parameter');
                  })
            }).catch((err) => {
                failed(res, 400, err, 'appId not found')
            });
        }
  },

  getDetails: (req, res) => {
    const { id } = req.params;
    const {body } = req
    appIdModel.getList(body.appId).then((result) => {
        productModel.getDetails(result[0].id, id).then((result) => {
            success(res, result, 'succes');
        }).catch((err) => {
            failed(res, 500, err, 'getDataFailed');
        })
    }).catch((err) => {
        console.log('err disini')
        failed(res, 400, err, 'appId not found')
    })
  },

  insert: async  (req, res)  => {
    const { body } = req;
    let file =  ''
    
    if (req.file === undefined) {
        file = 'image.jpg'
    } else {
        file = req.file.filename;
    }

    let appId = await appIdModel.getList(req.body.appId).then((result) => {
        return result[0].id
    })


    if (typeof appId == 'number') {
        console.log('masuk')
        productModel.insertProduct(body, appId, file).then((result) => {
            success(res, result, 'succes');
        }).catch((err) => {
            failed(res, 500, err);
        })
    } else {
        appIdModel.insertAppId(req.body.appId).then((result) =>{
            // appId = result[0].id
            console.log('ini')
            productModel.insertProduct(body, result[0].id, file).then((result) => {
                success(res, result, 'succes');
            }).catch((err) => {
                failed(res, 500, err);
            })
        }).catch((err) =>{
            failed(res, 500, err, 'error')
        })
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    let { appId }= req.body
    let file = ''
    if (req.file === undefined) {
        productModel.getDetails(id).then((result) => {
            file = result[0].picture;
        })
    } else {
        file = req.file.filename;
    }

 
    let appId2 = await appIdModel.getList(appId).then((result) => {
        return result[0].id
    })

    let resultDetail = await productModel.getDetails(appId2,id).then((resultDetail) => {
        return resultDetail[0].productImg
    })

    productModel.update(body, id, file, resultDetail).then((result) => {
        success(res, result, 'succes');
    }).catch((err) => {
        failed(res, 500, err, 'error')
    });

   
  },
};

module.exports = product;
