(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const challenge_controller_1 = require("./controllers/challenge.controller");
const challenge_service_1 = require("./services/challenge.service");
const challenge_view_1 = require("./views/challenge.view");
const login_view_1 = require("./views/login.view");
const signup_view_1 = require("./views/signup.view");
const user_service_1 = require("./services/user.service");
const signup_controller_1 = require("./controllers/signup.controller");
const home_view_1 = require("./views/home.view");
const game_view_1 = require("./views/game.view");
const game_service_1 = require("./services/game.service");
const game_controller_1 = require("./controllers/game.controller");
let app /* : BaseController */;
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');
switch (page) {
    case 'signup':
        app = new signup_controller_1.SignupController(new user_service_1.UserService(), new signup_view_1.SignupView());
        break;
    case 'home':
        app = new home_view_1.HomeView();
        break;
    case 'challenge':
        app = new challenge_controller_1.ChallengeController(new challenge_service_1.ChallengeService(), new challenge_view_1.ChallengeView());
        break;
    case 'game':
        app = new game_controller_1.GameController(new game_service_1.GameService(), new game_view_1.GameView());
        break;
    case 'demo':
        break;
    case 'login':
        app = new login_view_1.LoginView();
        break;
    default:
        const { origin, pathname } = location;
        // redirect bad/missing page params to login
        location.replace(origin + pathname + '?page=login');
        break;
}

},{"./controllers/challenge.controller":2,"./controllers/game.controller":3,"./controllers/signup.controller":4,"./services/challenge.service":8,"./services/game.service":9,"./services/user.service":10,"./views/challenge.view":13,"./views/game.view":14,"./views/home.view":15,"./views/login.view":16,"./views/signup.view":17}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class ChallengeController {
    constructor(userService, userView) {
        this.userService = userService;
        this.userView = userView;
        this.onUserListChanged = (users) => {
            this.userView.displayUsers(users);
        };
        this.handleAddUser = (user) => {
            this.userService.add(user);
        };
        this.handleEditUser = (id, user) => {
            this.userService.edit(id, user);
        };
        this.handleDeleteUser = (id) => {
            this.userService.delete(id);
        };
        this.handleToggleUser = (id) => {
            this.userService.toggle(id);
        };
        // Explicit this binding
        this.userService.bindUserListChanged(this.onUserListChanged);
        this.userView.bindAddUser(this.handleAddUser);
        this.userView.bindEditUser(this.handleEditUser);
        this.userView.bindDeleteUser(this.handleDeleteUser);
        this.userView.bindToggleUser(this.handleToggleUser);
        // Display initial users
        this.onUserListChanged(this.userService.users);
    }
}
exports.ChallengeController = ChallengeController;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_game_model_1 = require("../models/client.game.model");
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class GameController {
    // Use the constructor shortcut 'private' feature instead...
    //  private gameService : HandleMoveToken;
    constructor(gameService, gameView) {
        this.gameService = gameService;
        this.gameView = gameView;
        this.handleMoveToken = (tokenID, direction) => {
            this.gameService.moveToken(tokenID, direction);
        };
        // TODO: Study: Are constructor parameters added to 'this' class instance?
        client_game_model_1.locations.forEach((location) => {
            this.gameService.bindTokenLocationChanged(location, (tokens) => {
                this.gameView.display(location, tokens);
            });
        });
        // NOTE: Cannot directly call this.gameService.moveToken()
        // from here because context is NOT properly conveyed
        // to service method.  We MUST call handleMoveToken below.
        // (REVIEW: THIS PATTERN)
        this.gameView.bindMoveToken(this.handleMoveToken);
    }
}
exports.GameController = GameController;

},{"../models/client.game.model":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignupController {
    constructor(userService, signupView) {
        this.userService = userService;
        this.signupView = signupView;
        this.handleAddUser = (userInfo) => (this.userService.addUser(userInfo));
        this.signupView.bindAddUser(this.handleAddUser);
    }
}
exports.SignupController = SignupController;

},{}],5:[function(require,module,exports){
"use strict";
/**
 * @class Model
 *
 * Manages the data of the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../utils/util");
class Challenge {
    constructor({ name, winLossRecord, online } = {
        name: null,
        winLossRecord: null,
        online: false
    }) {
        this.id = util_1.uuidv4();
        this.name = name;
        this.winLossRecord = winLossRecord;
        this.online = online;
    }
}
exports.Challenge = Challenge;

},{"../utils/util":12}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = ['conveyor', 'token bank', 'code'];

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInfo {
    constructor(name, email, password, language = 'Javascript', online = true, wins = 0, losses = 0, avgScore = 0) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.language = language;
        this.online = online;
        this.wins = wins;
        this.losses = losses;
        this.avgScore = avgScore;
    }
}
exports.UserInfo = UserInfo;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const challenge_model_1 = require("../models/challenge.model");
/**
 * @class Service
 *
 * Manages the data of the application.
 */
class ChallengeService {
    constructor() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        this.users = users.map(user => new challenge_model_1.Challenge(user));
    }
    bindUserListChanged(callback) {
        this.onUserListChanged = callback;
    }
    _commit(users) {
        this.onUserListChanged(users);
        localStorage.setItem('users', JSON.stringify(users));
    }
    add(user) {
        this.users.push(new challenge_model_1.Challenge(user));
        this._commit(this.users);
    }
    edit(id, userToEdit) {
        let user = this.users
            .find(({ id: user_id }) => user_id === id);
        Object.assign(user, userToEdit);
        this._commit(this.users);
    }
    delete(_id) {
        this.users = this.users.filter(({ id }) => id !== _id);
        this._commit(this.users);
    }
    toggle(_id) {
        this.users = this.users.map(user => user.id === _id ? new challenge_model_1.Challenge(Object.assign(Object.assign({}, user), { online: !user.online })) : user);
        this._commit(this.users);
    }
}
exports.ChallengeService = ChallengeService;

},{"../models/challenge.model":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_game_model_1 = require("../models/client.game.model");
const Fetch_1 = require("../utils/Fetch");
/**
 * @class Service
 *
 * Manages the data of the application.
 */
class GameService {
    constructor() {
        this.tokens = {};
        this.tokenLocationArray = {};
        this.onTokenLocationChanged = {};
        // Initialize location arrays...
        client_game_model_1.locations.forEach((location) => {
            this.tokenLocationArray[location] = []; // initialize arrays
        });
        // Read exercise data from server and load it
        Fetch_1.Fetch('/token')
            .then(res => res && res.json())
            .then(this.loadExercise.bind(this));
    }
    loadExercise(exerciseTokens) {
        // Load all game tokens to
        // the central game token storage object
        // with a location setting of conveyor...
        this.tokens = exerciseTokens.reduce((result, exerciseToken, index) => {
            result[exerciseToken.id]
                = Object.assign(Object.assign({}, exerciseToken), { location: 'conveyor' });
            return result;
        }, {});
        this.refreshLocationArrays();
        this.commit(client_game_model_1.locations);
    }
    bindTokenLocationChanged(tokenLocation, callback) {
        this.onTokenLocationChanged[tokenLocation] = callback;
        // Trigger view refresh on bind
        this.commit([tokenLocation]);
    }
    refreshLocationArrays() {
        let allIDsToProcess = new Set(Object.keys(this.tokens));
        // Remove any location array entries that have moved
        client_game_model_1.locations.forEach((location) => {
            // Check existing entries for removal or confirmation
            [...this.tokenLocationArray[location]].forEach((tokenID, index) => {
                if (this.tokens[tokenID].location === location) {
                    // Token is confirmed in proper location, so do nothing 
                    // except remove from to-process set
                    if (!allIDsToProcess.delete(tokenID))
                        // Hopefully the following will never occur,
                        // even though our algorithm is 'self healing' in that
                        // it guarantees we will be restored to a valid state.
                        alert(`Assertion that tokens should be in only one location FAILED for id ${tokenID}!`);
                }
                else {
                    // Token must have moved, so remove from this (obsolete) location
                    console.log(`--- location: ${location}`);
                    console.log(this.tokenLocationArray[location].join());
                    this.tokenLocationArray[location].splice(index, 1);
                    console.log(this.tokenLocationArray[location].join());
                }
            });
        });
        // Add any unconfirmed IDs to their proper location arrays (append to end)
        allIDsToProcess.forEach((tokenID) => {
            this.tokenLocationArray[this.tokens[tokenID].location].push(tokenID);
            // allIDsToProcess.delete(tokenID); -- not needed since we process all, and we are done
        });
    }
    moveToken(tokenID, direction) {
        const oldLocation = this.tokens[tokenID].location;
        let newPos = client_game_model_1.locations.indexOf(oldLocation) + direction;
        // Check boundaries
        if (newPos < 0 || newPos >= client_game_model_1.locations.length)
            //      alert('Assertion FAILED that tokens not be moved beyond location positions'
            //      +` 0, 1, and 2; tried to move token ID ${tokenID} to position #${newPos}`);
            newPos = client_game_model_1.locations.indexOf(oldLocation) - direction; // help w/ testing...
        //    else { ...
        // Boundary checks out OK, proceed to move
        const newLocation = client_game_model_1.locations[newPos];
        // alert(`tokenID=${tokenID}, direction=${direction}, from=${oldLocation} to ${newLocation}`);
        this.tokens[tokenID].location = newLocation;
        this.refreshLocationArrays();
        this.commit([oldLocation, newLocation]);
        //    } ...
        return;
    }
    commit(locations) {
        locations.forEach((location) => {
            this.onTokenLocationChanged[location](this.tokenLocationArray[location].map(tokenID => this.tokens[tokenID]));
        });
    }
}
exports.GameService = GameService;

},{"../models/client.game.model":6,"../utils/Fetch":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fetch_1 = require("../utils/Fetch");
class UserService {
    addUser(userInfo) {
        return Fetch_1.Fetch('/user', {
            method: 'POST',
            body: JSON.stringify(userInfo)
        })
            .then(res => res && res.json());
    }
}
exports.UserService = UserService;

},{"../utils/Fetch":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = (resource, init = { method: 'GET' }, defaultMessage = true) => {
    let _init = Object.assign({}, init);
    _init.headers = _init.headers || {};
    _init.headers['Content-Type'] = _init.headers['Content-Type'] || 'application/json; charset=utf-8';
    return new Promise((resolve, reject) => {
        return fetch(resource, _init)
            .then(res => {
            if (res.status >= 400 /* Http error response range */) {
                if (defaultMessage)
                    alert(`Error fetching resource ${resource}: ${res.statusText}`);
                reject(res.statusText);
            }
            else
                resolve(res);
        })
            .catch((error) => {
            if (error)
                alert(error);
            else if (defaultMessage)
                console.warn(`Fetch exception with no error message`);
            reject(error);
        });
    });
};

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
};

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChallengeView {
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
            placeholder: 'Win / Loss',
            name: 'winLossRecord'
        });
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.gameOnButton = this.createElement('button');
        this.gameOnButton.textContent = 'Game On!';
        this.form.append(this.inputName, this.inputWinLossRecord, this.submitButton, this.gameOnButton);
        this.gameOnButton.addEventListener('click', event => {
            const { origin, pathname } = location;
            location.replace(origin + pathname + '?page=game');
        });
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
    createInput({ key, type, placeholder, name } = {
        key: 'default',
        type: 'text',
        placeholder: 'default',
        name: 'default'
    }) {
        this[key] =
            Object.assign(this.createElement('input'), { type, placeholder, name });
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    displayUsers(users) {
        // Delete all nodes
        while (this.userList.firstChild) {
            this.userList.removeChild(this.userList.firstChild);
        }
        // Show default message
        if (users.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a user?';
            this.userList.append(p);
        }
        else {
            // Create nodes
            users.forEach(user => {
                const li = this.createElement('li');
                li.id = user.id;
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = user.online;
                const spanUser = this.createElement('span');
                const spanAge = this.createElement('span');
                spanAge.contentEditable = 'true';
                spanAge.classList.add('editable');
                if (user.online) {
                    const strikeName = this.createElement('s');
                    strikeName.textContent = user.name;
                    spanUser.append(strikeName);
                    const strikeAge = this.createElement('s');
                    strikeAge.textContent = user.winLossRecord;
                    spanAge.append(strikeAge);
                }
                else {
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
            if (event.target.className === 'editable') {
                this._temporaryWinLossText = event.target.innerText;
            }
        });
    }
    bindAddUser(handler) {
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
    bindDeleteUser(handler) {
        this.userList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
    bindEditUser(handler) {
        this.userList.addEventListener('focusout', event => {
            if (this._temporaryWinLossText) {
                const id = event.target.parentElement.id;
                const key = 'winLossRecord';
                handler(id, { [key]: this._temporaryWinLossText });
                this._temporaryWinLossText = '';
            }
        });
    }
    bindToggleUser(handler) {
        this.userList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
}
exports.ChallengeView = ChallengeView;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_game_model_1 = require("../models/client.game.model");
class GameView {
    constructor() {
        this.ulTokens = {};
        this.app = document.getElementById('root');
        const html = `
            <div class='game-page'>
                <div class='flex5'>
                    <div id='prompt'>PROMPT: Write a program to print out 10 numbers</div>
                    <div id='language'>Javascript</div>                    
                    <div id='timer'>TIMER &nbsp;<b>3:07</b></div>
                </div>
                <div class='conveyor-container'>
                    <ul id='conveyor' />
                </div>
                <div class='flex2'>
                    <div class='flex3'>
                        <div class='code-editor'>
                            <ul id='code' />
                        </div>
                        <div id='label'>Token Bank</div>
                        <div class='token-container'>
                            <ul id='token_bank' />
                        </div> 
                    </div>
                    <div class='flex4'>
                        <div class="stats-container">
                            <div class='flex9'>
                            <div id='stats'><b>MY STATS</b><br><BR>CREDIT: $5.12<br>TOKENS PLACED: 9<BR>LINES OF CODE: 2<BR>AVG COST PER LINE: $0.85<br>SUBMIT ATTEMPTS: 0</div>
                            </div>
                            <div class='flex9'>
                            <div id='stats'><b>OPPONENT STATS</b><br><BR>CREDIT: $4.78<br>TOKENS PLACED: 12<BR>LINES OF CODE: 3<BR>AVG COST PER LINE: $0.72<br>SUBMIT ATTEMPTS: 1</div>
                            </div>
                        </div>
                        <div class='opponentCode'>
                        </div>

                        <button id="myBtn"><div class='submitButton'><div class='submit'>SUBMIT CODE</div>
                        </div></button>
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>YOU WIN!</p>
                            </div>
                        </div>

                        <div class='flex6'>
                            <div class='flex7'>
                                <div id='label'>Return Token</div>
                                <div class='sellBack'>
                                </div>
                            </div>
                            <div class='flex8'>
                                <div id='label2'>Budget</div>                            
                                <div class='credit'><br><br>CREDIT<br>$ 5.12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        `;
        this.app.innerHTML = html;
        //POP UP CODE START:
        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close");
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        };
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        //END POP UP CODE.
        client_game_model_1.locations.forEach((location) => {
            this.ulTokens[location]
                = document.getElementById(location.replace(' ', '_') // spaces not valid in HTML IDs
                );
        });
    }
    bindMoveToken(handler) {
        client_game_model_1.locations.forEach((location) => {
            this.ulTokens[location].addEventListener('click', event => {
                handler(event.target.id, 1);
            });
        });
    }
    display(location, tokens) {
        // clear any prior tokens
        this.ulTokens[location].innerText = '';
        let indentationLevel = 0;
        tokens.forEach((token) => {
            const li = document.createElement('li');
            li.id = token.id;
            li.innerHTML = token.token;
            li.classList.add(token.type);
            switch (token.token) {
                case '{':
                    indentationLevel++;
                    li.classList.add('open-curly-bracket');
                    break;
                case '}':
                    indentationLevel--;
                    li.classList.add('close-curly-bracket');
                    break;
            }
            li.classList.add('indent-' + indentationLevel.toString());
            this.ulTokens[location].appendChild(li);
        });
    }
}
exports.GameView = GameView;

},{"../models/client.game.model":6}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeView {
    constructor() {
        this.app = document.getElementById('root');
        const html = `
        <div class='formCenter'>
            <form id='homePage' method='post'>
                <div class = 'box'>
                    <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
                    <h1>Code Blitz</h1>
                    <div>
                        <button id='challenge' type='submit'>Challenge</button>
                        <button id='singlePlay' type='submit'>Single Play</button>
                    </div> 
                </div>
            </form>
        </div>
        `;
        this.app.innerHTML = html;
        document.getElementById('homePage')
            .addEventListener('submit', event => {
            //event.preventDefault(); -- actually post is handy, no need for ajax call
            const { origin, pathname } = location;
            setTimeout(() => {
                // timeout is temporary hack pending server auth implementation
                location.replace(origin + pathname + '?page=challenge');
            });
        });
        document.getElementById('singlePlay')
            .addEventListener('click', event => {
            alert('not yet implemented');
        });
        //    this._temporaryAgeText = '';
        //    this._initLocalListeners();
    }
}
exports.HomeView = HomeView;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginView {
    constructor() {
        this.app = document.getElementById('root');
        const html = `
        <div class='formCenter'>
            <form id='loginForm' method='post'>
                <div class = 'box'>
                    <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
                    <h1>Code Blitz</h1>
                    <div>
                        <img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/mail-icon.png" alt="Mail Icon" width="20" height="20">
                        <input name='email' type='text' placeholder='Email' />
                    </div>
                    <div>
                        <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/lock-24-512.png" alt="Lock Icon" width="20" height="20">
                        <input name='password' type='password' placeholder='Password' />
                    </div>
                    <div>
                        <button type='submit'>Sign In</button>
                    </div>
                    <div>
                        <p> Don't have an account? 
                        <a href="?page=signup" target ="_top" >Create an account</a>
                    </div>
                </div>
            </form>
        </div>
        `;
        this.app.innerHTML = html;
        document.getElementById('loginForm')
            .addEventListener('submit', event => {
            //event.preventDefault(); -- actually post is handy, no need for ajax call
            const { origin, pathname } = location;
            setTimeout(() => {
                // timeout is temporary hack pending server auth implementation
                location.replace(origin + pathname + '?page=signup');
            });
        });
        //    this._t emporaryAgeText = '';
        //    this._initLocalListeners();
    }
}
exports.LoginView = LoginView;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class SignupView {
    constructor() {
        this.app = document.getElementById('root');
        const html = `
            <div class='formCenter'>
                <form id='Signup'>
                    <div class = 'box'>
                        <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
                        <h1>Code Blitz Signup</h1>
                        <div>
                            <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png" alt="user Icon" width="20" height="20">
                            <input name='name' type='text' placeholder='Name' />            
                        </div>
                        <div>
                            <img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/mail-icon.png" alt="Mail Icon" width="20" height="20">
                            <input name='email' type='text' placeholder='Email' />
                        </div>
                        <div>
                            <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/lock-24-512.png" alt="Lock Icon" width="20" height="20">
                            <input name='password' type='password' placeholder='Password' />
                        </div>
                        <div>
                            <button type='submit'>Let's Code!</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
        this.app.innerHTML = html;
    }
    bindAddUser(handler) {
        document.getElementById('Signup')
            .addEventListener('submit', event => {
            event.preventDefault();
            const { origin, pathname } = location;
            const fields = document.forms['Signup'].elements;
            alert(JSON.stringify(document.forms['Signup'].elements[1].value));
            handler(new user_model_1.UserInfo(fields[0].value, // name
            fields[1].value, // email
            fields[2].value // password
            )).then(res => {
                alert(JSON.stringify(res));
                location.replace(origin + pathname + '?page=home&_id=' + res._id);
            });
        });
    }
}
exports.SignupView = SignupView;

},{"../models/user.model":7}]},{},[1]);

//# sourceMappingURL=bundle.js.map
