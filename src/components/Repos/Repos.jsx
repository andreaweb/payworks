import React, { Component } from 'react';
import './Repository.scss';

class Repository extends Component {
  render() {
    return (
      <main>
       <table>
          <thead>
            <tr><td></td></tr>
          </thead>
          <tbody>
            <tr><td>repo.name</td></tr>
          </tbody>
        </table>
      </main>
    );
  }
}

Repository.propTypes = {
 
};

export default Repository;
