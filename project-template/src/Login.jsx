// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class Login extends React.Component {
  render(){
    return(
      <div>
        <h2>Login as Landlord:</h2>
        <form action="/requests.html" method="get">
            <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" required/>
          </div>
          
          <div class="field-wrap">
            <label>
              Password<span class="req">*</span>
            </label>
            <input type="password" required/>
          </div>

          <button class="button button-block">Log In</button>
        </form>
      </div>
    )
  }
}

class LoginContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>EZ-Lease</h1>
        <h2>Welcome to EZ-Lease ...</h2>
        <Login />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<LoginContent />, contentNode);
