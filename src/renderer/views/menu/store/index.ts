import { ipcRenderer } from 'electron';
import { observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  @observable
  public alwaysOnTop = false;

  public constructor() {
    super();
    ipcRenderer.on('visible', (e, flag) => {
      this.visible = flag;
    });
  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }
}

export default new Store();
