'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformJsonLdDocumentToAORDocument = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _adminOnRest = require('admin-on-rest');

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _fetchHydra = require('./fetchHydra');

var _fetchHydra2 = _interopRequireDefault(_fetchHydra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transforms a JSON-LD document to an admin-on-rest compatible document
 *
 * @param {number} maxDepth
 * @param {number} depth
 */
var transformJsonLdDocumentToAORDocument = exports.transformJsonLdDocumentToAORDocument = function transformJsonLdDocumentToAORDocument() {
  var maxDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return function (documents) {
    if (!(0, _lodash2.default)(documents) && !Array.isArray(documents)) {
      return documents;
    }

    documents = Array.isArray(documents) ? Array.from(documents) : Object.assign({}, documents, {
      originId: documents.id,
      id: documents['@id']
    });

    if (depth < maxDepth) {
      if (Array.isArray(documents)) {
        documents = documents.map(function (document) {
          return transformJsonLdDocumentToAORDocument(maxDepth, depth + 1)(document);
        });
      } else {
        Object.keys(documents).forEach(function (key) {
          documents[key] = transformJsonLdDocumentToAORDocument(maxDepth, depth + 1)(documents[key]);
        });
      }
    }

    return documents;
  };
};

/**
 * Maps admin-on-rest queries to a Hydra powered REST API
 *
 * @see http://www.hydra-cg.com/
 *
 * @example
 * CREATE   => POST http://my.api.url/posts/123
 * DELETE   => DELETE http://my.api.url/posts/123
 * GET_LIST => GET http://my.api.url/posts
 * GET_MANY => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * GET_ONE  => GET http://my.api.url/posts/123
 * UPDATE   => PUT http://my.api.url/posts/123
 */

exports.default = function (_ref) {
  var entrypoint = _ref.entrypoint,
      _ref$resources = _ref.resources,
      resources = _ref$resources === undefined ? [] : _ref$resources;
  var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fetchHydra2.default;

  /**
   * @param {Object} resource
   * @param {Object} data
   *
   * @returns {Promise}
   */
  var convertAORDataToHydraData = function convertAORDataToHydraData(resource) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var fieldData = [];
    resource.fields.forEach(function (_ref2) {
      var name = _ref2.name,
          normalizeData = _ref2.normalizeData;

      if (!(name in data) || undefined === normalizeData) {
        return;
      }

      fieldData[name] = normalizeData(data[name]);
    });

    var fieldDataKeys = Object.keys(fieldData);
    var fieldDataValues = Object.values(fieldData);

    return Promise.all(fieldDataValues).then(function (fieldData) {
      var object = {};
      for (var i = 0; i < fieldDataKeys.length; i++) {
        object[fieldDataKeys[i]] = fieldData[i];
      }

      return (0, _extends3.default)({}, data, object);
    });
  };

  /**
   * @param {Object} resource 
   * @param {Object} data 
   * 
   * @returns {Promise}
   */
  var transformAORDataToRequestBody = function transformAORDataToRequestBody(resource) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    resource = resources.find(function (_ref3) {
      var name = _ref3.name;
      return resource === name;
    });
    if (undefined === resource) {
      return Promise.resolve(data);
    }

    return convertAORDataToHydraData(resource, data).then(function (data) {
      return undefined === resource.encodeData ? JSON.stringify(data) : resource.encodeData(data);
    });
  };

  /**
   * @param {string} type
   * @param {string} resource
   * @param {Object} params
   *
   * @returns {Object}
   */
  var convertAORRequestToHydraRequest = function convertAORRequestToHydraRequest(type, resource, params) {
    switch (type) {
      case _adminOnRest.CREATE:
        return transformAORDataToRequestBody(resource, params.data).then(function (body) {
          return {
            options: {
              body: body,
              method: 'POST'
            },
            url: entrypoint + '/' + resource
          };
        });

      case _adminOnRest.DELETE:
        return Promise.resolve({
          options: {
            method: 'DELETE'
          },
          url: entrypoint + params.id
        });

      case _adminOnRest.GET_LIST:
        {
          var page = params.pagination.page,
              _params$sort = params.sort,
              field = _params$sort.field,
              order = _params$sort.order;


          return Promise.resolve({
            options: {},
            url: entrypoint + '/' + resource + '?' + _qs2.default.stringify((0, _extends3.default)({}, params.filter, {
              order: (0, _defineProperty3.default)({}, field, order),
              page: page
            }))
          });
        }

      case _adminOnRest.GET_MANY_REFERENCE:
        return Promise.resolve({
          options: {},
          url: entrypoint + '/' + resource + '?' + _qs2.default.stringify((0, _defineProperty3.default)({}, params.target, params.id))
        });

      case _adminOnRest.GET_ONE:
        return Promise.resolve({
          options: {},
          url: entrypoint + params.id
        });

      case _adminOnRest.UPDATE:
        return transformAORDataToRequestBody(resource, params.data).then(function (body) {
          return {
            options: {
              body: body,
              method: 'PUT'
            },
            url: entrypoint + params.id
          };
        });

      default:
        throw new Error('Unsupported fetch action type ' + type);
    }
  };

  /**
   * @param {string} resource
   * @param {Object} data
   *
   * @returns {Promise}
   */
  var convertHydraDataToAORData = function convertHydraDataToAORData(resource) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    resource = resources.find(function (_ref4) {
      var name = _ref4.name;
      return resource === name;
    });
    if (undefined === resource) {
      return Promise.resolve(data);
    }

    var fieldData = {};
    resource.fields.forEach(function (_ref5) {
      var name = _ref5.name,
          denormalizeData = _ref5.denormalizeData;

      if (!(name in data) || undefined === denormalizeData) {
        return;
      }

      fieldData[name] = denormalizeData(data[name]);
    });

    var fieldDataKeys = Object.keys(fieldData);
    var fieldDataValues = Object.values(fieldData);

    return Promise.all(fieldDataValues).then(function (fieldData) {
      var object = {};
      for (var i = 0; i < fieldDataKeys.length; i++) {
        object[fieldDataKeys[i]] = fieldData[i];
      }

      return (0, _extends3.default)({}, data, object);
    });
  };

  /**
   * @param {Object} response
   * @param {string} resource
   * @param {string} type
   *
   * @returns {Promise}
   */
  var convertHydraResponseToAORResponse = function convertHydraResponseToAORResponse(type, resource, response) {
    switch (type) {
      case _adminOnRest.GET_LIST:
      case _adminOnRest.GET_MANY_REFERENCE:
        // TODO: support other prefixes than "hydra:"
        return Promise.resolve(response.json['hydra:member'].map(transformJsonLdDocumentToAORDocument())).then(function (data) {
          return Promise.all(data.map(function (data) {
            return convertHydraDataToAORData(resource, data);
          }));
        }).then(function (data) {
          return { data: data, total: response.json['hydra:totalItems'] };
        });

      default:
        return Promise.resolve(transformJsonLdDocumentToAORDocument()(response.json)).then(function (data) {
          return convertHydraDataToAORData(resource, data);
        }).then(function (data) {
          return { data: data };
        });
    }
  };

  /**
   * @param {string} type
   * @param {string} resource
   * @param {Object} params
   *
   * @returns {Promise}
   */
  var fetchApi = function fetchApi(type, resource, params) {
    // Hydra doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
    if (_adminOnRest.GET_MANY === type) {
      return Promise.all(params.ids.map(function (id) {
        return fetchApi(_adminOnRest.GET_ONE, resource, { id: id });
      })).then(function (responses) {
        return { data: responses.map(function (_ref6) {
            var data = _ref6.data;
            return data;
          }) };
      });
    }

    return convertAORRequestToHydraRequest(type, resource, params).then(function (_ref7) {
      var url = _ref7.url,
          options = _ref7.options;
      return httpClient(url, options);
    }).then(function (response) {
      return convertHydraResponseToAORResponse(type, resource, response);
    });
  };

  return fetchApi;
};