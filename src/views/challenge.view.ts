import { User } from '../models/user.model';

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
  private inputAge: HTMLInputElement;
  private title: HTMLElement;
  private userList: HTMLElement;
  private _temporaryAgeText: string;

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
      key: 'inputAge',
      type: 'text',
      placeholder: 'Age',
      name: 'age'
    });

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.form.append(this.inputName, this.inputAge, this.submitButton);

    this.title = this.createElement('h1');
    this.title.textContent = 'Users';
    this.userList = this.createElement('ul', 'user-list');
    this.app.append(this.title, this.form, this.userList);

    this._temporaryAgeText = '';
    this._initLocalListeners();
  }

  get _nameText() {
    return this.inputName.value;
  }
  get _ageText() {
    return this.inputAge.value;
  }

  _resetInput() {
    this.inputName.value = '';
    this.inputAge.value = '';
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

  displayUsers(users: User[]) {
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
        checkbox.checked = user.complete;

        const spanUser = this.createElement('span');

        const spanAge = this.createElement('span') as HTMLInputElement;
        spanAge.contentEditable = 'true';
        spanAge.classList.add('editable');

        if (user.complete) {
          const strikeName = this.createElement('s');
          strikeName.textContent = user.name;
          spanUser.append(strikeName);

          const strikeAge = this.createElement('s');
          strikeAge.textContent = user.age;
          spanAge.append(strikeAge);
        } else {
          spanUser.textContent = user.name;
          spanAge.textContent = user.age;
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
        this._temporaryAgeText = (event.target as any).innerText;
      }
    });
  }

  bindAddUser(handler: Function) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this._nameText) {
        handler({
          name: this._nameText,
          age: this._ageText
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
      if (this._temporaryAgeText) {
        const id = (event.target as any).parentElement.id;
        const key = 'age';

        handler(id, { [key]: this._temporaryAgeText });
        this._temporaryAgeText = '';
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
