import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUser, fetchUsers } from '../../slices/usersSlice';

import "./Users.css";

type UsersListProps = {
  currentUserId: (id: string) => void;
}

const Users: React.FC<UsersListProps> = ({ currentUserId }) => {

  const users = useAppSelector((state: RootState) => state.usersReducer.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  }

  const handleCurrentUserId = (id: string) => {    
    currentUserId(id);
  }

  return (    
    Object.keys(users).length == 0 ?  
      <div>
        No hay usuarios
      </div> 
    : (
      <div>
        {Object.values(users).map((user: any) => (
          <div className="item-card" key={user._id} onClick={ () => handleCurrentUserId(user._id) }>
            {user.fullName}
            <button className="cancel-button" onClick={ () => handleDeleteUser(user._id) }>x</button>
          </div>
        ))}
      </div>
    )     
  );
}

export default Users;