// @flow
import React from 'react';

import { Formik, Form, Field } from 'formik';

export const UserForm = () => (
  <Formik
    initialValues={{
      handle: '',
      width: ''
    }}
    onSubmit={ values => {
      console.log( 'Submitted:', values );
    }}
    render={ () => (
      <Form>
        <fieldset>
          <label>Handle:</label>
          <Field name="handle" />
        </fieldset>
        <fieldset>
          <label>Width:</label>
          <Field name="width" />
        </fieldset>
      </Form>
    )}
    />
);
