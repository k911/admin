import Api from '@api-platform/api-doc-parser/lib/Api';
import {Admin} from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import ResourcesBuilder from './ResourcesBuilder';

const AdminBuilder = props => {
  const {api, title = api.title} = props;

  return (
    <Admin {...props} title={title}>
      <ResourcesBuilder {...props} api={api} />
    </Admin>
  );
};

AdminBuilder.propTypes = {
  api: PropTypes.instanceOf(Api).isRequired,
  restClient: PropTypes.func.isRequired,
};

export default AdminBuilder;
