import React,{useEffect,useState} from 'react';
//import Query from 'query-string';  

import './styles.css';
import logoImg from '../../assets/logo.png';
import {matchApi, userApi} from '../../services/api';



export default function Menu(){
    const username = localStorage.getItem('username');
    const puuid = localStorage.getItem('puuid');
    const api_key = localStorage.getItem('api_key');
    const [matchdata,setMatchData] = useState([]);
    const [participants,setParticipants] = useState([]);


    useEffect(() => {
        const query = require('query-string');
        const queryString = query.parse(window.location.search);

        async function getParticipantsName(participants){
            var i = 0;

            for (i in participants){
                let participantName = await userApi.get(`by-puuid/${participants[i].puuid}?api_key=${api_key}`, {
                });
                participants[i].name = participantName.data.name;

                i++;
            }
            console.log(participants);
            return(participants);

        }



        
        matchApi.get(`${queryString['matchid']}?api_key=${api_key}`,{
        }).then(response => {
            setMatchData(response.data);
            console.log(response.data.info.participants);
            getParticipantsName(response.data.info.participants).then((result) =>{
                setParticipants(result.sort((a, b) => (
                    a.placement > b.placement) ? 1 : -1));
            });
            
            
        })




    }, [puuid,api_key]);




    return(
        <div className ="menuContainer">
            <div className ="verticalMenu">
                <img src={logoImg} alt="Logo" />
                <a href="/">Home</a>
                <a href="/">User</a>
                <a href="/Match">Match</a>
            </div>

            <div className = "contentMatch">
                <ul>
                    {participants.map(participant =>(
                        <div className="liDiv">
                            <li> 
                                <div className="placeDiv">
                                    <h5>{participant.name}</h5>
                                    <h2>{participant.placement}#</h2>   
                                </div>
                                <div className="unitDiv">
                                    Units:
                                    <br/>
                                    {participant.units.map(unit =>(
                                        <img className={`imgChamp_${unit.rarity}`} src={require(`../../assets/champions/${unit.character_id.substring(5).toLowerCase()}.png`)} alt="Champ1"/>
                                    ))}
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>


    );
}