// Component Structure
// --------------------
// Container
// --> Title
// --> Form
// --> List
// ----> Concern
// --> Footer

// stateless component
const Title = () => {
	return (
		<div id="titleWrapper">
			<h2 className="textCenter">Tenant Issues</h2>
		</div>
	);
};

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleNewConcernAddition = this.handleNewConcernAddition.bind(this);
	}
	
	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}
	
	handleNewConcernAddition() {
		if(this.input.value !== '') {
			this.props.addConcern(this.input.value);
			this.setState({
				value: ''
			});
			this.input.placeholder = "Add a concern...";
		}
	}
	
	render() {
		return (
			// ref should be passed a callback
			// with underlying dom element as its
			// argument to get its reference 
			<div id="form">
				<input 
					ref={node => {
						this.input = node;
					}}
					value={this.state.value}
					placeholder="Add concerns here..."
					autocomplete="off"
					onChange={this.handleChange}
				/>

				<button 
					onClick={this.handleNewConcernAddition}
				>	
					+
				</button>	
			</div>
		);
	}
}

const Concern = ({concern, remove}) => {
	// single concern 
	return (
		<p className="concerns">
			{concern.value}
			<span 
				className="removeBtn"
				onClick={()=> {
					remove(concern.id)
				}}>
				x
			</span>
		</p>
	);
};

const List = ({concerns, remove}) => {
	let allConcerns = [];
	
	if(concerns.length > 0) {
		allConcerns = concerns.map(concern => {
			// passing concern and remove method reference
			return (<Concern concern={concern} remove={remove} />);
			//return (<p>{concern.value}</p>);
		});
	} else {
		allConcerns.push(<h3 id="acu">All caught up !</h3>);	
	}
	
	return (
		<div id="list">
			<p id="info"> Your Concerns: </p>
			{allConcerns}
		</div>
	);
};

const Footer = () => {
	return (
		<div id="footer">
			<a href="https://sites.google.com/cs.umass.edu/compsci326/home" target="_blank">
				<p>
					CS 326 Spring 19
				</p>
			</a>
		</div>
	);
};

class Container extends React.Component {
	constructor(props) {
		super(props);
		// data for introduction to app
		// for new users
		const introData = [
			{
				id: -3, 
				value: "The sink does not work at the moment. It is not draining the water."
			},
			{
				id: -2,
				value: "Our shower head is leaking."
			},
			{
				id: -1,
				value: "Our bathroom door is not locking properly."
			}
		];
		
		const localData = localStorage.concerns && JSON.parse(localStorage.concerns);

		this.state = { 
			data: localData || introData
		};
		
		// binding methods
		this.addConcern = this.addConcern.bind(this);
		this.removeConcern = this.removeConcern.bind(this);
	}
	// Handler to update localStorage
	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.concerns = JSON.stringify(this.state.data);
	}
	// Handler to add concerns
	addConcern(val) {
		let id;
		// if localStorage is available then increase localStorage count
		// else use global window object's id variable
		if (typeof(Storage) !== "undefined") {
			id = Number(localStorage.count);
			localStorage.count = Number(localStorage.count) + 1;
		} else {
			id = window.id++;
		}
		
		const concern = { 
			value: val, 
			id: id 
		};
		
		this.state.data.push(concern);
		// update state
		this.setState({
			data: this.state.data
		}, () => {
			// update localStorage
			this.updateLocalStorage();
		});
	}
	// Handler to remove concern
	removeConcern(id) {
		// filter out the concern that has to be removed
		const list = this.state.data.filter(concern => {
			if (concern.id !== id)
				return concern;
		});
		// update state
		this.setState({
			data: list
		}, () => {
			// update localStorage
			this.updateLocalStorage();
		});
	}
	
	componentDidMount() {
		localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			if(!localStorage.concerns) {
				localStorage.concerns = JSON.stringify(this.state.data);
			}
			if(!localStorage.count) {
				localStorage.count = 0;
			}

		} else {
			 console.log("%cApp will not remember concerns created as LocalStorage Is Not Available",
							 "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
			window.id = 0;
		}
	}
	
	render() {
		return (
			<div id="container">
				<Title />
				<Form addConcern={this.addConcern} />
				<List concerns={this.state.data} remove={this.removeConcern} />
				<Footer />
			</div>
		);
	}
}

ReactDOM.render(<Container />, contentNode);
// This renders the JSX component inside the content node:
//ReactDOM.render(<MyComponent />, contentNode);
