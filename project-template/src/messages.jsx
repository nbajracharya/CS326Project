// This is a place holder for the initial application state.
// const state = [

// ];

// // This grabs the DOM element to be used to mount React components.
// var contentNode = document.getElementById("contents");

// class MyComponent extends React.Component {
//   constructor() {
//     super();
//   }

//   render() {
//     return (
//       <div>
//         <h1>Messages</h1>
//       </div>
//     );
//   }
// }

// // This renders the JSX component inside the content node:
// ReactDOM.render(<MyComponent />, contentNode);

import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';

const MessageRow = (props) => (
 <tr>
   <td><Link to={`/message/${props.message._id}`}>{props.message._id.substr(-4)}</Link></td>
   <td>{props.message.status}</td>
   <td>{props.message.owner}</td>
   <td>{props.message.created.toDateString()}</td>
   <td>{props.message.effort}</td>
   <td>
     {props.message.completionDate ? props.message.completionDate.toDateString() : ""}
   </td>
   <td>{props.message.title}</td>
 </tr>
);

function MesssageTable(props) {
 const messageRows = props.message.map(message => (
   <MessageRow key={message._id} message={message} />
 ));
 return (
   <table className="bordered-table">
     <thead>
       <tr>
         <th>Id</th>
         <th>Status</th>
         <th>Owner</th>
         <th>Created</th>
         <th>Effort</th>
         <th>Completion Date</th>
         <th>Title</th>
       </tr>
     </thead>
     <tbody>{messageRows}</tbody>
   </table>
 );
}

export default class messageList extends React.Component {
 constructor() {
   super();
   this.state = { message: [] };

   this.createmessage = this.createmessage.bind(this);
   this.setFilter = this.setFilter.bind(this);
 }

 componentDidMount() {
   this.loadData();
 }

 // This method is part of the React component "lifecycle". It is invoked
 // when a component property is updated. In this case, we are using it to
 // load new data when the props.location object is changed. In particular,
 // when we click on a link that causes react router to change the view to
 // the messageList and the URL changes (for example, a search query) it
 // causes the componentDidUpdate() method to be invoked.
 componentDidUpdate(prevProps) {
   const oldQuery = prevProps.location.query;
   const newQuery = this.props.location.query;
   if (oldQuery.status === newQuery.status) {
     return;
   }
   this.loadData();
 }

 loadData() {
   // Note: React Router automatically adds a "location" property to a react
   //       object's "props". The object that the "location" property refers
   //       to also has a "search" property which is the query string of the
   //       URL, including the '?' character  -  which is why we do not need
   //       to add it to the string in the `fetch()` call.
   fetch(`/api/messages${this.props.location.search}`).then(response => {
     if (response.ok) {
       response.json().then(data => {
         console.log("Total count of records:", data._metadata.total_count);
         data.records.forEach(message => {
           message.created = new Date(message.created);
           if (message.completionDate)
             message.completionDate = new Date(message.completionDate);
         });
         this.setState({ message: data.records });
       });
     } else {
       response.json().then(error => {
         alert("Failed to fetch messages:" + error.message)
       });
     }
   }).catch(err => {
     alert("Error in fetching data from server:", err);
   });
 }

 createMessage(newMessage) {
   fetch('/api/message', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(newMessage),
   })
     .then(res => {
       if (res.ok) {
         res.json()
           .then(updatedMessage => {
             updatedMessage.created = new Date(updatedMessage.created);
             if (updatedMessage.completionDate)
               updatedMessage.completionDate = new Date(updatedMessage.completionDate);
             const newMessage = this.state.messages.concat(updatedMessage);
             this.setState({ message: newMessage });
           });
       }
       else {
         res.json()
           .then(error => {
             alert('Failed to add message: ' + error.message);
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
       <MessageFilter setFilter={this.setFilter} />
       <hr />
       <MessageTable message={this.state.message} />
       <hr />
       <MessageAdd createMessage={this.createMessage} />
     </div>
   );
 }
}

MessageList.propTypes = {
 location: React.PropTypes.object.isRequired,
 router: React.PropTypes.object,
};

