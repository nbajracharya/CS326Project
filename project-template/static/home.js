"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Login as Landlord:"
        ),
        React.createElement(
          "form",
          { action: "/profile.html", method: "get" },
          React.createElement(
            "div",
            { "class": "field-wrap" },
            React.createElement(
              "label",
              null,
              "Email Address",
              React.createElement(
                "span",
                { "class": "req" },
                "*"
              )
            ),
            React.createElement("input", { type: "email", required: true })
          ),
          React.createElement(
            "div",
            { "class": "field-wrap" },
            React.createElement(
              "label",
              null,
              "Password",
              React.createElement(
                "span",
                { "class": "req" },
                "*"
              )
            ),
            React.createElement("input", { type: "password", required: true })
          ),
          React.createElement(
            "button",
            { "class": "button button-block" },
            "Log In"
          )
        )
      );
    }
  }]);

  return Login;
}(React.Component);

var HomeContent = function (_React$Component2) {
  _inherits(HomeContent, _React$Component2);

  function HomeContent() {
    _classCallCheck(this, HomeContent);

    return _possibleConstructorReturn(this, (HomeContent.__proto__ || Object.getPrototypeOf(HomeContent)).call(this));
  }

  _createClass(HomeContent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "EZ-Lease"
        ),
        React.createElement(
          "h2",
          null,
          "Welcome to EZ-Lease ..."
        ),
        React.createElement(LandlordSection, null)
      );
    }
  }]);

  return HomeContent;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(HomeContent, null), contentNode);