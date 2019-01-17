import React, { Component } from 'react';
import '../App.css';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import Table from './Table';

const UrlValueData = {
  small_data_value: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  big_data_value: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  wrong_url: 'http://www.filltexttttt.com/?rows=1000&id'
};

class App extends Component {

  state = {
    data: [],
    error: null,
    isLoading: false,
    userProfile: null
  }

  getUrl = (type) => {
    return UrlValueData[type];
  }

  loadData = (type) => {

    this.setState({
      isLoading: true,
      data: [], error:
      null
    });

    let url = this.getUrl(type);

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({
        data: data,
        error: null,
        isLoading: false
      }))
      .catch(error => this.setState({
        data: [],
        error: error.message,
        isLoading: false
      }));
  }

  showUserProfile = (userData) => {
    this.setState({userProfile: userData})
  }

  render() {
    const {
      data,
      isLoading,
      error
    } = this.state

    return (
      <div className="App" >
        {error && <ErrorMessage error={error}/>}
        {isLoading && <Spinner />}
        <div className="Load-data-panel">
          <span>Выбор объема данных</span>
          <button className="Load-data-panel__button small-data-btn" onClick={() => {this.loadData('small_data_value')}}>Малый объем данных</button>
          <button className="Load-data-panel__button big-data-btn" onClick={() => {this.loadData('big_data_value')}}>Большой объем данных</button>
          <button className="Load-data-panel__button wrong-data-btn" onClick={() => {this.loadData('wrong_url')}}>Неверная ссылка</button>
        </div>
        {data.length !== 0 && <Table data={data}/>}
      </div>
    );
  }
}

export default App;
