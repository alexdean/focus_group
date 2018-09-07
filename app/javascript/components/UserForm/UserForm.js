// @flow
import React from 'react';

import { Formik, Form, Field } from 'formik';

export const UserForm = ({ onChange }) => (
  <Formik
    initialValues={{
      name: ''
    }}
    onSubmit={ values => {
      onChange( values.name );
    }}
    render={ () => (
      <Form>
        <fieldset style={{ border: '0 none', padding: '10px 0' }}>
          <label style={{ display: 'block', paddingBottom: '10px' }}>
            Enter your name as you would like it to appear to others:
          </label>
          <Field name="name" style={{ width: '100%', border: '1px solid #222', borderRadius: '3px', lineHeight: '16px' }} placeholder="Kevin" />
        </fieldset>
        <button type="submit">Start Scoring</button>
      </Form>
    )}
    />
);
