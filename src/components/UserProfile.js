import React,  { Component } from 'react';

class UserProfile extends Component {

  render() {
    const { firstName, lastName, description, address } = this.props.userData;
    return(
      <div className='User-profile'>
        Выбран пользователь: <b>{firstName} {lastName}</b>
        <p>Описание: {description} </p>
        Адрес проживания: <b>{address.streetAddress}</b><br/>
        Город: <b>{address.city}</b><br/>
        Провинция/штат: <b>{address.state}</b><br/>
        Индекс: <b>{address.zip}</b>
      </div>
    )
  }
}

export default UserProfile;
