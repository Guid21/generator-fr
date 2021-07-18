const Generator = require('yeoman-generator');

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

module.exports = class extends Generator {
  async prompting() {
    await this.prompt([
      {
        type: 'list',
        choices: ['component', 'redux'],
        name: 'module',
        message: 'What module do you want to build?',
      },
    ]).then(({ module }) => {
      this.module = module;
    });

    switch (this.module) {
      case 'component':
        return this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Your component name',
          },
        ]).then((props) => {
          this.name = props.name;
        });
      case 'redux':
        return this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Your redux endpoint name',
          },
        ]).then((props) => {
          this.name = props.name;
        });
    }
  }

  writing() {
    switch (this.module) {
      case 'component':
        this.fs.copyTpl(
          this.templatePath('component/index.html'),
          this.destinationPath(`${this.name}/index.ts`),
          { title: capitalize(this.name) }
        );

        this.fs.copyTpl(
          this.templatePath('component/component.html'),
          this.destinationPath(`${this.name}/${this.name}.tsx`),
          { title: capitalize(this.name) }
        );

        this.fs.copyTpl(
          this.templatePath('component/styles.html'),
          this.destinationPath(`${this.name}/${this.name}.module.less`),
          { title: capitalize(this.name) }
        );
        break;
      case 'redux':
        this.fs.copyTpl(
          this.templatePath('redux/index.html'),
          this.destinationPath(`${this.name}/index.ts`),
          { title: this.name }
        );
        this.fs.copyTpl(
          this.templatePath('redux/endPoint.actions.html'),
          this.destinationPath(`${this.name}/${this.name}.actions.ts`),
          { titleWithCapitalise: capitalize(this.name) }
        );
        this.fs.copyTpl(
          this.templatePath('redux/endPoint.service.html'),
          this.destinationPath(`${this.name}/${this.name}.service.ts`),
          { title: this.name, titleWithCapitalise: capitalize(this.name) }
        );
        this.fs.copyTpl(
          this.templatePath('redux/endPoint.effect.html'),
          this.destinationPath(`${this.name}/${this.name}.effect.ts`),
          { title: this.name, titleWithCapitalise: capitalize(this.name) }
        );
        this.fs.copyTpl(
          this.templatePath('redux/endPoint.reducer.html'),
          this.destinationPath(`${this.name}/${this.name}.reducer.ts`),
          { title: this.name, titleWithCapitalise: capitalize(this.name) }
        );
        break;
    }
  }

  install() {
    this.installDependencies();
  }
};
