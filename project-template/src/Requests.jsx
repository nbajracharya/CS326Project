const RequestRow = (props) => {
  function onDeleteClick() {
    props.deleteRequest(props.request._id);
  }

  return (<tr>
    <td>{props.request._id.substr(-4)}</td>
    <td>{props.request.name}</td>
    <td><button className="btn btn-lg btn-warning btn-block" onClick={onDeleteClick}>Resolve</button></td>
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
	<div className="card">
		<div className="card-body">
			<h2>Current Maintenance Requests</h2>
			<table className="table table-striped table-hover">
			<thead>
				<tr>
				<th>ID</th>
				<th>Name</th>
				<th></th>
				</tr>
			</thead>
			<tbody>{requestRows}</tbody>
			</table>
		</div>
	</div>
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

  loadData() {
    fetch('/api/requests').then(response => {
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

  render() {
    return (
      	<div>
			<br/>
			<br/>
			<AddRequest createRequest={this.createRequest} />
			<br/>
			<br/>
        	<RequestTable requests={this.state.requests} deleteRequest={this.deleteRequest} />
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
	  let form = document.forms.addRequest;
	  this.props.createRequest({
		name: form.name.value,
	  });
	  form.name.value = '';
	}
  
	render() {
	  return (
		<div className="card">
			<div className="card-body">
				<h2>Create Maintenance Request</h2>
				<form name="addRequest" onSubmit={this.handleSubmit}>
					<input type="text" name="name" className="form-control form-control-lg" required placeholder="Please describe your request..." />
					<button className="btn btn-lg btn-outline-primary btn-block" >Create Maintenance Request</button>
				</form>
			</div>
		</div>
	  );
	}
}

RequestList.propTypes = {
  router: React.PropTypes.object,
};

var contentNode = document.getElementById("contents");
ReactDOM.render(<RequestList />, contentNode);
