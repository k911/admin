import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import apiDocumentationParser from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Admin } from 'admin-on-rest';
import restClient from './hydraClient';
import resourcesBuilder from '../resourcesBuilder';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      api: null,
      customRoutes: [],
      hasError: false,
      loaded: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    this.props.apiDocumentationParser(this.props.entrypoint).then(function (_ref) {
      var api = _ref.api,
          _ref$customRoutes = _ref.customRoutes,
          customRoutes = _ref$customRoutes === undefined ? [] : _ref$customRoutes;
      return {
        api: api,
        customRoutes: customRoutes,
        hasError: false,
        loaded: true
      };
    }, function (data) {
      if (data instanceof Error) {
        console.error(data);

        return {
          hasError: true,
          loaded: true
        };
      }

      return {
        api: data.api,
        customRoutes: data.customRoutes,
        hasError: true,
        loaded: true
      };
    }).then(this.setState.bind(this));
  };

  _class.prototype.render = function render() {
    if (false === this.state.loaded) {
      return 'function' === typeof this.props.loading ? React.createElement(this.props.loading, null) : React.createElement(
        'span',
        { className: 'loading' },
        this.props.loading
      );
    }

    if (true === this.state.hasError) {
      return 'function' === typeof this.props.error ? React.createElement(this.props.error, null) : React.createElement(
        'span',
        { className: 'error' },
        this.props.error
      );
    }

    return React.createElement(
      Admin,
      _extends({}, this.props, {
        title: this.state.api.title,
        customRoutes: this.props.customRoutes.concat(this.state.customRoutes),
        restClient: this.props.restClient(this.state.api) }),
      resourcesBuilder(this.state.api)
    );
  };

  return _class;
}(Component);

_class.defaultProps = {
  apiDocumentationParser: apiDocumentationParser,
  customRoutes: [],
  error: 'Unable to retrieve API documentation.',
  loading: 'Loading...',
  restClient: restClient
};
_class.propTypes = {
  apiDocumentationParser: PropTypes.func,
  customRoutes: PropTypes.array,
  entrypoint: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  loading: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  restClient: PropTypes.func
};
export default _class;