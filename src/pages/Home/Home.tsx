import React, { useState } from 'react';
import UserForm from '../../components/UserForm/UserForm';
import Users from '../../components/Users/Users';
import './Home.css';

const Home: React.FC = () => {

  const [currentUserId, setUserCurrentId] = useState("");

  const currentUserIdVoid = (id: string):void => {
    setUserCurrentId(id);
  }

  return (
    <div className="container">
      <h1>CRUD</h1>
      <UserForm currentUserId={ currentUserId } />
      <Users currentUserId={ currentUserIdVoid } />
    </div>
  );
}

export default Home;
