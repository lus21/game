"use strict";
console.log('js is here');
let color_sequence = [], game_in_progress = false,player_moves = [], audios = [], player_move_index = 0, sequence_in_progress = false;
for (let i = 1; i <= 4; i++) {
    audios[i] = new Audio('public/audio/sound' + i + '.mp3');
}
function colorClick(color_js){
    let  player_move, random_number, audio, player_last_step_index, sectors;
    if (!game_in_progress || sequence_in_progress) {
        return;
    }
    player_move = color_js.dataset.id;
    player_last_step_index = (player_moves.length == 0 ? 1 : player_moves.length + 1);
    if (color_sequence[player_move_index] == player_move) {
        player_move_index += 1;
        audio = new Audio('public/audio/sound' + player_move + '.mp3');
        document.getElementsByClassName('color')[player_move - 1].className += " active";
        audio.play();
        audio.onended = function () {
            document.getElementsByClassName('color')[player_move - 1].classList.remove('active');
        };
    } else {
        audio = new Audio('public/audio/end.mp3');
        document.getElementsByClassName('color')[color_sequence[player_move_index] - 1].className += " active";
        audio.play();
        audio.onended = function () {
            document.getElementsByClassName('color')[color_sequence[player_move_index] - 1].classList.remove('active');
            document.getElementById('score').innerText = 0;
            sectors = document.getElementsByClassName('color');
            for (let sector of sectors) {
                sector.className += ' color_hover_active';
            }
            player_move_index = 0;
            player_moves = [];
            color_sequence = [];
            game_in_progress = false;
        };
    }
    if (player_move_index == player_last_step_index) {
        document.getElementById('score').innerText = (player_move_index * 10);
        player_moves.push(player_move);
        audio = new Audio('public/audio/sound' + player_move + '.mp3');
        document.getElementsByClassName('color')[player_move - 1].className += " active";
        audio.play();
        audio.onended = function () {
            document.getElementsByClassName('color')[player_move - 1].classList.remove('active');
            random_number = Math.floor(Math.random() * 4 + 1);
            color_sequence.push(random_number);
            player_move_index = 0;
            animate_sequence(color_sequence.length - 1);
        };
    }
}
function animate_sequence(animate_length, animate_index = 0) {
    sequence_in_progress = true;
    setTimeout(function() {
        let sectors, audio, current_color;
        current_color = color_sequence[animate_index];
        sectors = document.getElementsByClassName('color');
        audio = new Audio('public/audio/sound' + current_color + '.mp3');
        sectors[current_color - 1].className += " active";
        audio.play();
        audio.onended = function () {
            sectors[current_color - 1].classList.remove('active');
        };
        if (animate_index < animate_length) {
            animate_index += 1;
            animate_sequence(animate_length, animate_index)
        } else {
            sequence_in_progress = false;
        }
    }, 1000);
}
function startGame() {
	let random_number, sectors, audio;
	if(!game_in_progress){
        random_number = Math.floor(Math.random() * 4 + 1);
        sectors = document.getElementsByClassName('color');
        for (let sector of sectors) {
            sector.classList.remove('color_hover_active');
        }
        sectors[random_number -1].className += " active";
        color_sequence.push(random_number);
        game_in_progress = true;
        sequence_in_progress = true;
        audio = new Audio('public/audio/sound' + random_number + '.mp3');
        audio.play();
        audio.onended = function () {
            sectors[random_number -1].classList.remove('active');
            sequence_in_progress = false;
        }
	}
}
// function endAudio(audio, number) {
//     document.getElementsByClassName('color')[number].classList.remove('active');
// }
