/**
 * Plugin Auto Play
 */
function AutoPlay() {

    //Prototipo Run - AutoPlay
    AutoPlay.prototype.run = function (player) {
        player.muted = true;
        player.play();
    }

}

//Exporta
export default AutoPlay;