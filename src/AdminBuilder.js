import Api from '@api-platform/api-doc-parser/lib/Api';
import {Admin} from 'admin-on-rest';
import PropTypes from 'prop-types';
import React from 'react';
import resourcesBuilder from './resourcesBuilder';

const AdminBuilder = props => {
  const {api, title = api.title} = props;

  return (
    <Admin {...props} title={title}>
      {resourcesBuilder(api)}
    </Admin>
  );
};

AdminBuilder.propTypes = {
  api: PropTypes.instanceOf(Api).isRequired,
  restClient: PropTypes.func.isRequired,
};

export default AdminBuilder;
