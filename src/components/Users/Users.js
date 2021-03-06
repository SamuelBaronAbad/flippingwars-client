import React from 'react';

import "./users.scss";

export default function Users (props) {
  console.log("props user: ", props);
    const {user, statusGame} = props;
    return (
        <div className="users">
            <div className="users-container" style={statusGame ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}}>
            <h1> {user.name}</h1>
            <h2>{statusGame ? "Activado" : "Le toca al otro"}</h2>
            </div>
        </div>
    )
}