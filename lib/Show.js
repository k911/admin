import Api from '@api-platform/api-doc-parser/lib/Api';
import Resource from '@api-platform/api-doc-parser/lib/Resource';
import { Show as BaseShow, SimpleShowLayout, TextField } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';

var Show = function Show(props) {
  var _props$options = props.options,
      api = _props$options.api,
      fieldFactory = _props$options.fieldFactory,
      resource = _props$options.resource;


  return React.createElement(
    BaseShow,
    props,
    React.createElement(
      SimpleShowLayout,
      null,
      React.createElement(TextField, { source: 'id' }),
      resource.readableFields.map(function (field) {
        return fieldFactory(field, {
          action: 'show',
          api: api,
          resource: resource
        });
      })
    )
  );
};

Show.propTypes = {
  options: PropTypes.shape({
    api: PropTypes.instanceOf(Api).isRequired,
    fieldFactory: PropTypes.func.isRequired,
    resource: PropTypes.instanceOf(Resource).isRequired
  })
};

export default Show;