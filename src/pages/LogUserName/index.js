import React, { useState }  from 'react';
import {useHistory} from 'react-router-dom';


import './styles.css';
import logoImg from '../../assets/logo.png';
import {userApi} from '../../services/api';


export default function Menu(){
    const [username,SetUsername] = useState('');
    const history = useHistory();
    const api_key = "RGAPI-50396e7c-ed70-485a-973a-9d9f2453dcb3";



    async function handleUsername(e){
        e.preventDefault();
        
        try{
            let userdata = await userApi.get(`by-name/${username}?api_key=${api_key}`, {
            });
            userdata = userdata.data;
            localStorage.setItem('username',username);
            localStorage.setItem('puuid', userdata.puuid);
            localStorage.setItem('api_key', api_key);
            history.push('/Match');

        }catch(err){
            alert('Erro');
            console.log("aaaa"+err);
        }
    }



    return(
        <div className ="menuContainer">
            <div className ="verticalMenu">
                <img src={logoImg} alt="Logo" />
                <a href>Home</a>
                <a href>Teste</a>
            </div>

            <div className = "contentMenu">
                <form onSubmit={handleUsername}>
                    <h1>Digite o Username</h1>
                    <input 
                        placeholder="Username"
                        value={username}
                        onChange={e => SetUsername(e.target.value)}
                    />
                    <button className="button" type="submit">Enter</button>
                </form>
            </div>
        </div>


    );
}