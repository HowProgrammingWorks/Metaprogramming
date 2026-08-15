'use strict';

(wcl => {

  // params: { method: { get/post: url }, ... }
  wcl.AjaxAPI = function(methods) {
    const api = {};
    api.request = function(apiMethod, params, callback) {
      let err = null;
      const requestParams = this.methods[apiMethod];
      if (requestParams) {
        let httpMethod, url;
        if (requestParams.get) {
          httpMethod = 'GET';
          url = requestParams.get;
        }
        if (requestParams.post) {
          httpMethod = 'POST';
          url = requestParams.post;
        }
        if (httpMethod) {
          wcl.request(httpMethod, url, params, true, callback);
          return;
        } else {
          err = new Error(
            'DataSource error: HTTP method is not specified'
          );
        }
      } else {
        err = new Error(
          'DataSource error: AJAX method is not specified'
        );
      }
      callback(err, null);
    };
    api.init = function(methods) {
      api.methods = methods;
      for (var method in api.methods) {
        (function() {
          const apiMethod = method;
          if (apiMethod === 'introspect') {
            api[apiMethod] = function(params, callback) {
              api.request(apiMethod, params, (err, data) => {
                api.init(data);
                callback(err, data);
              });
            };
          } else {
            api[apiMethod] = (params, callback) => {
              api.request(apiMethod, params, callback);
            };
          }
        }());
      }
    };
    api.init(methods);
    return api;
  };

  wcl.DataSource = function(methods) {
    // just abstract, see implementation below
    // should be implemented methods:
    //   read(query, callback)
    //     return one record as object, callback(err, obj)
    //   insert(obj, callback)
    //     insert one record, callback(err) on done
    //   update(obj, callback)
    //     update one record, callback(err) on done
    //   delete(query, callback)
    //     delete multiple records, callback(err) on done
    // may be implemented methods:
    //   introspect(params, callback)
    //     populates DataSource.methods with introspection
    //     metadata returning from server
    //   metadata(params, callback)
    //     populates DataSource.metadata with metadata
    //     from server
    //   find(query, callback)
    //     return multiple records as Array,
    //     callback(err, Array)
  };

  wcl.AjaxDataSource = function(methods) {
    const ds = wcl.AjaxAPI(methods);
    ds.read = function(query, callback) {
      ds.request('read', query, (err, data) => {
        // TODO: autocreate Record
        //   callback(err, wcl.Record({ data:data }));
        //
        callback(err, data);
      });
    };
    return ds;
  };

  // { data: Hash, metadata: Hash }
  wcl.MemoryDataSource = function(params) {
    const ds = {};
    ds.data = params.data;
    ds.metadata = params.metadata;
    ds.each = function(params, callback) {
      for (let i = 0; i < ds.data.length; i++) {
        const record = ds.data[i];
        let match = true;
        for (const key in params) {
          match = match && (record[key] === params[key]);
        }
        if (match) {
          if (callback(i)) return;
        }
      }
    };
    ds.read = function(params, callback) {
      const data = ds.data;
      ds.each(params, (key) => {
        callback(null, data[key]);
        return true;
      });
      callback(new Error('Record not found'), null);
    };
    ds.insert = function(params, callback) {
      ds.data.push(params);
      callback();
    };
    ds.update = function(params, callback) {
      const data = ds.data;
      ds.each(params, (key) => {
        data[key] = params;
        return true;
      });
      callback();
    };
    ds.delete = function(params, callback) {
      const data = ds.data;
      ds.each(params, (key) => {
        delete data[key];
      });
      callback();
    };
    ds.find = function(params, callback) {
      const data = ds.data;
      const result = [];
      ds.each(params, (key) => {
        result.push(data[key]);
      });
      callback(null, result);
    };
    return ds;
  };

  wcl.parse = function(json) {
    let result;
    eval('result = new Object(' + json + ')');
    return result;
  };

  wcl.htmlEscape = function(content) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
    };
    return content.replace(/[&<>"'\/]/g, (char) => escapeMap[char]);
  };

  wcl.template = function(tpl, data, escapeHtml) {
    return tpl.replace(/@([\-\.0-9a-zA-Z]+)@/g, (s, key) => {
      const value = data[key];
      return escapeHtml ? wcl.htmlEscape(value) : value;
    });
  };

  wcl.templateHtml = function(tpl, data) {
    return wcl.template(tpl, data, true);
  };

  wcl.request = function(method, url, params, parseResponse, callback) {
    const req = new XMLHttpRequest();
    let data = [];
    let value = '';
    req.open(method, url, true);
    for (const key in params) {
      if (!params.hasOwnProperty(key)) continue;
      value = params[key];
      if (typeof value !== 'string') value = JSON.stringify(value);
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      data.push(`${encodedKey}=${encodedValue}`);
    }
    data = data.join('&');
    req.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    req.setRequestHeader('Content-length', data.length);
    req.setRequestHeader('Connection', 'close');
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        let err = null;
        let res = req.responseText;
        if (req.status === 0 || req.status === 200) {
          if (parseResponse) {
            try {
              res = JSON.parse(res);
            } catch (e) {
              err = new Error(`JSON parse code: ${e}`);
            }
          }
        } else {
          err = new Error(`HTTP error code: ${req.status}`);
        }
        callback(err, res);
      }
    };
    try {
      req.send(data);
    } catch (e) { }
  };

  wcl.get = function(url, params, callback) {
    wcl.request('GET', url, params, true, callback);
  };

  wcl.post = function(url, params, callback) {
    wcl.request('POST', url, params, true, callback);
  };

})(global.wcl = global.wcl || {});
