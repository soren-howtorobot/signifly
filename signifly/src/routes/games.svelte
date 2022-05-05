<script>
    // @ts-nocheck
    import {gameStoreWriteable,getGames} from '../stores/gameStore.js';
    
    import {teams} from '../stores/teamStore.js';
    const games = $gameStoreWriteable.map(e => {
        return {
            playing_1: $teams.find( x => {
                if(x.id == e.team_1){
                    return x.team_name
                };
            }).team_name,
            playing_2: $teams.find( x => {
                if(x.id == e.team_2){
                    return x.team_name
                };
            }).team_name,
           score:e.score,
           id:e.id

        }
    }); 
    let filteredSearch = [];
    let teamSearch = "";
    $:{
        if (teamSearch != '') {
            filteredSearch = games.filter( game => {
                console.log(game.playing_1);
                return game.playing_1.toLowerCase().includes(teamSearch.toLowerCase()) || game.playing_2.toLowerCase().includes(teamSearch.toLowerCase())
            });
            
        }else{
            filteredSearch = [ ... games];
        }
    }

</script>

<h1>Current active games:</h1>
<div class="search">
    <label for="">Search for match:
    <input type="text" bind:value={teamSearch} placeholder="Team Name - ">
</label>
</div>
{#each filteredSearch as game}
     <div class="gameContainer">
         <div class="id">
             {game.id}
         </div>
         <div class="team_1">
             {game.playing_1}
         </div>
         <div class="desc">
             <p>Is playing against:</p>
         </div>
         <div class="team_2">
             {game.playing_2}
         </div>
         <div class="score">
             <p>
                 CURRENT SCORE:<br>
                 {game.score.team_1} / {game.score.team_2}
            </p>
         </div>
         <a href="game/{game.id}">WATCH LIVE <i class="fas fa-futbol"></i></a>
     </div>
{/each} 
<style>
    h1{
        text-align: center;
    }
    .search{
        width: 400px;
        margin: auto;
    }
    .gameContainer{
        display: flex;
        width: 80%;
        margin: auto;
        justify-content: center;
        align-items: center;
        gap: 15px;
        font-size: 1.2em;

    }
    
    .gameContainer .team_1, .gameContainer .team_2{
        font-size: 1.3em;
    }
    .gameContainer .id{
        background-color: blue;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 100%;
        
        
    }
    .gameContainer .team_1{
        color: rgb(3, 60, 3);
    }
    .gameContainer .team_2{
        color: rgb(155, 57, 19);
    }
    .gameContainer .score{
        text-align: center;
    }
    .gameContainer a{
        text-decoration: none;
        color: red;
    }
    .gameContainer a i{
        transition: 0.5s;
    }
    .gameContainer a:hover i{
        transform: rotate(360deg);
    }
</style>