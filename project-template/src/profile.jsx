// This is a place holder for the initial application state.
const state = [
  {name: "John Doe", email: "jdoe@thatmail.com", number: "417-767-7787",
  address: "1800 Sour Drive, Sunnyvale, CA, 94019", manager: "David Murray",
  balance: "$0.00", leaseEnd: new Date('2020-01-13')}

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
           info_response={"John Doe"} />
           <InfoRow info_id="E-Mail"
           info_response="jdoe@thatmail.com" />
           <InfoRow info_id="Contact Number"
           info_response="417-767-7787" />
           <InfoRow info_id="Property Address"
           info_response="1800 Sour Drive, Sunnyvale, CA, 94019" />
           <InfoRow info_id="Property Manager"
           info_response="David Murray" />
           <InfoRow info_id="Outstanding Balance"
           info_response="$0.00" />
           <InfoRow info_id="Lease End Date"
           info_response="13/01/2020" />
          </tbody>
        </table>
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<MyComponent />, contentNode);
