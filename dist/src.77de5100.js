// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"interface.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionWorker = void 0;
var ActionWorker;

(function (ActionWorker) {
  ActionWorker[ActionWorker["save"] = 0] = "save";
  ActionWorker[ActionWorker["remove"] = 1] = "remove";
})(ActionWorker = exports.ActionWorker || (exports.ActionWorker = {}));
},{}],"midi.ts":[function(require,module,exports) {
"use strict"; // import { event, eventKey } from './event';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMIDI = exports.midi = void 0; // export function addListenerMidiSuccess(
//     fn: (midiAccess: WebMidi.MIDIAccess) => void,
// ) {
//     event.addListener(eventKey.onMIDISuccess, fn);
// }

function onMIDISuccess(midiAccess) {
  exports.midi = midiAccess; // event.emit(eventKey.onMIDISuccess, midi);

  exports.midi.inputs.forEach(function (midiInput) {
    console.log('midiInput', midiInput.name, midiInput);
    midiInput.onmidimessage = onMIDIMessage;
  });
} // export function addListenerMidiError(fn: (error: any) => void) {
//     event.addListener(eventKey.onMIDIError, fn);
// }


function onMIDIError(error) {
  // event.emit(eventKey.onMIDIError, error);
  console.error("No access to MIDI devices or your browser doesn't support WebMIDI API.", error);
}

function onMIDIMessage(_a) {
  var data = _a.data; // console.log('MIDI data', data);
}

function initMIDI() {
  if (!navigator.requestMIDIAccess) {
    onMIDIError(new Error('This browser does not support MIDIAccess'));
  } else {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIError);
  }
}

exports.initMIDI = initMIDI;
},{}],"../node_modules/async-jsx-html/nodejs/constants.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_TYPE = void 0;
var NODE_TYPE;
(function (NODE_TYPE) {
    NODE_TYPE["ELEMENT"] = "element";
    NODE_TYPE["TEXT"] = "text";
    NODE_TYPE["COMPONENT"] = "component";
    NODE_TYPE["FRAGMENT"] = "fragment";
})(NODE_TYPE = exports.NODE_TYPE || (exports.NODE_TYPE = {}));
;

},{}],"../node_modules/async-jsx-html/nodejs/node/utils/htmlEncode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlEncode = exports.doubleQuoteEncode = void 0;
function doubleQuoteEncode(text) {
    return text.replace(/"/g, '&quot;');
}
exports.doubleQuoteEncode = doubleQuoteEncode;
function htmlEncode(text) {
    return doubleQuoteEncode(text.replace(/&/g, '&amp;').replace(/\//g, '&#x2F;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;'));
}
exports.htmlEncode = htmlEncode;

},{}],"../node_modules/async-jsx-html/nodejs/node/TextNode.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextNode = void 0;
const constants_1 = require("../constants");
const htmlEncode_1 = require("./utils/htmlEncode");
class TextNode {
    constructor(text) {
        this.text = text;
        this.type = constants_1.NODE_TYPE.TEXT;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            return htmlEncode_1.htmlEncode(this.text);
        });
    }
}
exports.TextNode = TextNode;

},{"../constants":"../node_modules/async-jsx-html/nodejs/constants.js","./utils/htmlEncode":"../node_modules/async-jsx-html/nodejs/node/utils/htmlEncode.js"}],"../node_modules/async-jsx-html/nodejs/node/utils/normalizeChildren.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeChildren = void 0;
const TextNode_1 = require("../TextNode");
const constants_1 = require("../../constants");
function normalizeChildren(children) {
    const result = [];
    for (const child of children) {
        if (child && typeof child !== 'boolean') {
            if (typeof child === 'string' || typeof child === 'number') {
                result.push(new TextNode_1.TextNode(`${child}`));
            }
            else if (Array.isArray(child)) {
                normalizeChildren(child).forEach(normalized => result.push(normalized));
            }
            else if (child.type === constants_1.NODE_TYPE.ELEMENT || child.type === constants_1.NODE_TYPE.TEXT || child.type === constants_1.NODE_TYPE.COMPONENT) {
                result.push(child);
            }
            else {
                throw new TypeError(`Unrecognized node type: ${typeof child}`);
            }
        }
    }
    return result;
}
exports.normalizeChildren = normalizeChildren;

},{"../TextNode":"../node_modules/async-jsx-html/nodejs/node/TextNode.js","../../constants":"../node_modules/async-jsx-html/nodejs/constants.js"}],"../node_modules/async-jsx-html/nodejs/node/Node.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const normalizeChildren_1 = require("./utils/normalizeChildren");
class Node {
    constructor(children) {
        this.children = children;
    }
    renderChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const children = normalizeChildren_1.normalizeChildren(this.children);
            for (const child of children) {
                const renderedChild = yield child.render();
                if (renderedChild) {
                    if (Array.isArray(renderedChild)) {
                        renderedChild.forEach(subchild => subchild && result.push(subchild));
                    }
                    else {
                        result.push(renderedChild);
                    }
                }
            }
            return result;
        });
    }
}
exports.Node = Node;

},{"./utils/normalizeChildren":"../node_modules/async-jsx-html/nodejs/node/utils/normalizeChildren.js"}],"../node_modules/async-jsx-html/nodejs/node/ElementNode.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementNode = void 0;
const constants_1 = require("../constants");
const Node_1 = require("./Node");
const htmlEncode_1 = require("./utils/htmlEncode");
const ELEMENT_PROP = {
    INNER_HTML: 'innerHTML'
};
const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
class ElementNode extends Node_1.Node {
    constructor(name, props, children) {
        super(children);
        this.name = name;
        this.props = props;
        this.type = constants_1.NODE_TYPE.ELEMENT;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const renderedProps = this.propsToHTML();
            const renderedChildren = typeof this.props[ELEMENT_PROP.INNER_HTML] === 'string' ? this.props[ELEMENT_PROP.INNER_HTML] : (yield this.renderChildren()).join('');
            return renderedChildren || !VOID_ELEMENTS.has(this.name) ? `<${this.name}${renderedProps}>${renderedChildren || ''}</${this.name}>` : `<${this.name}${renderedProps} />`;
        });
    }
    getValidProps() {
        const props = this.props;
        return Object.keys(this.props).filter(key => {
            if (key === ELEMENT_PROP.INNER_HTML) {
                return false;
            }
            const val = props[key];
            return typeof val === 'string' || typeof val === 'number' || val === true;
        });
    }
    propsToHTML() {
        const keys = this.getValidProps();
        if (!keys.length) {
            return '';
        }
        const props = this.props;
        const pairs = keys.map(key => {
            if (!/^[a-zA-Z0-9-:\._]+$/.test(key)) {
                throw new Error(`Invalid attribute name format ${key}`);
            }
            const val = props[key];
            return val === true || val === '' ? key : `${key}="${htmlEncode_1.doubleQuoteEncode(val.toString())}"`;
        });
        return ` ${pairs.join(' ')}`;
    }
}
exports.ElementNode = ElementNode;

},{"../constants":"../node_modules/async-jsx-html/nodejs/constants.js","./Node":"../node_modules/async-jsx-html/nodejs/node/Node.js","./utils/htmlEncode":"../node_modules/async-jsx-html/nodejs/node/utils/htmlEncode.js"}],"../node_modules/async-jsx-html/nodejs/node/FragmentNode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FragmentNode = void 0;
const constants_1 = require("../constants");
const Node_1 = require("./Node");
class FragmentNode extends Node_1.Node {
    constructor(children) {
        super(children);
        this.type = constants_1.NODE_TYPE.FRAGMENT;
    }
    render() {
        return this.renderChildren();
    }
}
exports.FragmentNode = FragmentNode;

},{"../constants":"../node_modules/async-jsx-html/nodejs/constants.js","./Node":"../node_modules/async-jsx-html/nodejs/node/Node.js"}],"../node_modules/async-jsx-html/nodejs/node/ComponentNode.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentNode = void 0;
const constants_1 = require("../constants");
const FragmentNode_1 = require("./FragmentNode");
const Node_1 = require("./Node");
const normalizeChildren_1 = require("./utils/normalizeChildren");
class ComponentNode extends Node_1.Node {
    constructor(component, props, children) {
        super(children);
        this.component = component;
        this.props = props;
        this.type = constants_1.NODE_TYPE.COMPONENT;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            return [].concat(yield this.renderComponent()).join('');
        });
    }
    renderComponent() {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield this.component(this.props, this.children);
            const children = normalizeChildren_1.normalizeChildren(Array.isArray(child) ? child : [child]);
            if (children.length === 1) {
                return children[0].render();
            }
            else if (children.length > 1) {
                return new FragmentNode_1.FragmentNode(children).render();
            }
        });
    }
}
exports.ComponentNode = ComponentNode;

},{"../constants":"../node_modules/async-jsx-html/nodejs/constants.js","./FragmentNode":"../node_modules/async-jsx-html/nodejs/node/FragmentNode.js","./Node":"../node_modules/async-jsx-html/nodejs/node/Node.js","./utils/normalizeChildren":"../node_modules/async-jsx-html/nodejs/node/utils/normalizeChildren.js"}],"../node_modules/async-jsx-html/nodejs/jsx.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = exports.jsx = void 0;
const ElementNode_1 = require("./node/ElementNode");
const ComponentNode_1 = require("./node/ComponentNode");
exports.jsx = (element, props, ...children) => {
    const nodeProps = props || {};
    if (typeof element === 'string') {
        return new ElementNode_1.ElementNode(element, nodeProps, children);
    }
    if (typeof element === 'function') {
        return new ComponentNode_1.ComponentNode(element, nodeProps, children);
    }
    throw new TypeError(`Expected jsx element to be a string or a function`);
};
exports.Fragment = (props, children) => {
    return children;
};

},{"./node/ElementNode":"../node_modules/async-jsx-html/nodejs/node/ElementNode.js","./node/ComponentNode":"../node_modules/async-jsx-html/nodejs/node/ComponentNode.js"}],"../node_modules/async-jsx-html/nodejs/mod.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.React = exports.Fragment = exports.jsx = void 0;
const jsx_1 = require("./jsx");
Object.defineProperty(exports, "jsx", { enumerable: true, get: function () { return jsx_1.jsx; } });
Object.defineProperty(exports, "Fragment", { enumerable: true, get: function () { return jsx_1.Fragment; } });
var ElementNode_1 = require("./node/ElementNode");
Object.defineProperty(exports, "ElementNode", { enumerable: true, get: function () { return ElementNode_1.ElementNode; } });
var ComponentNode_1 = require("./node/ComponentNode");
Object.defineProperty(exports, "ComponentNode", { enumerable: true, get: function () { return ComponentNode_1.ComponentNode; } });
exports.React = {
    Fragment: jsx_1.Fragment,
    createElement(element, props, ...children) {
        return jsx_1.jsx(element, Object.assign(Object.assign({}, props), { children }), ...children);
    }
};
exports.default = exports.React;

},{"./jsx":"../node_modules/async-jsx-html/nodejs/jsx.js","./node/ElementNode":"../node_modules/async-jsx-html/nodejs/node/ElementNode.js","./node/ComponentNode":"../node_modules/async-jsx-html/nodejs/node/ComponentNode.js"}],"icons/eye-off-outline.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeOffOutline = void 0;

var async_jsx_html_1 = require("async-jsx-html");

var React = async_jsx_html_1.React;

function EyeOffOutline(_a) {
  var style = _a.style,
      id = _a.id,
      classnames = _a.classnames;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    style: style,
    id: id,
    class: classnames
  }, /*#__PURE__*/React.createElement("title", null, "Eye Off yoyo"), /*#__PURE__*/React.createElement("path", {
    d: "M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"
  }));
}

exports.EyeOffOutline = EyeOffOutline;
},{"async-jsx-html":"../node_modules/async-jsx-html/nodejs/mod.js"}],"icons/eye-outline.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeOutline = void 0;

var async_jsx_html_1 = require("async-jsx-html");

var React = async_jsx_html_1.React;

function EyeOutline(_a) {
  var style = _a.style,
      id = _a.id,
      classnames = _a.classnames;
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    style: style,
    id: id,
    class: classnames
  }, /*#__PURE__*/React.createElement("title", null, "Eye"), /*#__PURE__*/React.createElement("path", {
    d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z",
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "32"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "80",
    fill: "none",
    stroke: "currentColor",
    "stroke-miterlimit": "10",
    "stroke-width": "32"
  }));
}

exports.EyeOutline = EyeOutline;
},{"async-jsx-html":"../node_modules/async-jsx-html/nodejs/mod.js"}],"view/Settings/GithubTokenInfo.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GithubTokenInfo = void 0;

var async_jsx_html_1 = require("async-jsx-html");

var React = async_jsx_html_1.React;

var GithubTokenInfo = function GithubTokenInfo() {
  return /*#__PURE__*/React.createElement("div", {
    class: "info"
  }, /*#__PURE__*/React.createElement("p", null, "To save data in your GitHub repository, we need to provide a", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://developer.github.com/v3/auth/#via-oauth-and-personal-access-tokens",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "personal access tokens"), ' ', "to the", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://developer.github.com/v3/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "GitHub API"), ". To", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "create a token"), ", go in developer settings, personal access tokens and then generate new token. In most of the case you will only need to give permission for public_repo."));
};

exports.GithubTokenInfo = GithubTokenInfo;
},{"async-jsx-html":"../node_modules/async-jsx-html/nodejs/mod.js"}],"storage/localStorage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeGithubToken = exports.storeGithubRepo = exports.storeGithubUser = exports.getGithubToken = exports.getGithubRepo = exports.getGithubUser = void 0;
var githubStorageKeys;

(function (githubStorageKeys) {
  githubStorageKeys["githubUser"] = "githubUser";
  githubStorageKeys["githubToken"] = "githubToken";
  githubStorageKeys["githubRepo"] = "githubRepo";
})(githubStorageKeys || (githubStorageKeys = {}));

function store(key, value) {
  window.localStorage.setItem(key, value);
}

function get(key) {
  return window.localStorage.getItem(key);
}

function getGithubUser() {
  return get(githubStorageKeys.githubUser) || '';
}

exports.getGithubUser = getGithubUser;

function getGithubRepo() {
  return get(githubStorageKeys.githubRepo) || '';
}

exports.getGithubRepo = getGithubRepo;

function getGithubToken() {
  return get(githubStorageKeys.githubToken) || '';
}

exports.getGithubToken = getGithubToken;

function storeGithubUser(val) {
  store(githubStorageKeys.githubUser, val);
}

exports.storeGithubUser = storeGithubUser;

function storeGithubRepo(val) {
  store(githubStorageKeys.githubRepo, val);
}

exports.storeGithubRepo = storeGithubRepo;

function storeGithubToken(val) {
  store(githubStorageKeys.githubToken, val);
}

exports.storeGithubToken = storeGithubToken;
},{}],"view/Settings/Settings.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;

var async_jsx_html_1 = require("async-jsx-html");

var eye_off_outline_1 = require("../../icons/eye-off-outline");

var eye_outline_1 = require("../../icons/eye-outline");

var GithubTokenInfo_1 = require("./GithubTokenInfo");

var localStorage_1 = require("../../storage/localStorage");

var React = async_jsx_html_1.React;

function Settings() {
  return /*#__PURE__*/React.createElement("div", {
    id: "settings"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Github user"), /*#__PURE__*/React.createElement("input", {
    id: "githubUser",
    value: localStorage_1.getGithubUser(),
    placeholder: "Enter github user"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Github repo"), /*#__PURE__*/React.createElement("input", {
    id: "githubRepo",
    value: localStorage_1.getGithubRepo(),
    placeholder: "Enter github repo"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Github token"), /*#__PURE__*/React.createElement("input", {
    id: "githubToken",
    type: "password",
    value: localStorage_1.getGithubToken(),
    placeholder: "Enter github token"
  }), /*#__PURE__*/React.createElement("button", {
    id: "githubTokenToggle"
  }, /*#__PURE__*/React.createElement(eye_off_outline_1.EyeOffOutline, {
    classnames: "icon",
    id: "eye-off"
  }), /*#__PURE__*/React.createElement(eye_outline_1.EyeOutline, {
    classnames: "icon hide",
    id: "eye-on"
  }))), /*#__PURE__*/React.createElement(GithubTokenInfo_1.GithubTokenInfo, null));
}

exports.Settings = Settings;
},{"async-jsx-html":"../node_modules/async-jsx-html/nodejs/mod.js","../../icons/eye-off-outline":"icons/eye-off-outline.tsx","../../icons/eye-outline":"icons/eye-outline.tsx","./GithubTokenInfo":"view/Settings/GithubTokenInfo.tsx","../../storage/localStorage":"storage/localStorage.ts"}],"view/App.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var async_jsx_html_1 = require("async-jsx-html");

var Settings_1 = require("./Settings/Settings");

var React = async_jsx_html_1.React;

function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Settings_1.Settings, null), /*#__PURE__*/React.createElement("div", {
    id: "sequence"
  }));
}

exports.App = App;
},{"async-jsx-html":"../node_modules/async-jsx-html/nodejs/mod.js","./Settings/Settings":"view/Settings/Settings.tsx"}],"utils/dom.ts":[function(require,module,exports) {
"use strict"; // export function evNumVal(fn: (nb: number) => void) {
//     return ({ target: { value } }: Event) => {
//         fn(Number(value));
//     };
// }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elById = exports.toggleAttr = exports.toggleChildClass = exports.evStrVal = void 0; // export function evStrVal(fn: (val: string) => void) {
//     return ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
//         fn(value);
//     };
// }

function evStrVal(fn) {
  return function (_a) {
    var target = _a.target;
    fn(target.value);
  };
}

exports.evStrVal = evStrVal;

function toggleChildClass(parent, classname) {
  return parent.childNodes.forEach(function (el) {
    var _a;

    return (_a = el.classList) === null || _a === void 0 ? void 0 : _a.toggle(classname);
  });
}

exports.toggleChildClass = toggleChildClass;

function toggleAttr(el, name, val1, val2) {
  if (el.getAttribute(name) === val1) {
    el.setAttribute(name, val2);
  } else {
    el.setAttribute(name, val1);
  }
}

exports.toggleAttr = toggleAttr;

function elById(id) {
  return document.getElementById(id);
}

exports.elById = elById;
},{}],"view/Settings/settings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettings = void 0;

var localStorage_1 = require("../../storage/localStorage");

var dom_1 = require("../../utils/dom");

var elGithubToken;
var elGithubTokenToggle;

function initSettings() {
  // use addEventListener to have multiple subscriber
  //elById('githubUser').addEventListener('change', evStrVal(storeGithubUser));
  dom_1.elById('githubUser').onchange = dom_1.evStrVal(localStorage_1.storeGithubUser);
  dom_1.elById('githubRepo').onchange = dom_1.evStrVal(localStorage_1.storeGithubRepo);
  elGithubToken = dom_1.elById('githubToken');
  elGithubTokenToggle = dom_1.elById('githubTokenToggle');
  elGithubToken.onchange = dom_1.evStrVal(localStorage_1.storeGithubToken);
  elGithubTokenToggle.onclick = showToken;
}

exports.initSettings = initSettings;

function showToken() {
  dom_1.toggleAttr(elGithubToken, 'type', 'password', 'text');
  dom_1.toggleChildClass(elGithubTokenToggle, 'hide');
}
},{"../../storage/localStorage":"storage/localStorage.ts","../../utils/dom":"utils/dom.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var interface_1 = require("./interface");

var midi_1 = require("./midi");

var App_1 = require("./view/App");

var settings_1 = require("./view/Settings/settings"); // init html


App_1.App().render().then(function (html) {
  document.getElementById('app').innerHTML = html;
  settings_1.initSettings();
});
var worker = new Worker("/sequencerWorker.34566a39.js");
var msg = {
  action: interface_1.ActionWorker.save,
  sequences: [{
    id: '1',
    trigger: 0,
    data: [0x90, 50, 90]
  }, {
    id: '2',
    trigger: 1,
    data: [0x80, 50, 0]
  }, {
    id: '3',
    trigger: 6,
    data: [0x90, 60, 90]
  }, {
    id: '4',
    trigger: 8,
    data: [0x80, 60, 0]
  }, {
    id: '5',
    trigger: 14,
    data: [0x90, 70, 90]
  }, {
    id: '6',
    trigger: 15,
    data: [0x80, 70, 0]
  }]
};
worker.postMessage(msg);
midi_1.initMIDI();
worker.addEventListener('message', function (_a) {
  var data = _a.data; // console.log('data', data);

  midi_1.midi.outputs.forEach(function (midiOutput) {
    midiOutput.send(data.data);
  });
}, false);
},{"./interface":"interface.ts","./midi":"midi.ts","./view/App":"view/App.tsx","./view/Settings/settings":"view/Settings/settings.ts","./sequencerWorker.ts":[["sequencerWorker.34566a39.js","sequencerWorker.ts"],"sequencerWorker.34566a39.js.map","sequencerWorker.ts"]}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42767" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map