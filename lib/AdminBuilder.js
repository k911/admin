import _extends from 'babel-runtime/helpers/extends';
import Api from '@api-platform/api-doc-parser/lib/Api';
import { Admin } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import resourcesBuilder from './resourcesBuilder';

var AdminBuilder = function AdminBuilder(props) {
  var api = props.api,
      _props$title = props.title,
      title = _props$title === undefined ? api.title : _props$title;


  return React.createElement(
    Admin,
    _extends({}, props, { title: title }),
    resourcesBuilder(props)
  );
};

AdminBuilder.propTypes = {
  api: PropTypes.instanceOf(Api).isRequired,
  restClient: PropTypes.func.isRequired
};

export default AdminBuilder;