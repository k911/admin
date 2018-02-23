import _extends from 'babel-runtime/helpers/extends';
import { BooleanInput, DateInput, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectArrayInput, SelectInput, TextInput } from 'admin-on-rest';
import React from 'react';
import getReferenceNameField from './getReferenceNameField';

export default (function (field, options) {
  var props = _extends({}, field.inputProps);
  if (field.input) {
    return React.createElement(field.input, _extends({
      key: field.name,
      options: options,
      source: field.name
    }, props));
  }

  if (!props.validate && field.required) props.validate = [required];

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return React.createElement(
        ReferenceInput,
        _extends({
          key: field.name,
          label: field.name,
          reference: field.reference.name,
          source: field.name
        }, props, {
          allowEmpty: true }),
        React.createElement(SelectInput, { optionText: getReferenceNameField(field.reference) })
      );
    }

    return React.createElement(
      ReferenceArrayInput,
      _extends({
        key: field.name,
        label: field.name,
        reference: field.reference.name,
        source: field.name
      }, props, {
        allowEmpty: true }),
      React.createElement(SelectArrayInput, { optionText: getReferenceNameField(field.reference) })
    );
  }

  switch (field.range) {
    case 'http://www.w3.org/2001/XMLSchema#integer':
      return React.createElement(NumberInput, _extends({ key: field.name, source: field.name }, props));

    case 'http://www.w3.org/2001/XMLSchema#decimal':
      return React.createElement(NumberInput, _extends({
        key: field.name,
        source: field.name,
        step: '0.1'
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return React.createElement(BooleanInput, _extends({ key: field.name, source: field.name }, props));

    case 'http://www.w3.org/2001/XMLSchema#date':
    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return React.createElement(DateInput, _extends({ key: field.name, source: field.name }, props));

    default:
      return React.createElement(TextInput, _extends({ key: field.name, source: field.name }, props));
  }
});