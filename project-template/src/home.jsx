// This is a place holder for the initial application state.
const state = [

];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class TenantSection extends React.Component {
  render(){
    return(
      <div>
        <h3>For Tenants:</h3>
        <TenantLogin/>
        <TenantRegistration/>
      </div>
    )
  }
}

class LandlordSection extends React.Component {
  render(){
    return(
      <div>
        <h3>For Landlords:</h3>
        <LandlordLogin/>
        <LandlordRegistration/>
      </div>
    )
  }
}

class TenantLogin extends React.Component {
  render(){
    return(
      <div>
        <h4>Login for Tenants:</h4>
        <form action="/profile.html" method="get">
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

class TenantRegistration extends React.Component {
  render(){
    return(
      <div>
        <h4>Register as a Tenant</h4>
        <form action="/profile.html" method="get">
          <div class="top-row">
            <div class="field-wrap">
              <label>
                First Name<span class="req">*</span>
              </label>
              <input type="text" required/>
            </div>
        
            <div class="field-wrap">
              <label>
                Last Name<span class="req">*</span>
              </label>
              <input type="text" required/>
            </div>
          </div>

          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" required/>
          </div>
          
          <div class="field-wrap">
            <label>
              Set A Password<span class="req">*</span>
            </label>
            <input type="password" required/>
          </div>
          
          <button type="submit" class="button button-block">Get Started</button>
        </form>
      </div>
    )
  }
}

class LandlordLogin extends React.Component {
  render(){
    return(
      <div>
        <h4>Login for Landlords:</h4>
        <form action="/profile.html" method="get">
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

class LandlordRegistration extends React.Component {
  render(){
    return(
      <div>
        <h4>Register as a Landlord</h4>
        <form action="/profile.html" method="get">
          <div class="top-row">
            <div class="field-wrap">
              <label>
                First Name<span class="req">*</span>
              </label>
              <input type="text" required/>
            </div>
        
            <div class="field-wrap">
              <label>
                Last Name<span class="req">*</span>
              </label>
              <input type="text" required/>
            </div>
          </div>

          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" required/>
          </div>
          
          <div class="field-wrap">
            <label>
              Set A Password<span class="req">*</span>
            </label>
            <input type="password" required/>
          </div>
          
          <button type="submit" class="button button-block">Get Started</button>
        </form>
      </div>
    )
  }
}

class HomeContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>EZ-Lease</h1>
        <h2>Welcome to EZ-Lease ...</h2>
        <TenantSection />
        <LandlordSection />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<HomeContent />, contentNode);
