const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your component name"
      },
      {
        type: "confirm",
        name: "styles",
        message: "Would you like to create SCSS Module?"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.name = props.name;
      this.styles = props.styles;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("component.html"),
      this.destinationPath(`${this.name}/${this.name}.tsx`),
      { title: this.name }
    );

    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath(`${this.name}/index.ts`),
      { title: this.name }
    );

    if (this.styles) {
      this.fs.copyTpl(
        this.templatePath("styles.html"),
        this.destinationPath(`${this.name}/${this.name}.module.less`),
        { title: this.name }
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
