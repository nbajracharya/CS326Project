"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is a place holder for the initial application state.
var state = [{ name: "John Doe", email: "jdoe@thatmail.com", number: 4177677787,
  address: "1800 Sour Drive, Sunnyvale, CA, 94019", manager: "David Murray",
  balance: "$" + 0.00, leaseEnd: Date(2020, 13, 0) }];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var InfoRow = function (_React$Component) {
  _inherits(InfoRow, _React$Component);

  function InfoRow() {
    _classCallCheck(this, InfoRow);

    return _possibleConstructorReturn(this, (InfoRow.__proto__ || Object.getPrototypeOf(InfoRow)).apply(this, arguments));
  }

  _createClass(InfoRow, [{
    key: "render",
    value: function render() {
      var borderedStyle = { border: "1px solid silver", padding: 4 };
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.info_id
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.info_response
        )
      );
    }
  }]);

  return InfoRow;
}(React.Component);

var MyComponent = function (_React$Component2) {
  _inherits(MyComponent, _React$Component2);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this));
  }

  _createClass(MyComponent, [{
    key: "render",
    value: function render() {
      var borderedStyle = { border: "1px solid silver", padding: 6 };
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Ez-Lease"
        ),
        React.createElement(
          "h2",
          null,
          "Profile"
        ),
        React.createElement(
          "h3",
          null,
          "Basic Information"
        ),
        React.createElement(
          "table",
          { style: { borderCollapse: "collapse" } },
          React.createElement(
            "tbody",
            null,
            React.createElement(InfoRow, { info_id: "Full Name",
              info_response: state[0].name }),
            React.createElement(InfoRow, { info_id: "E-Mail",
              info_response: state[0].email }),
            React.createElement(InfoRow, { info_id: "Contact Number",
              info_response: state[0].number }),
            React.createElement(InfoRow, { info_id: "Property Address",
              info_response: state[0].address }),
            React.createElement(InfoRow, { info_id: "Property Manager",
              info_response: state[0].manager }),
            React.createElement(InfoRow, { info_id: "Outstanding Balance",
              info_response: state[0].balance }),
            React.createElement(InfoRow, { info_id: "Lease End Date",
              info_response: state[0].leaseEnd })
          )
        )
      );
    }
  }]);

  return MyComponent;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(MyComponent, null), contentNode);