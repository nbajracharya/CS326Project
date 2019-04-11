"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is a place holder for the initial application state.
var state = [];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var TenantSection = function (_React$Component) {
  _inherits(TenantSection, _React$Component);

  function TenantSection() {
    _classCallCheck(this, TenantSection);

    return _possibleConstructorReturn(this, (TenantSection.__proto__ || Object.getPrototypeOf(TenantSection)).apply(this, arguments));
  }

  _createClass(TenantSection, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "For Tenants:"
        ),
        React.createElement(TenantLogin, null),
        React.createElement(TenantRegistration, null)
      );
    }
  }]);

  return TenantSection;
}(React.Component);

var LandlordSection = function (_React$Component2) {
  _inherits(LandlordSection, _React$Component2);

  function LandlordSection() {
    _classCallCheck(this, LandlordSection);

    return _possibleConstructorReturn(this, (LandlordSection.__proto__ || Object.getPrototypeOf(LandlordSection)).apply(this, arguments));
  }

  _createClass(LandlordSection, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "For Landlords:"
        ),
        React.createElement(LandlordLogin, null),
        React.createElement(LandlordRegistration, null)
      );
    }
  }]);

  return LandlordSection;
}(React.Component);

var TenantLogin = function (_React$Component3) {
  _inherits(TenantLogin, _React$Component3);

  function TenantLogin() {
    _classCallCheck(this, TenantLogin);

    return _possibleConstructorReturn(this, (TenantLogin.__proto__ || Object.getPrototypeOf(TenantLogin)).apply(this, arguments));
  }

  _createClass(TenantLogin, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Login for Tenants:"
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

  return TenantLogin;
}(React.Component);

var TenantRegistration = function (_React$Component4) {
  _inherits(TenantRegistration, _React$Component4);

  function TenantRegistration() {
    _classCallCheck(this, TenantRegistration);

    return _possibleConstructorReturn(this, (TenantRegistration.__proto__ || Object.getPrototypeOf(TenantRegistration)).apply(this, arguments));
  }

  _createClass(TenantRegistration, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Register as a Tenant"
        ),
        React.createElement(
          "form",
          { action: "/profile.html", method: "get" },
          React.createElement(
            "div",
            { "class": "top-row" },
            React.createElement(
              "div",
              { "class": "field-wrap" },
              React.createElement(
                "label",
                null,
                "First Name",
                React.createElement(
                  "span",
                  { "class": "req" },
                  "*"
                )
              ),
              React.createElement("input", { type: "text", required: true })
            ),
            React.createElement(
              "div",
              { "class": "field-wrap" },
              React.createElement(
                "label",
                null,
                "Last Name",
                React.createElement(
                  "span",
                  { "class": "req" },
                  "*"
                )
              ),
              React.createElement("input", { type: "text", required: true })
            )
          ),
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
              "Set A Password",
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
            { type: "submit", "class": "button button-block" },
            "Get Started"
          )
        )
      );
    }
  }]);

  return TenantRegistration;
}(React.Component);

var LandlordLogin = function (_React$Component5) {
  _inherits(LandlordLogin, _React$Component5);

  function LandlordLogin() {
    _classCallCheck(this, LandlordLogin);

    return _possibleConstructorReturn(this, (LandlordLogin.__proto__ || Object.getPrototypeOf(LandlordLogin)).apply(this, arguments));
  }

  _createClass(LandlordLogin, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Login for Landlords:"
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

  return LandlordLogin;
}(React.Component);

var LandlordRegistration = function (_React$Component6) {
  _inherits(LandlordRegistration, _React$Component6);

  function LandlordRegistration() {
    _classCallCheck(this, LandlordRegistration);

    return _possibleConstructorReturn(this, (LandlordRegistration.__proto__ || Object.getPrototypeOf(LandlordRegistration)).apply(this, arguments));
  }

  _createClass(LandlordRegistration, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Register as a Landlord"
        ),
        React.createElement(
          "form",
          { action: "/profile.html", method: "get" },
          React.createElement(
            "div",
            { "class": "top-row" },
            React.createElement(
              "div",
              { "class": "field-wrap" },
              React.createElement(
                "label",
                null,
                "First Name",
                React.createElement(
                  "span",
                  { "class": "req" },
                  "*"
                )
              ),
              React.createElement("input", { type: "text", required: true })
            ),
            React.createElement(
              "div",
              { "class": "field-wrap" },
              React.createElement(
                "label",
                null,
                "Last Name",
                React.createElement(
                  "span",
                  { "class": "req" },
                  "*"
                )
              ),
              React.createElement("input", { type: "text", required: true })
            )
          ),
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
              "Set A Password",
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
            { type: "submit", "class": "button button-block" },
            "Get Started"
          )
        )
      );
    }
  }]);

  return LandlordRegistration;
}(React.Component);

var HomeContent = function (_React$Component7) {
  _inherits(HomeContent, _React$Component7);

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
        React.createElement(TenantSection, null),
        React.createElement(LandlordSection, null)
      );
    }
  }]);

  return HomeContent;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(HomeContent, null), contentNode);