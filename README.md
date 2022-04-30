# MediaPlayer (JavaScript)

Este proyecto utiliza diferentes conceptos de JavaScript, implementados para el respectivo proyecto. Instalación - Ejecución:

```cmd
npm i
npm start
```

# SCOPE

Ámbito de una variable, representa el alcance de una variable.

## Global Scope: Las variables globales son accesibles desde cualquier lugar de nuestro código.

- Variables (var) tiene alcance global

```JavaScript
var variableGlobal = 'Variable global'
variableGlobal = 'Variable global'
```
		
## Function - Local Scope: Las variables solo van a tener alcance dentro del ámbito creado.

Variables declaradas dentro de una función utilizando ***var*** sólo visibles dentro de ella misma (incluyendo los argumentos que se pasan a la función).

```JavaScript
function variables() {
    var variableLocal = 'esto es una variable local';
    console.log(variableLocal); // esto es una variable local
}
```
	
## Block Scope: Desde ES2015 contamos con los keyword let y const.

Esto nos permite tener un scope de bloque, esto quiere decir que las variables solo van a tener alcance dentro del bloque de código: ***{ }***

- Variables (let - const) tienen alcance de block scope.

```JavaScript
function block() {
	
	//Variable: count - Acceso únicamente dentro de la función
	const count = 5;
	
	//Variable: i - Acceso únicamente dentro del ciclo for
	for(let i = 0; i < count; i++  ) {
		console.log(i);
	}
	
	console.log(i); // Error, no se tiene acceso a la variable: i	
}
```			
		
## Module Scope: Límita el alcance de las variables al módulo

```html
<script type="module" src="/src/index.js"></script>
```

# CLOSURE

Una clausura o closure es una función que guarda referencias del estado adyacente (ámbito léxico).

- Permite declarar variables privadas
- Retornar objetos con funciones

```JavaScript
/**
 * Calc (Closure): Calcular
 * @param {Number} n Valor numérico
 * @returns {Object} Closure 
 */
function calc(n) {
    let valor = n; //Variable privada
    return {
        getValor: () => { return valor; },
        increment: () => { valor += 1; },
        decrement: () => { valor -= 1; }
    };
}

//Crea una variable y asigna función
const v = calc(10);

//Obtener el valor
console.log(v.getValor());

//Incrementar
v.increment();

//Decrementar
v.decrement();

//Obtener valor
console.log(v.getValor());
```

# IIFE: Expresión de función ejecutada inmediatamente

```JavaScript
(function () {
    let color = 'green';

    function printColor() {
        console.log(color); //green
    }

    printColor();
})();
```

# CALL 

El método ***call()*** llama a una función con un valor dado ***this*** y con argumentos provistos individualmente.

```JavaScript
/**
 * Saludar
 * @param {String} color 
 */
function saludar(color) {
    console.log(`Hola, ${this.name} ${this.apellido}. Te gusta el color ${color}`);
}

//Objeto
const persona = { name: 'Johan', apellido: 'Esteban' };

//En este caso enviamos persona como {this} en el primer parámetro y posterior son los argumentos
saludar.call(persona, 'rojo'); 
}
```

# APPLY

El método ***apply()*** invoca una determinada función asignando explícitamente el objeto ***this*** y un array o similar (array like object) como parámetros (argumentos) para dicha función.

```JavaScript
//En este caso enviamos persona como this en el primer parámetro y posterior los argumentos en array
saludar.apply(persona, ['rojo']); 
```

# BIND

Crea una nueva función, que cuando es llamada, asigna a su operador  ***this*** el valor entregado, con una secuencia de argumentos dados precediendo a cualquiera. entregados cuando la función es llamada. 

El valor de ***this*** es ignorado cuando la función es llamada con el operador ***new***.

```JavaScript

//Objeto
const valores = {name: 'Johan', apellido: 'Esteban'};

//Enlazamos el this
const personaSaluda = saludar.bind(valores);

//Invoca la función con los argumentos
personaSaluda('rojo'); 
```

# GENERATORS

Se adiciona el símbolo **(*)** asterísco junto a la palabra keyword ***function***. Los generadores son funciones especiales, pueden pausar su ejecución y luego volver al punto donde se quedaron recordando su scope.

Algunas de sus características:
-
- Los generadores retornan una función.
- Inician suspendidos y se tiene que llamar ***next*** para que ejecuten.
- Regresa un value y un boolean done define si ya terminaron sue ejecución.
- **yield** es la instrucción que regresa un valor cada vez que llamamos a ***next*** y detiene la ejecución del generador.

```JavaScript
/**
 * makerGeneratorWithReset (Generator): Incrementa valores
 */
function* makerGeneratorWithReset() {
	let id = 1;
	let reset;
	while(true){
		reset = yield id;
		id = (reset) ? 1 : id + 1; //Reinicia si el valor enviado es true
	}
}

//Crea variable y se asigna la función
const gen = makerGeneratorWithReset();

gen.next();     //Value = 1
gen.next();     //Value = 2
gen.next();     //Value = 3
gen.next(true); //Value = 1 - Reinicia el valor
```

# GETTERS / SETTERS

Son, en esencia, funciones que se ejecutan para obtener (“get”) y asignar (“set”) un valor, pero que para un código externo se ven como propiedades normales.

Las propiedades de acceso se construyen con métodos de obtención ***“getter”*** y asignación ***“setter”***. En un objeto literal se denotan con **get** y **set**:

```JavaScript
const player = {
    namePlayer: 'Johan',
    agePlayer: null,
    get data() { return `Player: ${this.namePlayer} - Age: ${this.agePlayer}` },
    set age(value) { this.agePlayer = value }
};

//Asigna directamente los valores
player.age = 21;

//Obtiene los datos del jugador
console.log(player.data()); //Player: Johan - Age: 21
```