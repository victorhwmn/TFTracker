import React, { useState }  from 'react';
import {useHistory} from 'react-router-dom';


import './styles.css';
import logoImg from '../../assets/logo.png';
import {userApi} from '../../services/api';


export default function Menu(){
    const [username,SetUsername] = useState('');
    const [api_key,SetApiKey] = useState('');

    const history = useHistory();



    async function handleUsername(e){
        e.preventDefault();
        
        try{
            let userdata = await userApi.get(`by-name/${username}?api_key=${api_key}`, {
            });
            userdata = userdata.data;
            localStorage.setItem('api_key', api_key);
            history.push({
                pathname: '/User',
                search:`?user=${username}&puuid=${userdata.puuid}`,
            });

        }catch(err){
            alert('Erro');
            console.log("aaaa"+err);
        }
    }

    window.onload = function(){
        if (localStorage.getItem('api_key') != null){
            document.getElementById('key').value = this.localStorage.getItem('api_key')
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
                    <input 
                        id = "key"
                        placeholder="Key"
                        value={api_key}
                        onChange={e => SetApiKey(e.target.value)}

                    />
                    <button className="button" type="submit">Enter</button>
                </form>
            </div>
        </div>


    );
}