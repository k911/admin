import {Delete, Resource} from 'admin-on-rest';
import React from 'react';
import Create from './Create';
import Edit from './Edit';
import defaultFieldFactory from './fieldFactory';
import defaultInputFactory from './inputFactory';
import List from './List';
import Show from './Show';

const makeResource = (resource, api, fieldFactory, inputFactory) => {
  const {
    create = Create,
    edit = Edit,
    list = List,
    name,
    props,
    remove = Delete,
    show = Show,
  } = resource;
  return (
    <Resource
      {...props}
      create={create}
      edit={edit}
      key={name}
      list={list}
      name={name}
      options={{
        api,
        fieldFactory,
        inputFactory,
        resource,
      }}
      remove={remove}
      show={show}
    />
  );
};

const resourcesBuilder = (
  api,
  fieldFactory = defaultFieldFactory,
  inputFactory = defaultInputFactory,
) =>
  api.resources.map(resource =>
    makeResource(resource, api, fieldFactory, inputFactory),
  );

export default resourcesBuilder;
