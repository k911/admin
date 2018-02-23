import _extends from 'babel-runtime/helpers/extends';
import Api from '@api-platform/api-doc-parser/lib/Api';
import { Admin } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import fieldFactory from './fieldFactory';
import inputFactory from './inputFactory';
import resourceFactory from './resourceFactory';

var AdminBuilder = function AdminBuilder(props) {
  var api = props.api,
      fieldFactory = props.fieldFactory,
      inputFactory = props.inputFactory,
      _props$title = props.title,
      title = _props$title === undefined ? api.title : _props$title;


  return React.createElement(
    Admin,
    _extends({}, props, { title: title }),
    api.resources.map(function (resource) {
      return resourceFactory(resource, api, fieldFactory, inputFactory);
    })
  );
};

AdminBuilder.defaultProps = {
  fieldFactory: fieldFactory,
  inputFactory: inputFactory
};

AdminBuilder.propTypes = {
  api: PropTypes.instanceOf(Api).isRequired,
  fieldFactory: PropTypes.func,
  inputFactory: PropTypes.func,
  restClient: PropTypes.func.isRequired
};

export default AdminBuilder;