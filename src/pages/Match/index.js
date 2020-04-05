import React,{useEffect,useState} from 'react';

import './styles.css';
import logoImg from '../../assets/logo.png';
import {matchApi} from '../../services/api';


export default function Menu(){
    const username = localStorage.getItem('username');
    const puuid = localStorage.getItem('puuid');
    const api_key = localStorage.getItem('api_key');
    const [matches,setMatches] = useState([]);
    const [matchdata,setMatchData] = useState([]);



    useEffect(() => {

        async function getMatch(data){
            var matchid;
            var i;
            let matchResponse = [];
            for (matchid in data){
                let matchDataResponse = await matchApi.get(`${data[matchid]}?api_key=${api_key}`, {
                });
                matchDataResponse = matchDataResponse.data;
                for (i in matchDataResponse.info.participants){
                    if(matchDataResponse.info.participants[i].puuid === puuid){
                        matchResponse.push(matchDataResponse.info.participants[i]);     
                    }
                }            
            }
            return(matchResponse);
        }

        matchApi.get(`by-puuid/${puuid}/ids?count=5&api_key=${api_key}`,{
        }).then(response => {
            setMatches(response.data);
            getMatch(response.data).then((result) =>{
                console.log(result);
                setMatchData(result);
            });
        })
    }, [puuid,api_key]);




    return(
        <div className ="menuContainer">
            <div className ="verticalMenu">
                <img src={logoImg} alt="Logo" />
                <a href>Home</a>
                <a href>Match</a>
            </div>

            <div className = "contentMatch">
                Usename : {username}
                {console.log("teste" +matchdata)}
                <ul>
                    {matchdata.map(match =>(
                        <div className="liDiv">
                            <li> 
                                <div className="placeDiv">
                                    <h2>{match.placement}#</h2>   
                                </div>
                                <div className="unitDiv">
                                    Units:
                                    <br/>
                                    {match.units.map(unit =>(
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