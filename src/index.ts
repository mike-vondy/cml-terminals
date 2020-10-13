import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import { ILauncher } from '@jupyterlab/launcher';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { LabIcon } from '@jupyterlab/ui-components';

import pythonIconStr from '../style/Python-logo-notext.svg';

const FACTORY = 'Editor';
const PALETTE_CATEGORY = 'Modeling Labs';

namespace CommandIDs {
  export const deployLab = 'cml:deploy-lab';
}
/**
 * Initialization data for the cml-terminals extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'deploy-lab',
  autoStart: true,
  requires: [IFileBrowserFactory],
  optional: [ILauncher, IMainMenu, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    browserFactory: IFileBrowserFactory,
    launcher: ILauncher | null,
    menu: IMainMenu | null,
    palette: ICommandPalette | null 
  ) => {
    const { commands } = app;
    const command = CommandIDs.deployLab;
    const icon = new LabIcon({
      name: 'launcher:deploy-icon',
      svgstr: pythonIconStr
    });

    //Add Deploy Lab Command
    commands.addCommand(command, {
      label: (args: any) => (args['isPalette'] ? 'Deploy New Lab': 'Deploy Lab'),
      caption: 'Deploy new CML Lab',
      icon: (args: any) => (args['isPalette'] ? null : icon),
      execute: async (args: any) => {
        const cwd = args['cwd'] || browserFactory.defaultBrowser.model.path;

        const model = await commands.execute('docmanager:new-untitled', {
          path: cwd,
          type: 'file',
          ext: 'py' });
        
        return commands.execute('docmanager:open', {
          path: model.path,
          factory: FACTORY
        });
      }
    });

    if (launcher) {
      launcher.add({
        command,
        category: 'Extension Examples',
        rank: 1
      });
    }

    if (palette) {
      palette.addItem({
        command,
        args: { isPalette: true },
        category: PALETTE_CATEGORY
      });
    }

    if (menu) {
      menu.fileMenu.newMenu.addGroup([{ command }], 30);
    }
  }
};

export default extension;
