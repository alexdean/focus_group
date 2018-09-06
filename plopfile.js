/* eslint-disable global-require */
module.exports = (plop) => {
  plop.addHelper('ifItem', (it, arr, options) => (
    arr.indexOf(it) > -1 ? options.fn(this) : options.inverse(this)
  ));

  plop.setGenerator( 'component', {
    decription: 'create a new component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What\'s the name of your component?',
        validate: value => (
          (/.+/).test(value) ? true : 'you must name your component'
        ),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'app/javascript/components/{{properCase componentName}}/{{properCase componentName}}.js',
        templateFile: '.templates/component/component.js',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: 'app/javascript/components/{{properCase componentName}}/index.js',
        templateFile: '.templates/component/index.js',
        abortOnFail: true,
      },
      /*
      {
        type: 'add',
        path: 'app/javascript/components/{{properCase componentName}}/{{properCase componentName}}.spec.js',
        templateFile: '.templates/component/spec.js',
        abortOnFail: true,
      },
      */
    ],
  });
};
/* eslint-enable global-require */
