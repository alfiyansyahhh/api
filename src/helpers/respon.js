const response = {
  success: (res, data, message) => {
    const response1 = {
      status_code: 200,
      succes: true,
      message,
      data: data,
    };
    res.json(response1);
  },
  failed: (res, code, err, message) => {
    if (code === 500) {
      const response500 = {
        succes: false,
        code,
        message,
        data: null,
        err
      };
      res.status(500).json(response500);
    } else if (code === 401) {
      const response = {
        succes: false,
        code,
        message,
        data: null,
        err
      };
      res.status(401).json(response);
    } else if (code === 400) {
      const response = {
        succes: false,
        code,
        message,
        data: null,
        err
      };
      res.status(400).json(response);
    }
  },
};

module.exports = response;
