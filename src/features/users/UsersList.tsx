import React, { FunctionComponent, useEffect } from 'react';
import { Text } from 'react-native';
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from 'react-redux'
import {fetchUsers} from './usersSlice'


const UsersList: FunctionComponent = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers({page: 1}));
  }, []);

    return (
      <>
        {users.loading && 
        <Text>Loading</Text>
        }
        {users.error && 
        <Text>Error</Text>
        }
        {!users.loading && !users.error &&
        <Text>Default</Text>
        }
        <Text>{JSON.stringify(users.users)}</Text>
      </>
    );
};

export default UsersList;