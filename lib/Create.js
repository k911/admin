import Api from '@api-platform/api-doc-parser/lib/Api';
import Resource from '@api-platform/api-doc-parser/lib/Resource';
import { Create as BaseCreate, SimpleForm } from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';

var Create = function Create(props) {
  var _props$options = props.options,
      api = _props$options.api,
      inputFactory = _props$options.inputFactory,
      resource = _props$options.resource;


  return React.createElement(
    BaseCreate,
    props,
    React.createElement(
      SimpleForm,
      null,
      resource.writableFields.map(function (field) {
        return inputFactory(field, {
          action: 'create',
          api: api,
          resource: resource
        });
      })
    )
  );
};

Create.propTypes = {
  options: PropTypes.shape({
    api: PropTypes.instanceOf(Api).isRequired,
    inputFactory: PropTypes.func.isRequired,
    resource: PropTypes.instanceOf(Resource).isRequired
  })
};

export default Create;