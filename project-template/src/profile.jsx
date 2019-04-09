// This is a place holder for the initial application state.
const state = [
  {name: "John Doe", email: "jdoe@thatmail.com", number: 4177677787,
  address: "1800 Sour Drive, Sunnyvale, CA, 94019", manager: "David Murray",
  balance: "$"+ 0.00, leaseEnd: Date(2020,13,0)}
];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class InfoRow extends React.Component {
  render() {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
      <tr>
        <td style={borderedStyle}>{this.props.info_id}</td>
        <td style={borderedStyle}>{this.props.info_response}</td>
      </tr>
    )
  }
}
class MyComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    const borderedStyle = {border: "1px solid silver", padding: 6};
    return (
      <div>
        <h1>Ez-Lease</h1>
        <h2>Profile</h2>
        <h3>Basic Information</h3>
        <table style={{borderCollapse: "collapse"}}>
          <tbody>
           <InfoRow info_id="Full Name"
           info_response={state[0].name} />
           <InfoRow info_id="E-Mail"
           info_response={state[0].email} />
           <InfoRow info_id="Contact Number"
           info_response={state[0].number} />
           <InfoRow info_id="Property Address"
           info_response={state[0].address} />
           <InfoRow info_id="Property Manager"
           info_response={state[0].manager} />
           <InfoRow info_id="Outstanding Balance"
           info_response={state[0].balance} />
           <InfoRow info_id="Lease End Date"
           info_response={state[0].leaseEnd} />
          </tbody>
        </table>
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<MyComponent />, contentNode);
