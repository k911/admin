import _extends from 'babel-runtime/helpers/extends';
import { Delete, Resource } from 'admin-on-rest';
import React from 'react';
import Create from './Create';
import Edit from './Edit';
import defaultFieldFactory from './fieldFactory';
import defaultInputFactory from './inputFactory';
import List from './List';
import Show from './Show';

var resourcesBuilder = function resourcesBuilder(api) {
  var fieldFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFieldFactory;
  var inputFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultInputFactory;
  return api.resources.map(function (resource) {
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
};

export default resourcesBuilder;