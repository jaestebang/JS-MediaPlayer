/**
 * Plugin: Auto Pause
 */
class AutoPause {

    /**
     * Constructor vacío
     */
    constructor() {
        this.threshold = 0.25;
        this.handleIntersection = this.handleIntersection.bind(this);  //Instanciamos el método con el this de la clase
        this.handleVisibilitychange = this.handleVisibilitychange.bind(this); //Instanciamos el método con el this de la clase
    }

    /**
     * Pausa automáticamente
     * @param {Object} player Objeto creado de tipo player
     */
    run(player) {
        this.player = player;

        //Creamos un intersection observer
        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold //Porcentaje de intesección a observar
        })

        //Iniciamos la observación
        observer.observe(this.player.media)

        //Creamos Event Listener (Cambiar de pestaña)
        document.addEventListener("visibilitychange", this.handleVisibilitychange);
    }

    /**
     * Handle document visibilitychange
     */
    handleVisibilitychange() {
        
        //Valida si la pestaña del DOM es visible
        (document.visibilityState === 'visible') ? this.player.play() : this.player.pause();
    }

    /**
     * Función intersectora
     * @param {IntersectionObserverEntry} entries 
     */
    handleIntersection (entries) {
        const entry = entries[0];
        (entry.intersectionRatio >= this.threshold) ? this.player.play() : this.player.pause();
    }

}

export default AutoPause;