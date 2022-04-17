const appIdModel = require('../models/appId');
const { success, failed } = require('../helpers/respon');

const product = {
    
  getList: (req, res) => {
    const { query } = req;
    const search = query.search === undefined ? '' : query.search;
    const field = query.field === undefined ? 'id' : query.field;
    const typeSort = query.sort === undefined ? '' : query.sort;
    const limit = query.limit === undefined ? 50 : parseInt(query.limit);
    const page = query.page === undefined ? 1 : query.page;
    const offset = page === 1 ? 0 : (page - 1) * limit;

    appIdModel.getList(search, field, typeSort, limit, offset).then(async (result2) => {
        const allData = await appIdModel.getAll();
        const output = {
            data: result2,
            totalPage: Math.ceil(allData.length / limit),
            search,
            limit,
            page,
        };
        success(res, output, 'succes');
    }).catch((error) => {
        failed(res, 400, error, 'client sent an invalid request, such as lacking required request body or parameter');
    })
  },

  getDetails: (req, res) => {
    const { id } = req.params;
    appIdModel.getDetails(id).them((
        success(res, result, 'succes')
    )).catch((
        failed(res, 400, error, 'appId not found')
    ))
  },

  insert: (req, res) => {
    const { body } = req;
    appIdModel.getDetails(body.appId).then((
        success(res, result, 'succes')
    )).catch((
        failed(res, 400, error, 'appId not found')
    ))
  },

};

module.exports = product;
