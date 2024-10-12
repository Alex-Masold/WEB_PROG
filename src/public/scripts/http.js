var Http = (() => {

  // Setup request for json
  var getOptions = (verb, data) => {
    var options = {
      dataType: 'json',
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (!!data) {
      options.body = JSON.stringify(data);
    }
    return options;
  };

  // Set Http methods
  return {
    get: (path) => fetch(path, getOptions('GET')),
    post: (path, data) => fetch(path, getOptions('POST', data)),
    patch: (path, data) => fetch(path, getOptions('PATCH', data)),
    delete: (path) => fetch(path, getOptions('DELETE')),
  };
})();
