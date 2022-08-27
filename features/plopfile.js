import fs from 'fs';

/**
 * Plop.js is a sub-module generator. This file configures a set of CLI prompts
 * that will pull components from this repo into the repo it is called from.
 * 
 * This generator should be loaded and called from starter sites, not this repo.
 */

const getStarterTemplateList = (path) => {
  const files = fs.readdirSync(path, { withFileTypes: true });

  return files
    .filter((item) => item.isDirectory())
    .map((item) => item.name);
};

export default function (plop) {
  const ROOT = plop.getPlopfilePath();

  plop.setGenerator('component', {
    description: 'generate starter components',

    async prompts(inquirer) {
      const queue = [{
        type: 'checkbox',
        name: 'components',
        message: 'components:',
        choices: getStarterTemplateList(`${ROOT}/components`),
      }];
      let answers = {};

      while (queue.length) {
        const next = await inquirer.prompt(queue.shift());

        if (next.components) {
          // Add follow-up prompts for every component being added
          next.components.forEach((component) => {
            queue.push(
              {
                type: 'input',
                name: `customName${component}`,
                message: `Name for ${component} component:`,
                default: component,
              }
            );
          });
        }

        answers = {...answers, ...next};
      }

      // Explicitly pass prompt answers to 'actions' because async prompts
      plop.answers = answers;
    },

    actions: function() {
      const actions = [];

      plop.answers.components.forEach((component) => {
        const data = fs.readFileSync(`${plop.getPlopfilePath()}/${component}/manifest.json`);
        const manifest = JSON.parse(data);

        manifest.files.forEach((file) => {
          const customName = plop.answers['customName' + component];
          const customFile = file.replace(manifest.name, customName);

          actions.push({
            type: 'add',
            path: `src/components/${customName}/${customFile}`,
            templateFile: `${component}/${file}`,
          });

          actions.push({
            type: 'modify',
            path: `src/components/${customName}/${customFile}`,
            pattern: new RegExp(component, `gm`),
            template: customName,
          });
        })
      });

      return actions;
    }
  });
}
