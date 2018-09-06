import test, { shallow } from 'lib/tape-setup';

import React from 'react';

import { {{pascalCase componentName}} } from './{{pascalCase componentName}}';

test( "components/{{pascalCase componentName}}...", sub => {
  sub.test( "...should render.", assert => {
    shallow( <{{pascalCase componentName}} /> )

    assert.end();
  });
});
