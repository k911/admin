import Api from '@api-platform/api-doc-parser/lib/Api';
import Resource from '@api-platform/api-doc-parser/lib/Resource';
import { Datagrid, EditButton, List as BaseList, ShowButton, TextField } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';

var List = function List(props) {
  var hasEdit = props.hasEdit,
      hasShow = props.hasShow,
      _props$options = props.options,
      api = _props$options.api,
      fieldFactory = _props$options.fieldFactory,
      resource = _props$options.resource;


  return React.createElement(
    BaseList,
    props,
    React.createElement(
      Datagrid,
      null,
      React.createElement(TextField, { source: 'id' }),
      resource.readableFields.map(function (field) {
        return fieldFactory(field, {
          action: 'list',
          api: api,
          resource: resource
        });
      }),
      hasShow && React.createElement(ShowButton, null),
      hasEdit && React.createElement(EditButton, null)
    )
  );
};

List.defaultProps = {
  perPage: 30 // Default value in API Platform
};

List.propTypes = {
  options: PropTypes.shape({
    api: PropTypes.instanceOf(Api).isRequired,
    fieldFactory: PropTypes.func.isRequired,
    resource: PropTypes.instanceOf(Resource).isRequired
  }),
  perPage: PropTypes.number,
  hasEdit: PropTypes.bool.isRequired,
  hasShow: PropTypes.bool.isRequired
};

export default List;