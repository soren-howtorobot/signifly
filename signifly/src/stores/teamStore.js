import { writable } from "svelte/store";

export const teams = writable([]);
const getTeams = async() =>{
    const conn = await fetch('http://localhost:8080/get-teams');
    const data = await conn.json();
    
    teams.set(data.teams);
}
getTeams();