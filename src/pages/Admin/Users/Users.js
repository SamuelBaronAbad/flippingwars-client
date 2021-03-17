import React, {useState,useEffect} from 'react';
import {findUsersActiveApi} from '../../../api/user';
import {getAccessTokenApi} from '../../../api/auth'
import ListUsers from '../../../components/Admin/User/ListUsers';
import '../../../pages/Admin/Users/Users.scss';

export default function Users (){
const [usersActive, setUsersActive]= useState([]);
const [usersInactive, setUsersInactive] = useState([])
const [reloadUser, setReloadUser] = useState(false);
const token = getAccessTokenApi();


useEffect(() => {
    findUsersActiveApi(token, true)
    .then(response => {
    
        setUsersActive(response)
    });
    findUsersActiveApi(token, false)
    .then(response => {
        setUsersInactive(response)
    })
    setReloadUser(false);
}, [token, reloadUser])


    return (
        <div className="usersPage">
       <ListUsers setReloadUser={setReloadUser} active={usersActive} inactive={usersInactive}></ListUsers>
       </div>
    )
}