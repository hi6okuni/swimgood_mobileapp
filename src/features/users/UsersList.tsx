import React, { FunctionComponent, useEffect } from 'react';
import { Image, View, FlatList, StyleSheet, Text } from 'react-native';
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from 'react-redux'
import {fetchUsers, User} from './usersSlice'


const UsersList: FunctionComponent = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers({page: 1}));
  }, []);

  const handleOnEndReached = () => {
    if (!users.loading) {
      dispatch(fetchUsers({page: users.nextPage}))
    }
  }

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
        <FlatList
          data={users.users}
          keyExtractor={(_, index) => {
            return index.toString()
          }}
          renderItem={ ({item}) => <UserListItem user={item} />}
          onEndReached={handleOnEndReached}
        />
      </>
    );
};

const UserListItem: FunctionComponent<{user: User}> = ({user}) => {
  return (
    <View style={style.container}>
      <Image style={style.thumbnail} source={{uri: user.picture.thumbnail}} />
      <Text style={style.nameText}>{user.name.first}</Text>
    </View>
  )
}

const style = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  nameText: {
    padding: 15,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'lime',
    borderWidth: 2,
  }
})
export default UsersList;