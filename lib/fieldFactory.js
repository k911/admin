import _extends from 'babel-runtime/helpers/extends';
import { BooleanField, ChipField, DateField, EmailField, NumberField, ReferenceField, ReferenceArrayField, SingleFieldList, TextField, UrlField } from 'admin-on-rest';
import React from 'react';
import getReferenceNameField from './getReferenceNameField';

export default (function (field, options) {
  var props = _extends({}, field.fieldProps);
  if (field.field) {
    return React.createElement(field.field, _extends({
      key: field.name,
      options: options,
      source: field.name
    }, props));
  }

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return React.createElement(
        ReferenceField,
        _extends({
          source: field.name,
          reference: field.reference.name,
          key: field.name
        }, props, {
          allowEmpty: true }),
        React.createElement(ChipField, { source: getReferenceNameField(field.reference) })
      );
    }

    var referenceNameField = getReferenceNameField(field.reference);
    return React.createElement(
      ReferenceArrayField,
      _extends({
        source: field.name,
        reference: field.reference.name,
        key: field.name
      }, props),
      React.createElement(
        SingleFieldList,
        null,
        React.createElement(ChipField, { source: referenceNameField, key: referenceNameField })
      )
    );
  }

  switch (field.id) {
    case 'http://schema.org/email':
      return React.createElement(EmailField, _extends({ key: field.name, source: field.name }, props));

    case 'http://schema.org/url':
      return React.createElement(UrlField, _extends({ key: field.name, source: field.name }, props));

    default:
    // Do nothing
  }

  switch (field.range) {
    case 'http://www.w3.org/2001/XMLSchema#integer':
    case 'http://www.w3.org/2001/XMLSchema#float':
      return React.createElement(NumberField, _extends({ key: field.name, source: field.name }, props));

    case 'http://www.w3.org/2001/XMLSchema#date':
    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return React.createElement(DateField, _extends({ key: field.name, source: field.name }, props));

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return React.createElement(BooleanField, _extends({ key: field.name, source: field.name }, props));

    default:
      return React.createElement(TextField, _extends({ key: field.name, source: field.name }, props));
  }
});