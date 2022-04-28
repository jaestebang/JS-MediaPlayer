//MediaPlayer
function MediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];

    this._initPlugins();

}

//Prototipo Ini Plugins - MediaPlayer
MediaPlayer.prototype._initPlugins = function () {
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
        get muted() { return this.media.muted; },
        set muted(value) { this.media.muted = value }
    }

    this.plugins.forEach(plugin => {
        plugin.run(player);
    });
}

//Prototipo Play - MediaPlayer
MediaPlayer.prototype.play = function () {
    this.media.play();
}

//Prototipo Pause - MediaPlayer
MediaPlayer.prototype.pause = function () {
    this.media.pause();
}

//Prototipo TooglePlay - MediaPlayer
MediaPlayer.prototype.tooglePlay = function () {
    (this.media.paused) ? this.media.play() : this.media.pause();
}

//Prototipo ToogleMute - MediaPlayer
MediaPlayer.prototype.toogleMute = function () {
    this.media.muted = (this.media.muted) ? false : true;

}

//Exporta módulo
export default MediaPlayer;