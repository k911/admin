import _extends from 'babel-runtime/helpers/extends';
import Api from '@api-platform/api-doc-parser/lib/Api';
import { Admin, Delete, Resource } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import Create from './Create';
import Edit from './Edit';
import fieldFactory from './fieldFactory';
import inputFactory from './inputFactory';
import List from './List';
import Show from './Show';

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
      var _resource$create = resource.create,
          create = _resource$create === undefined ? Create : _resource$create,
          _resource$edit = resource.edit,
          edit = _resource$edit === undefined ? Edit : _resource$edit,
          _resource$list = resource.list,
          list = _resource$list === undefined ? List : _resource$list,
          name = resource.name,
          props = resource.props,
          _resource$remove = resource.remove,
          remove = _resource$remove === undefined ? Delete : _resource$remove,
          _resource$show = resource.show,
          show = _resource$show === undefined ? Show : _resource$show;

      return React.createElement(Resource, _extends({}, props, {
        create: create,
        edit: edit,
        key: name,
        list: list,
        name: name,
        options: {
          api: api,
          fieldFactory: fieldFactory,
          inputFactory: inputFactory,
          resource: resource
        },
        remove: remove,
        show: show
      }));
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