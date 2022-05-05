<script context="module">
    //@ts-nocheck
    export async function load({params}){
        
        const conn = await fetch(`http://localhost:8080/get-games/${params.id}`);
        const gameData = await conn.json();
        return {
            status: 200,
            props: {
                data:gameData
            }
        }
    }
</script>
<script>
// @ts-nocheck
    import { io } from 'socket.io-client';
    const socket = io('http://localhost:8025/');
    socket.on('send_update', ()=>{

    })
    import { getGames } from "../../stores/gameStore.js";

    import { teams } from "../../stores/teamStore.js";

    export let data;
    
    
    const game = {
        playing_1: $teams.find( x => {
                if(x.id == data.game.team_1){
                    return x.team_name
                };
            }).team_name,
            playing_2: $teams.find( x => {
                if(x.id == data.game.team_2){
                    return x.team_name
                };
            }).team_name,
           score:data.game.score,
           id:data.game.id
    }
    const update = async(team,increment) => {

        if(team == 1 ){
            if (increment) {
                game.score.team_1 = game.score.team_1 + 1;
            }else{
                parseInt(game.score.team_1) != 0 ? game.score.team_1 = parseInt(game.score.team_1) - 1 : '';
            }
        }
        if(team == 2 ){
            if (increment) {
                game.score.team_2 = game.score.team_2 + 1;
            }else{
                parseInt(game.score.team_2) != 0 ? game.score.team_2 = parseInt(game.score.team_2) - 1 : '';
            }
        }

        await fetch('http://localhost:8080/get-games/'+game.id,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({game})
            });
        
        getGames()
    }

</script>
<div class="gameContainer">
    <h1>Who's playing?</h1>
    <div class="players">
        <div class="team_1">
        {game.playing_1}
    </div>
    <p>vs</p>
    <div class="team_2">
        {game.playing_2}
    </div>
    </div>
</div>
<div class="score-board">
    <h2>Score</h2>
    <div class="scores">
    <div class="score1">
        <div class="decrement" on:click={()=>{update(1,0)}}>
            <i class="fas fa-minus"></i>
        </div>
        {game.score.team_1}
        <div class="increment" on:click={()=>{update(1,1)}}>
            <i class="fas fa-plus"></i>
        </div>
    </div>
    <div class="score2">
        <div class="decrement" on:click={()=>{update(2,0)}}>
            <i class="fas fa-minus"></i>
        </div>
        {game.score.team_2}
        <div class="increment" on:click={()=>{update(2,1)}}>
            <i class="fas fa-plus"></i>
        </div>
        </div>
    </div>
</div>
<style>
    h1{
        text-align: center;
    }
    .gameContainer{
       width: 40%;
       margin: auto;
    }
    .players{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        font-size: 1.3em;
    }
    .players .team_1, .players .team_2{
        font-size: 1.4em;
        font-weight: bold;
        text-transform: uppercase;
    }
    .players .team_1{
        color: rgb(3, 60, 3);
    }
    .players .team_2{
        color: rgb(155, 57, 19);
    }
    .score-board{
        width: 50%;
        margin: auto;
        
    }
    .score-board h2{
        text-align: center;
    }
    .score-board .scores{
        display: flex;
        justify-content: center;
        gap: 200px;
    }
    .scores .score1,.scores .score2{
        display: flex;
        gap: 10px;
        font-size: 2em;
    }
    .scores i{
        font-size: 0.8em;
    }
    .score1{
        color: rgb(3, 60, 3);
    }
    .score2{
        color: rgb(155, 57, 19);
    }
    
    
</style>