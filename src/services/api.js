 import axios from 'axios';

const matchApi = axios.create({
    baseURL: 'https://americas.api.riotgames.com/tft/match/v1/matches',
});

const userApi = axios.create({
    baseURL: 'https://br1.api.riotgames.com/tft/summoner/v1/summoners',
});


export  {userApi,
        matchApi   };