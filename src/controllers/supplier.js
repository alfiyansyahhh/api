const supplierModel = require('../models/supplier');
const { success, failed } = require('../helpers/respon');

const supplier = {

  getList: (req, res) => {
      const { query } = req;
      const search = query.search === undefined ? 'supplierName' : query.search;
      const fieldSearch = query.fieldSearch === undefined ? '' : query.fieldSearch;
      const field = query.field === undefined ? 'supplierUid' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
       
      supplierModel.getList(search,fieldSearch , field, typeSort, limit, offset).then(async (result2) => {
        const allData = await supplierModel.getAll();
        const output = {
            supplier: result2,
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
            failed(res, 400, err, 'client sent an invalid request, such as lacking required request body or parameter');
        })
    
  },

  getDetails: (req, res) => {
    const { id } = req.params;
    supplierModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
    }).catch((err) => {
        failed(res, 500, err, 'getDataFailed');
    })
  },

  insert:  (req, res)  => {
    const { body } = req;
    supplierModel.insertSupplier(body).then((result) => {
        success(res, result, 'succes');
    }).catch((err) => {
        failed(res, 500, err);
    })
  },
};

module.exports = supplier;
