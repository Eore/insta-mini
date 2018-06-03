// import React from 'react'

import './Cockpit.css'

// const Cockpit = (props) => {
//     return (
//         <div>
//             <a className="" onClick={props.toggle}>
//                 <i className="far fa-heart like-post " ></i>
//             </a>
//         </div>

//     );
// };

// export default Cockpit;

import React, { Component } from 'react'

class Cockpit extends Component {
  render() {
    return (
      <div>
            <a className="" onClick={this.props.toggle}>
                <i className="far fa-heart" ></i>
            </a>
      </div>
    )
  }
}

export default Cockpit
