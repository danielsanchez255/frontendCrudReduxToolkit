import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createUser, updateUser } from '../../slices/usersSlice';
import './UserForm.css';
import { stringify } from 'querystring';

type UsersFormProps = {
  currentUserId: string;
}

const UserForm: React.FC<UsersFormProps> = ({ currentUserId }) => {

  const user = useAppSelector((state: RootState) => 
    currentUserId ? 
      Object.values(state.usersReducer.users).find((p: any) => p._id === currentUserId) 
    : ""
  );

  const [userData, setUserData]: any = useState({
    fullName: ""
  });

  const dispatch = useAppDispatch();

  const clear = () => {
    currentUserId = "";
    setUserData({ fullName: ''});
}

  useEffect(() => {
    if (user) setUserData(user);
  }, [user])

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentUserId) {
      dispatch(updateUser(userData));
      clear();
    } else {
      dispatch(createUser(userData));
      clear();
    }
  }

  return (
    <>
      <form onSubmit={handleCreateUser}>
        <input type="text" className="input-user" placeholder="Nombre del usuario" value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
        <button type="submit" className="button-user" onClick={() => handleCreateUser}>Crear</button>
      </form>
    </>
  );
}

export default UserForm;