"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component Structure
// --------------------
// Container
// --> Title
// --> Form
// --> List
// ----> Concern
// --> Footer

// stateless component
var Title = function Title() {
	return React.createElement(
		"div",
		{ id: "titleWrapper" },
		React.createElement(
			"h2",
			{ className: "textCenter" },
			"Tenant Issues"
		)
	);
};

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form(props) {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this.state = {
			value: ''
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleNewConcernAddition = _this.handleNewConcernAddition.bind(_this);
		return _this;
	}

	_createClass(Form, [{
		key: "handleChange",
		value: function handleChange(event) {
			this.setState({
				value: event.target.value
			});
		}
	}, {
		key: "handleNewConcernAddition",
		value: function handleNewConcernAddition() {
			if (this.input.value !== '') {
				this.props.addConcern(this.input.value);
				this.setState({
					value: ''
				});
				this.input.placeholder = "Add a concern...";
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return (
				// ref should be passed a callback
				// with underlying dom element as its
				// argument to get its reference 
				React.createElement(
					"div",
					{ id: "form" },
					React.createElement("input", {
						ref: function ref(node) {
							_this2.input = node;
						},
						value: this.state.value,
						placeholder: "Add concerns here...",
						autocomplete: "off",
						onChange: this.handleChange
					}),
					React.createElement(
						"button",
						{
							onClick: this.handleNewConcernAddition
						},
						"+"
					)
				)
			);
		}
	}]);

	return Form;
}(React.Component);

var Concern = function Concern(_ref) {
	var concern = _ref.concern,
	    remove = _ref.remove;

	// single concern 
	return React.createElement(
		"p",
		{ className: "concerns" },
		concern.value,
		React.createElement(
			"span",
			{
				className: "removeBtn",
				onClick: function onClick() {
					remove(concern.id);
				} },
			"x"
		)
	);
};

var List = function List(_ref2) {
	var concerns = _ref2.concerns,
	    remove = _ref2.remove;

	var allConcerns = [];

	if (concerns.length > 0) {
		allConcerns = concerns.map(function (concern) {
			// passing concern and remove method reference
			return React.createElement(Concern, { concern: concern, remove: remove });
			//return (<p>{concern.value}</p>);
		});
	} else {
		allConcerns.push(React.createElement(
			"h3",
			{ id: "acu" },
			"All caught up !"
		));
	}

	return React.createElement(
		"div",
		{ id: "list" },
		React.createElement(
			"p",
			{ id: "info" },
			" Your Concerns: "
		),
		allConcerns
	);
};

var Footer = function Footer() {
	return React.createElement(
		"div",
		{ id: "footer" },
		React.createElement(
			"a",
			{ href: "https://sites.google.com/cs.umass.edu/compsci326/home", target: "_blank" },
			React.createElement(
				"p",
				null,
				"CS 326 Spring 19"
			)
		)
	);
};

var Container = function (_React$Component2) {
	_inherits(Container, _React$Component2);

	function Container(props) {
		_classCallCheck(this, Container);

		// data for introduction to app
		// for new users
		var _this3 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

		var introData = [{
			id: -3,
			value: "The sink does not work at the moment. It is not draining the water."
		}, {
			id: -2,
			value: "Our shower head is leaking."
		}, {
			id: -1,
			value: "Our bathroom door is not locking properly."
		}];

		var localData = localStorage.concerns && JSON.parse(localStorage.concerns);

		_this3.state = {
			data: localData || introData
		};

		// binding methods
		_this3.addConcern = _this3.addConcern.bind(_this3);
		_this3.removeConcern = _this3.removeConcern.bind(_this3);
		return _this3;
	}
	// Handler to update localStorage


	_createClass(Container, [{
		key: "updateLocalStorage",
		value: function updateLocalStorage() {
			if (typeof Storage !== "undefined") localStorage.concerns = JSON.stringify(this.state.data);
		}
		// Handler to add concerns

	}, {
		key: "addConcern",
		value: function addConcern(val) {
			var _this4 = this;

			var id = void 0;
			// if localStorage is available then increase localStorage count
			// else use global window object's id variable
			if (typeof Storage !== "undefined") {
				id = Number(localStorage.count);
				localStorage.count = Number(localStorage.count) + 1;
			} else {
				id = window.id++;
			}

			var concern = {
				value: val,
				id: id
			};

			this.state.data.push(concern);
			// update state
			this.setState({
				data: this.state.data
			}, function () {
				// update localStorage
				_this4.updateLocalStorage();
			});
		}
		// Handler to remove concern

	}, {
		key: "removeConcern",
		value: function removeConcern(id) {
			var _this5 = this;

			// filter out the concern that has to be removed
			var list = this.state.data.filter(function (concern) {
				if (concern.id !== id) return concern;
			});
			// update state
			this.setState({
				data: list
			}, function () {
				// update localStorage
				_this5.updateLocalStorage();
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			localStorage.clear();
			if (typeof Storage !== "undefined") {
				if (!localStorage.concerns) {
					localStorage.concerns = JSON.stringify(this.state.data);
				}
				if (!localStorage.count) {
					localStorage.count = 0;
				}
			} else {
				console.log("%cApp will not remember concerns created as LocalStorage Is Not Available", "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
				window.id = 0;
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "container" },
				React.createElement(Title, null),
				React.createElement(Form, { addConcern: this.addConcern }),
				React.createElement(List, { concerns: this.state.data, remove: this.removeConcern }),
				React.createElement(Footer, null)
			);
		}
	}]);

	return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), contentNode);
// This renders the JSX component inside the content node:
//ReactDOM.render(<MyComponent />, contentNode);