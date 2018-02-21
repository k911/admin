import Api from '@api-platform/api-doc-parser/lib/Api';
import Resource from '@api-platform/api-doc-parser/lib/Resource';
import { DisabledInput, Edit as BaseEdit, SimpleForm } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';

var Edit = function Edit(props) {
  var _props$options = props.options,
      api = _props$options.api,
      inputFactory = _props$options.inputFactory,
      resource = _props$options.resource;


  return React.createElement(
    BaseEdit,
    props,
    React.createElement(
      SimpleForm,
      null,
      React.createElement(DisabledInput, { source: 'id' }),
      resource.writableFields.map(function (field) {
        return inputFactory(field, {
          action: 'edit',
          api: api,
          resource: resource
        });
      })
    )
  );
};

Edit.propTypes = {
  options: PropTypes.shape({
    api: PropTypes.instanceOf(Api).isRequired,
    inputFactory: PropTypes.func.isRequired,
    resource: PropTypes.instanceOf(Resource).isRequired
  })
};

export default Edit;