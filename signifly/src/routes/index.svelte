<script>
// @ts-nocheck

	import { teams } from '../stores/teamStore.js';
	import { gameStoreWriteable,getGames } from '../stores/gameStore.js';
	$:console.log($gameStoreWriteable);
	let team_1 = '';
    let team_2 = '';
	let showLink = false;

	let gameID = 0;

	$:{
		console.log(team_1,team_2);
    }
    let showGameContainer = false;
    $: team_1!='' && team_2!='' ? showGameContainer = true : showGameContainer=false;
	const displayLink = (data) =>{
		showGameContainer = false;
		showLink = true;
		gameID = data.id;
		console.log(gameID);
	}
	const addGame = async() => {
		const conn = await fetch('http://localhost:8080/create-game',
		{
			method:'POST',
			headers: {'Content-Type': 'application/json'},
        	body: JSON.stringify({
				team_1:team_1,
				team_2:team_2
			}),
		});
		const data = await conn.json();
		console.log(data);
		getGames()
		displayLink(data.game)
	}


</script>

	
	<div class="gameWrapper">
		<div class="teamBox">
			<p>Who is playing?</p>
			{#if team_1 == ''}
				<select bind:value={team_1} name="" id="">
					<option value=''>Pick a team</option>

					{#each $teams as team}
						{#if team_2 != team}
						<option value={team}>{team.team_name}</option>
					{/if}
					{/each}
				</select>
			{:else}
			<i class="fas fa-undo" on:click={()=>{team_1=''}}></i>
				{team_1.team_name}
			{/if}
			
		</div>
		<p class="vs">VERSUS</p>
		<div class="teamBox">
			<p>Who is playing?</p>
			{#if team_2 == ''}
				 <select bind:value={team_2} name="" id="">
                <option value=''>Pick a team</option>

				{#each $teams as team}
					{#if team_1 != team}
						<option value={team}>{team.team_name}</option>
					{/if}
				{/each}
			</select>
			{:else}
				<i class="fas fa-undo" on:click={()=>{team_2=''}}></i>
				{team_2.team_name}
			{/if}
		</div>
	</div>
	{#if showGameContainer}
         <div class="createGameContainer">
             <h2>Start a game!</h2>
             <p>Team 1: {team_1.team_name}</p>
			 <p class="vs">VS</p>
			 <p>Team 2: {team_2.team_name}</p>
			 <button on:click={addGame}>FIGHT</button>
         </div>
    {/if}
	{#if showLink}
         <div class="createGameContainer">
             <h2>Game Created!</h2>

			 <a href="/games">Check all games</a>
			 <a href="/game/{parseInt(gameID)}">Start the game!</a>
             
         </div>
    {/if}
	

<style>
	.createGameContainer{
		width: 400px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.createGameContainer button{
		cursor: pointer;
		background-color: red;
		padding: 10px 20px;
		border: solid 1px black;
		color: white;
		font-weight: bold;
		border-radius: 4px;
		transition: 0.3s;
	}
	.createGameContainer button:hover{
		background-color: rgb(182, 3, 3);
	}
	.createGameContainer p{
		margin: 5px;
	}
	.createGameContainer .vs{
		margin: 20px 0px;
	}
	
	.gameWrapper {
		width: 90vw;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.teamBox {
		padding: 40px;
		position: relative;
		background-color: white;
		border-radius: 10px;
		border: solid 2px hotpink;
	}
	.teamBox p{
		text-transform: uppercase;
	}
	.teamBox i{
		color: red;
		cursor: pointer;
		transition: 0.3s;
	}
	.teamBox i:hover{
		color: black;
	}
	.teamBox select {
		transform: scale(1.5);
	}
	
	.vs {
		font-size: 3em;
		color: red;
		font-style: italic;
	}
	
</style>
