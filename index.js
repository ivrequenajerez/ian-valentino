// Project Setup

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/*Estilos*/

canvas.width = window.innerWidth; // Ajustamos el tamaño del canvas a toda la ventana del navegador
canvas.height = window.innerHeight;

/*FIN Estilos*/

// console.log(c);

// Gravedad:
// Definimos una constante para la gravedad
const gravity = 0.5;
// Clase que representa al jugador:
class Player {
    // Propiedades que definen al jugador (Player)
    // Constructor de Player
    constructor() {
        // Le añadimos las características base de un cuadrado inicialmente
        // Nuestro jugador tiene una posicion en el espacio
        this.position = {
            x:100,
            y:100
        };
        this.velocity = {
            x:0,
            y:1
        };
        this.width = 30;
        this.height = 30;
    }
    // Crear un jugador:
    // Función que dibuja al jugador en el canvas
    draw() {
        // ¿Cómo dibujamos al jugador con Canvas?:
        // Seleccionamos el contexto de nuestro canvas
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height); // Accedemos a su fillRect
        // En fillRect añadimos la posición en la que queremos dibujar al jugador (x,y,w,h)
        // "La función FillRect rellena un rectángulo mediante el pincel especificado."
    }
    
    // Creamos una función que cambie las propiedades de nuestro jugador (en cada frame)
    update() {
        this.draw(); 
        this.position.y += this.velocity.y;

        // Creamos una condición
        if (this.position.y + this.height + this.velocity.y <= canvas.height ) {
            // Si el jugador no ha llegado al límite inferior del canvas, se aplica la gravedad
            this.velocity.y += gravity;    
        } else {
            // Si el jugador ha llegado al límite inferior del canvas, su velocidad vertical se pone a cero
            this.velocity.y = 0;
        } 
    }
}
// Instancia del jugador
const player = new Player(100, 100, 100, 100);
//player.draw();
//player.update();

// Creamos una función que va a llamar en bucle la función update, para así animar nuestro jugador
// Función que se ejecuta en cada frame para animar el canvas
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
}

animate();

// Agregamos un "event listener" al objeto global "window" que escucha el evento "keydown"
window.addEventListener('keydown', () => {
    // Dentro de la función que se ejecuta cuando ocurre el evento, imprimimos en la consola el valor de la variable "keydown"
    console.log('keydown');
});