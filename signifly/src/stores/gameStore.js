import { writable } from "svelte/store";
export const gameStoreWriteable = writable([]);

export const getGames = async () => {
	const conn = await fetch('http://localhost:8080/get-games');
	const data = await conn.json();
	/* console.log(data.games); */
	gameStoreWriteable.set(data.games);
}
getGames();



