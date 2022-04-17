const itemBrandModel = require('../models/itemBrand');
const { success, failed } = require('../helpers/respon');

const itemBrand = {

  getList: (req, res) => {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
       
      itemBrandModel.getList(search, field, typeSort, limit, offset).then(async (result2) => {
        const allData = await itemBrandModel.getAll();
        const output = {
            itemBrand: result2,
            totalDataCategiry: allData.length,
            totalPage: Math.ceil(allData.length / limit),
            limit,
            page,
            search:{
                totalDataSearch: result2.length,
                search
            }
        };
        success(res, output, 'succes');
        }).catch((err) => {
            console.log(err)
            failed(res, 400, err, 'client sent an invalid request, such as lacking required request body or parameter');
        })
    
  },

  getDetails: (req, res) => {
      console.log('masuk')
    const { id } = req.params;
    itemBrandModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
    }).catch((err) => {
        failed(res, 500, err, 'getDataFailed');
    })
  },

  insert:  (req, res)  => {
    const { body } = req;
    itemBrandModel.insertitemBrand(body).then((result) => {
        success(res, result, 'succes');
    }).catch((err) => {
        failed(res, 500, err);
    })
  },
};

module.exports = itemBrand;
