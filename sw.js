const VERSION = 'v1';

/**
 * ServiceWorker: Event install
 */
self.addEventListener('install', event => {
    event.waitUntil(precache())
});

/**
 * ServiceWorker: Event fetch
 */
self.addEventListener('fetch', event => {
    const request = event.request;

    //Solo para peticiones GET
    if (request.method !== 'GET') return;

    //Buscar en caché
    event.respondWith(cachedResponse(request));

    //Actualizar caché
    event.waitUntil(updateCache(request))
});

/**
 * Instala el caché
 * @returns {Promise} Elementos cargados en caché
 */
async function precache() {
    const cache = await caches.open(VERSION);
    return cache.addAll([
        '/',
        '/index.html',
        '/src/index.js',
        '/src/module/MediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/BigBuckBunny.mp4'
    ]);
}

/**
 * Actualiza datos en caché
 * @param {Request} request 
 * @returns {Promise} Caché
 */
async function updateCache(request) {

    //Abrimos el caché
    const cache = await caches.open(VERSION);

    //Obtenemos la copia actualizada del fech
    const response = await fetch(request);

    //Asignamos contenido a caché
    return cache.put(request, response);
}

/**
 * Obtenemos el caché del request
 * @param {Request} request 
 * @returns {Promise} Caché
 */
async function cachedResponse(request) {

    //Abrimos el caché
    const cache = await caches.open(VERSION);

    //Validamos si en el caché hay respuesta al request
    const respose = await cache.match(request);

    //Retornamos la respuesta si existe, si es undefined hacemos fetch(request)
    return respose || fetch(request);
}