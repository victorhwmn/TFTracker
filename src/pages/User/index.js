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
    var Actualtime 
    var Savetime


    useEffect(() => {
        async function getMatch(data){
            var matchid;
            var i;
            let matchResponse = [];
            
            //Realiza uma consulta na API da Riot e salva a informação em um Array
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
        // Pega o tempo atual e o salvo
        Actualtime = Date.now();
        Savetime = sessionStorage.getItem("TimeStore");

        //Verifica se passou 30 min desde a ultima consulta e verifica se é o mesmo usuario 
        if(Savetime != null && Savetime > (Actualtime - (1000 * 60 * 30)) && puuid === sessionStorage.getItem("puuid.save") ){
            //Pega os dados salvos na sessionStorage
            setMatchData(JSON.parse(sessionStorage.getItem("MatchData")));
            setMatches(JSON.parse(sessionStorage.getItem("Matches")));
            console.log("sessionStorage");
        }
        else {
            //Realiza a consulta na API da Riot
            matchApi.get(`by-puuid/${puuid}/ids?count=5&api_key=${api_key}`,{
            }).then(response => {
                //Atualiza o match e salva-o no sessionStorage
                setMatches(response.data);
                sessionStorage.setItem("Matches",JSON.stringify(response.data));
                
                getMatch(response.data).then((result) =>{
                    setMatchData(result);
                    sessionStorage.setItem("MatchData",JSON.stringify(result));
                    sessionStorage.setItem("puuid.save",puuid);
                    sessionStorage.setItem("TimeStore",Date.now());
                });
            })
            console.log("API");
        }




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
                Username : {username}
                {console.log("teste" +matches)}
                <ul>
                    {matchdata.map((match,index) =>(
                        <a href={`/Match?matchid=${matches[index]}`}>
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
                        </a>
                    ))}
                </ul>
            </div>
        </div>


    );
}