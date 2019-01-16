import React, { Component } from 'react';
import '../App.css';
import Spinner from './Spinner';
import Table from './Table';

class App extends Component {
  state = {
    data: [],
    error: null,
    isLoading: false,
    userProfile: null
  }

  loadData = (type) => {

    this.setState({ isLoading: true})

    const smallDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    let url = '';

    if(type === 'small-data-value') {
      url = smallDataUrl
    }
    if(type === 'big-data-value') {
      url = bigDataUrl
    }

    fetch(url)
      .then(response => {
          return response.json();
      })
      .then(data => this.setState({data: data}))
      .catch(error => this.setState({ error: error}))
      .then(() => this.setState({ isLoading: false}));
  }

  showUserProfile = (userData) => {
    this.setState({userProfile: userData})
  }

  render() {
    const {
      isLoading,
      data
    } = this.state

    return (
      <div className="App">
        {isLoading && <Spinner />}

        <div className="Setting-panel">
          <div className="Setting-panel__mode-coice">
            <p>Выбор объема данных</p>
            <button onClick={() => {this.loadData('small-data-value')}}>Малый объем данных</button>
            <button onClick={() => {this.loadData('big-data-value')}}>Большой объем данных</button>
          </div>
          <div className="Setting-panel__filter-panel">
            <input type="text" placeholder="Введите подстроку"/>
            <button>Найти</button>
          </div>
        </div>
        {data.length !== 0&& <Table data={data}/>}
      </div>
    );
  }
}

export default App;
