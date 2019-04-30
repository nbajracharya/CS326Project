const RequestRow = (props) => {
  function onDeleteClick() {
    props.deleteRequest(props.request._id);
  }

  return (<tr>
    <td>{props.request._id.substr(-4)}</td>
    <td>{props.request.name}</td>
    <td><button onClick={onDeleteClick}>Resolve</button></td>
  </tr>
  );
}

RequestRow.propTypes = {
  request: React.PropTypes.object.isRequired,
  deleteRequest: React.PropTypes.func.isRequired,
};

function RequestTable(props) {
  const requestRows = props.requests.map(request => (
    <RequestRow key={request._id} request={request} deleteRequest={props.deleteRequest} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{requestRows}</tbody>
    </table>
  );
}

RequestTable.propTypes = {
  requests: React.PropTypes.array.isRequired,
  deleteRequest: React.PropTypes.func.isRequired,
};

class RequestList extends React.Component {
  constructor() {
    super();
    this.state = { requests: [] };

    this.createRequest = this.createRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
  }

  deleteRequest(id) {
    fetch(`/api/requests/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) alert('Failed to delete request');
      else this.loadData();
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte
    ) {
      return;
    }
    this.loadData();
  }

  loadData() {
    fetch(`/api/requests${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          this.setState({ requests: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch requests:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  createRequest(newRequest) {
    fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(updatedRequest => {
              const newRequests = this.state.requests.concat(updatedRequest);
              this.setState({ requests: newRequests });
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add request: ' + error.message);
            });
        }
      });
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  render() {
    return (
      <div>
        <RequestTable requests={this.state.requests} deleteRequest={this.deleteRequest} />
        <hr />
        <AddRequest createRequest={this.createRequest} />
      </div>
    );
  }
}

class AddRequest extends React.Component {
	constructor() {
	  super();
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleSubmit(e) {
	  e.preventDefault();
	  let form = document.forms.requestAdd;
	  this.props.createRequest({
		title: form.name.value,
	  });
	  form.name.value = '';
	}
  
	render() {
	  return (
		<div>
		  <form name="addRequest" onSubmit={this.handleSubmit}>
			<input type="text" name="name" placeholder="name" />
			<button>Add</button>
		  </form>
		</div>
	  );
	}
}

RequestList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

var contentNode = document.getElementById("contents");
ReactDOM.render(<RequestList />, contentNode);
