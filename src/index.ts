import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the cml-terminals extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'cml-terminals',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {

    const { commands } = app;
    const command = 'deploy-lab:command'

    //Add Deploy Lab Command
    commands.addCommand(command, {
      label: 'Deploy Lab deploy-lab:command Command',
      caption: 'Deploy deploy-lab:command Command',
      execute: (args: any) => {
        const orig = args['origin'];
        console.log(`deploy-lab:command has been called from ${orig}.`);
        if (orig !== 'init') {
          window.alert(`deploy-lab:command hass been called from ${orig}.`);
        }
      }
    });

    commands.execute(command, { origin: 'init' }).catch((reason: any) => {
      console.error(
        `An error occured during the execution of deploy-lab:command.\n${reason}`
      );
    });
  }
};

export default extension;
