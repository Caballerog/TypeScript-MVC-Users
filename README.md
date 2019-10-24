
# [Read the tutorial](https://carloscaballer.io/understanding-mvc-for-frontend-typescript)

# Introduction

This post is the second in a series of three posts to understand how the MVC architecture works to create frontend applications. The objective is to comprehend the way to structure a frontend application by evolving a web page in which JavaScript is used as a scripting language towards an application in which JavaScript/TypeScript is used as an object-oriented language.

In this second post, the application will be built using TypeScript from the first version. Therefore, this article is where the application will be migrated from VanillaJS to TypeScript. However, it is very important to understand how all the parts of the application are related and how it is structured.

Finally, in the last article, we will transform our code to integrate it with the Angular framework.

* [Part 1. Understanding MVC-Services for Frontend: VanillaJS](understanding-mvc-for-frontend-vanillajs)
* [Part 2. Understanding MVC-Services for Frontend: TypeScript](understanding-mvc-for-frontend-typescript)
* Part 3. Understanding MVC-Services for Frontend: Angular

---

# Project Architecture

There is nothing more valuable than an image to understand what we are going to build, there is a GIF below in which the application we are building is illustrated.

![demo](/content/images/2019/10/demo.gif)

This application can be built using a single TypeScript file which modifies the DOM of the document and performs all operations, but this is a strongly coupled code and is not what we intend to apply in this post.

What is the MVC architecture? MVC is an architecture with 3 layers / parts:

* **Models** - Manage the data of an application. The models will be anemic (they will lack functionalities) since they will be referred to the services.
* **Views** - A visual representation of the models.
* **Controllers** - Links between services and views.

Below, we show the file structure that we will have in our problem domain:

![folders](/content/images/2019/10/folders-typescript.png)

The ```index.html``` file will act as a canvas on which the entire application will be dynamically built using the ```root``` element. In addition, this file will act as a loader of all the files since they will be linked in the html file itself.

Finally, our file architecture is composed of the following TypeScript files:

* **user.model.ts** - The attributes (the model) of a user.
* **user.controller.ts** - The one in charge of joining the service and the view.
* **user.service.ts** - Manage all operations on users.
* **user.views.ts** - Responsible for refreshing and changing the display screen.

The HTML file is the one shown below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>User App</title>

    <link rel="stylesheet" href="css/style.min.css" />
  </head>

  <body>
    <div id="root"></div>
  </body>
  <script src="bundle.js"></script>
</html>
```

You can see that only one file called "bundle.js" has been linked, which will be generated after TypeScript transpilation to JavaScript and applying a minimized task.

Although we will not focus on the tools to build our application if we are going to show the **gulpfile** file that is responsible for performing all the transformation tasks of our project.

In this case we have decided to use the Gulp tool since it has years of experience giving extraordinary results. In case you want to go deeper into Gulp, I recommend that you look for information on its website since you can find a long list of plugins. In any case, if you know JavaScript, you will be able to read the code and you will almost perfectly understand the tasks that we perform. In our example we have used the **browserify** plugin to package, create the module system and perform TypeScript to JavaScript transpiling.

```typescript
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const rename = require('gulp-rename');
const { server, reload } = require('gulp-connect');

gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', gulp.series('browserify'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('css'));
});

gulp.task('html', function() {
  return gulp
    .src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task('css', function() {
  return gulp
    .src('src/**/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload());
});

gulp.task('images', function() {
  gulp.src('src/**/*.jpg').pipe(gulp.dest('dist'));
  return gulp.src('src/**/*.png').pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
  server({
    name: 'Dev Game',
    root: './dist',
    port: 5000,
    livereload: true,
  });
});

gulp.task('browserify', function() {
  return browserify({
    entries: './src/app.ts',
  })
    .plugin('tsify')
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task(
  'default',
  gulp.series(['browserify', 'html', 'css', 'images', gulp.parallel('serve', 'watch')]),
);

```

---

# Models (anemic)

The first built class in this example is the application model, ```user.model.ts```, which consists of the class attributes, and a private method that is generating random IDs (these id's could come from a database in the server).

The models will have the following fields:

* **id**. Unique value.
* **name**. The name of the users.
* **age**. The age of the users.
* **complete**. Boolean that lets you know whether we can cross the user off the list.

The **User class** has been typed using TypeScript. However, the User constructor receives a plain object that will be provided from LocalStorage or from the user data input through the form. This plain object must comply with the **UserDto** interface in such a way that any plain object cannot be instantiated but those that satisfy the defined interface.

The ```user.model.ts``` is shown below:

```typescript
/**
 * @class Model
 *
 * Manages the data of the application.
 */

export interface UserDto {
  name: string;
  age: string;
  complete: boolean;
}

export class User {
  public id: string;
  public name: string;
  public age: string;
  public complete: boolean;

  constructor(
    { name, age, complete }: UserDto = {
      name: null,
      age: null,
      complete: false
    }
  ) {
    this.id = this.uuidv4();
    this.name = name;
    this.age = age;
    this.complete = complete;
  }

  uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: number) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
}
```

---

# Services

The operations performed on users are carried out in the service. The service is what allows the models to be anemic, since all the logic load is in them. In this specific case, we will use an array to store all users and build the four methods associated with reading, modifying, creating and deleting (CRUD) users. You should note that the service makes use of the model, instantiating the objects that are extracted from ```LocalStorage``` to the ```User class```. This is because ```LocalStorage``` only stores data and not prototypes of stored data. The same happens with the data that travels from the backend to the frontend, they do not have their classes instantiated.

The constructor of our class is as follows:

```typescript
constructor() {
  const users: UserDto[] = JSON.parse(localStorage.getItem('users')) || [];
  this.users = users.map(user => new User(user));
}
```

Note that we have defined a class variable called ```users``` that stores all users once they have been transformed from a plain object (**UserDto**) to a prototyped object of the ```User``` class.

The next thing we must define in the service will be each of the operations we want to develop. These operations are shown below using TypeScript:

```typescript
  add(user: User) {
    this.users.push(new User(user));

    this._commit(this.users);
  }

  edit(id: string, userToEdit: User) {
    this.users = this.users.map(user =>
      user.id === id
        ? new User({
            ...user,
            ...userToEdit
          })
        : user
    );

    this._commit(this.users);
  }

  delete(_id: string) {
    this.users = this.users.filter(({ id }) => id !== _id);

    this._commit(this.users);
  }

  toggle(_id: string) {
    this.users = this.users.map(user =>
      user.id === _id ? new User({ ...user, complete: !user.complete }) : user
    );

    this._commit(this.users);
  }
```

It remains to be defined the ```commit``` method that is responsible for storing the operation performed in our data store (in our case ```LocalStorage```).

```typescript
bindUserListChanged(callback: Function) {
  this.onUserListChanged = callback;
}

_commit(users: User[]) {
  this.onUserListChanged(users);
  localStorage.setItem('users', JSON.stringify(users));
}
```

This method invokes a ```callback``` function that has been binded when creating the Service, as it can be seen in the definition of the ```bindUserListChanged```` method. I can already tell you that this callback is the function that comes from the view and is responsible for refreshing the list of users on the screen.

The file ```user.service.ts``` is as follows:

```typescript
import { User, UserDto } from '../models/user.model';

/**
 * @class Service
 *
 * Manages the data of the application.
 */
export class UserService {
  public users: User[];
  private onUserListChanged: Function;

  constructor() {
    const users: UserDto[] = JSON.parse(localStorage.getItem('users')) || [];
    this.users = users.map(user => new User(user));
  }

  bindUserListChanged(callback: Function) {
    this.onUserListChanged = callback;
  }

  _commit(users: User[]) {
    this.onUserListChanged(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  add(user: User) {
    this.users.push(new User(user));

    this._commit(this.users);
  }

  edit(id: string, userToEdit: User) {
    this.users = this.users.map(user =>
      user.id === id
        ? new User({
            ...user,
            ...userToEdit
          })
        : user
    );

    this._commit(this.users);
  }

  delete(_id: string) {
    this.users = this.users.filter(({ id }) => id !== _id);

    this._commit(this.users);
  }

  toggle(_id: string) {
    this.users = this.users.map(user =>
      user.id === _id ? new User({ ...user, complete: !user.complete }) : user
    );

    this._commit(this.users);
  }
}
```

---

# Views

The view is the visual representation of the model. Instead of creating HTML content and injecting it (as it is done in many frameworks) we have decided to dynamically create the whole view. The first thing that should be done is to cache all the variables of the view through the DOM methods as shown in the view constructor:

```typescript
constructor() {
  this.app = this.getElement('#root');

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
  ```

The next most relevant point of the view is the union of the view with the service methods (which will be sent through the controller). For example, the ```bindAddUser``` method receives a driver function as a parameter that is the one that will perform the ```addUser``` operation, described in the service. In the ```bindXXX``` methods, the ```EventListener``` of each of the view controls are being defined. Note that from the view, we have access to all the data provided by the user from the screen; which are connected through the ```handler``` functions.

```typescript
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
```

The rest of the code of the view goes through handling the DOM of the document. The file ```user.view.ts``` is as follows:

```typescript
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
export class UserView {
  private app: HTMLElement;
  private form: HTMLElement;
  private submitButton: HTMLElement;
  private inputName: HTMLInputElement;
  private inputAge: HTMLInputElement;
  private title: HTMLElement;
  private userList: HTMLElement;
  private _temporaryAgeText: string;

  constructor() {
    this.app = this.getElement('#root');

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
    this[key] = this.createElement('input');
    this[key].type = type;
    this[key].placeholder = placeholder;
    this[key].name = name;
  }

  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
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
```

---

# Controllers

The last file of this architecture is the controller. The controller receives the two dependencies it has (service and view) by dependency injection (DI). Those dependencies are stored in the controller in private variables. In addition, the constructor makes the explicit connection between view and services since the controller is the only element that has access to both parties.

The file ```user.controller.ts``` is the one shown below:

```typescript
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserView } from '../views/user.view';

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
export class UserController {
  constructor(private userService: UserService, private userView: UserView) {
    // Explicit this binding
    this.userService.bindUserListChanged(this.onUserListChanged);
    this.userView.bindAddUser(this.handleAddUser);
    this.userView.bindEditUser(this.handleEditUser);
    this.userView.bindDeleteUser(this.handleDeleteUser);
    this.userView.bindToggleUser(this.handleToggleUser);

    // Display initial users
    this.onUserListChanged(this.userService.users);
  }

  onUserListChanged = (users: User[]) => {
    this.userView.displayUsers(users);
  };

  handleAddUser = (user: User) => {
    this.userService.add(user);
  };

  handleEditUser = (id: string, user: User) => {
    this.userService.edit(id, user);
  };

  handleDeleteUser = (id: string) => {
    this.userService.delete(id);
  };

  handleToggleUser = (id: string) => {
    this.userService.toggle(id);
  };
}
```

---

# App.ts

The last point of our application is the application launcher. In our case, we have called it ```app.ts```. The application is executed through the creation of the different elements: ```UserService```, ```UserView``` and ```UserController```, as shown in the file ```app.ts```.

```typescript
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserView } from './views/user.view';

const app = new UserController(new UserService(), new UserView());
```

---

# Conclusions

In this second post, we have developed a Web application in which the project has been structured following the MVC architecture in which anemic models are used and the responsibility for the logic lies on the services.

It is very important to highlight that the didactical of this post is to understand the structuring of the project in different files with different responsibilities and how the view is totally independent of the model/service and the controller.

It is also important to note that in this post, we have migrated the application from JavaScript to TypeScript, allowing us to obtain a typed code that helps the developer minimize errors and understand what each part of it does.

In the next post of this series, we will migrate the TypeScript code to Angular. This migration to a framework will mean that we do not have to deal with the complexity and repetitiveness of working with the DOM.
