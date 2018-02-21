import _extends from 'babel-runtime/helpers/extends';
import Api from '@api-platform/api-doc-parser/lib/Api';
import { Admin } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import ResourcesBuilder from './ResourcesBuilder';

var AdminBuilder = function AdminBuilder(props) {
  var api = props.api,
      _props$title = props.title,
      title = _props$title === undefined ? api.title : _props$title;


  return React.createElement(
    Admin,
    _extends({}, props, { title: title }),
    React.createElement(ResourcesBuilder, _extends({}, props, { api: api }))
  );
};

AdminBuilder.propTypes = {
  api: PropTypes.instanceOf(Api).isRequired,
  restClient: PropTypes.func.isRequired
};

export default AdminBuilder;