import _extends from 'babel-runtime/helpers/extends';
import { Delete, Resource } from 'admin-on-rest';
import React from 'react';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import Show from './Show';

export default (function (resource, api, fieldFactory, inputFactory) {
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
});