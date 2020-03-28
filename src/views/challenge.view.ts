import { Challenge } from '../models/challenge.model';

/**
 * @class View
 *
 * Visual representation of the model.
 */

interface Input {
  key: string;
  type: string;
  placeholder: string;
  name: string;
}
export class ChallengeView {
  private app: HTMLElement;
  private form: HTMLElement;
  private submitButton: HTMLElement;
  private inputName: HTMLInputElement;
  private inputWinLossRecord: HTMLInputElement;
  private title: HTMLElement;
  private userList: HTMLElement;
  private _temporaryWinLossText: string;

  constructor() {
    this.app = document.querySelector('#root');

    this.form = this.createElement('form');
    this.createInput({
      key: 'inputName',
      type: 'text',
      placeholder: 'Name',
      name: 'name'
    });
    this.createInput({
      key: 'inputWinLossRecord',
      type: 'text',
      placeholder: 'Win/Loss',
      name: 'winLossRecord'
    });

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.form.append(this.inputName, this.inputWinLossRecord, this.submitButton);

    this.title = this.createElement('h1');
    this.title.textContent = 'Challenge';
    this.userList = this.createElement('ul', 'user-list');
    this.app.append(this.title, this.form, this.userList);

    this._temporaryWinLossText = '';
    this._initLocalListeners();
  }

  get _nameText() {
    return this.inputName.value;
  }
  get _winLossRecordText() {
    return this.inputWinLossRecord.value;
  }

  _resetInput() {
    this.inputName.value = '';
    this.inputWinLossRecord.value = '';
  }

  createInput(
    { key, type, placeholder, name }: Input = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default'
    }
  ) {
    this[key] = 
    Object.assign(this.createElement('input'), { type, placeholder, name });
  }

  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  displayUsers(users: Challenge[]) {
    // Delete all nodes
    while (this.userList.firstChild) {
      this.userList.removeChild(this.userList.firstChild);
    }

    // Show default message
    if (users.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a user?';
      this.userList.append(p);
    } else {
      // Create nodes
      users.forEach(user => {
        const li = this.createElement('li');
        li.id = user.id;

        const checkbox = this.createElement('input') as HTMLInputElement;
        checkbox.type = 'checkbox';
        checkbox.checked = user.online;

        const spanUser = this.createElement('span');

        const spanAge = this.createElement('span') as HTMLInputElement;
        spanAge.contentEditable = 'true';
        spanAge.classList.add('editable');

        if (user.online) {
          const strikeName = this.createElement('s');
          strikeName.textContent = user.name;
          spanUser.append(strikeName);

          const strikeAge = this.createElement('s');
          strikeAge.textContent = user.winLossRecord;
          spanAge.append(strikeAge);
        } else {
          spanUser.textContent = user.name;
          spanAge.textContent = user.winLossRecord;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, spanUser, spanAge, deleteButton);

        // Append nodes
        this.userList.append(li);
      });
    }
  }

  _initLocalListeners() {
    this.userList.addEventListener('input', event => {
      if ((event.target as any).className === 'editable') {
        this._temporaryWinLossText = (event.target as any).innerText;
      }
    });
  }

  bindAddUser(handler: Function) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this._nameText) {
        handler({
          name: this._nameText,
          winLossRecord: this._winLossRecordText
        });
        this._resetInput();
      }
    });
  }

  bindDeleteUser(handler: Function) {
    this.userList.addEventListener('click', event => {
      if ((event.target as any).className === 'delete') {
        const id = (event.target as any).parentElement.id;

        handler(id);
      }
    });
  }

  bindEditUser(handler: Function) {
    this.userList.addEventListener('focusout', event => {
      if (this._temporaryWinLossText) {
        const id = (event.target as any).parentElement.id;
        const key = 'winLossRecord';

        handler(id, { [key]: this._temporaryWinLossText });
        this._temporaryWinLossText = '';
      }
    });
  }

  bindToggleUser(handler: Function) {
    this.userList.addEventListener('change', event => {
      if ((event.target as any).type === 'checkbox') {
        const id = (event.target as any).parentElement.id;

        handler(id);
      }
    });
  }
}
