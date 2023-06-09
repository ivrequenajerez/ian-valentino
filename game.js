// Project Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/*Estilos*/

canvas.width = window.innerWidth; // Ajustamos el tamaño del canvas a toda la ventana del navegador
canvas.height = 576;

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
        this.position.x += this.velocity.x;
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

// Clase que representa una plataforma:
class Platform {
    constructor({ x, y, platform }) {
        this.position = {
            x:x,
            y:y
        }
        this.height=20;
        this.width=200;

        this.platform = platform;
        this.width = platform.width;
        this.height = platform.height;

    }

    draw() {
        c.drawImage(this.platform, this.position.x, this.position.y);
    }
}

class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }
        this.height = 20;
        this.width = 200;

        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

}

let platform = new Image();
platform.src = './img/plataforma2.4.png';

console.log(platform);
/*
let platform2 = new Image();
platform2.src = './img/plataforma1.png';

console.log(platform2);
*/
let background = new Image();
background.src = './img/background.png';

console.log(background);

let bilbil = new Image();
bilbil.src = './img/bil-bil2.png';

console.log(bilbil);

// Instancia del jugador
const player = new Player(100, 100, 100, 100);
// Instancia de las plataformas
const platforms = [
    new Platform({x:-1800, y:500, platform}),
    new Platform({x:-1800, y:547, platform}),
    new Platform({x:-1700, y:547, platform}),
    new Platform({x:-1600, y:547, platform}),
    new Platform({x:-1500, y:547, platform}),
    new Platform({x:-1400, y:547, platform}),
    new Platform({x:-1300, y:547, platform}),
    new Platform({x:-1200, y:547, platform}),
    new Platform({x:-1100, y:547, platform}),
    new Platform({x:-1000, y:547, platform}),
    new Platform({x:-900, y:547, platform}),
    new Platform({x:-800, y:547, platform}),
    new Platform({x:-700, y:547, platform}),
    new Platform({x:-600, y:547, platform}),
    new Platform({x:-500, y:547, platform}),
    new Platform({x:-400, y:547, platform}),
    new Platform({x:-300, y:547, platform}),
    new Platform({x:-200, y:547, platform}),
    new Platform({x:-100, y:547, platform}),
    new Platform({x:0, y:547, platform}),
    new Platform({x:platform.width, y:547, platform}),
    new Platform({x:300, y:547, platform}),
    new Platform({x:400, y:547, platform}),
    new Platform({x:520, y:460, platform}),
    new Platform({x:500, y:547, platform}),
    new Platform({x:600, y:547, platform}),
    new Platform({x:700, y:547, platform}),
    new Platform({x:700, y:360, platform}),
    new Platform({x:800, y:547, platform}),
    new Platform({x:900, y:547, platform}),
    new Platform({x:1000, y:547, platform}),
    new Platform({x:1100, y:547, platform}),
    new Platform({x:1200, y:547, platform}),
    new Platform({x:1300, y:547, platform}),
    new Platform({x:1400, y:547, platform}),
    new Platform({x:1500, y:547, platform}),
    new Platform({x:1600, y:547, platform}),
    new Platform({x:1700, y:547, platform}),
    new Platform({x:1800, y:547, platform}),
    new Platform({x:1900, y:547, platform}),
    new Platform({x:2000, y:547, platform}),
    new Platform({x:2100, y:547, platform}),
    new Platform({x:2200, y:547, platform}),
    new Platform({x:2300, y:547, platform}),
    new Platform({x:2400, y:547, platform}),
    new Platform({x:2500, y:547, platform}),
    new Platform({x:2600, y:547, platform}),
    new Platform({x:2700, y:547, platform})
];
   
const genericObjects = [
    new GenericObject({
        x: 0,
        y: 0,
        image: background
    }),
];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

// Variable para controlar si el jugador está saltando o no
let isJumping = false;

//player.draw();
//player.update();

// Opción de que termine el juego debido a que llega hasta cierto punto
let scrollOffset = 0;

// Creamos una función que va a llamar en bucle la función update, para así animar nuestro jugador
// Función que se ejecuta en cada frame para animar el canvas
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height);

    genericObjects.forEach(genericObject => {
        genericObject.draw();
    })
    
    platforms.forEach(platform => {
        platform.draw();
    })

    player.update();

    if (keys.right.pressed &&
        player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed &&
        player.position.x > 100) {
        player.velocity.x = -5;
    } else { 
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach((platform) => {
                platform.position.x += 5;
            })
        }
    }

    // Condicional para controlar salto
    if (player.position.y !== 400) {
        isJumping = false;
        platforms.forEach((platform) => {
            if (player.position.y + player.height >= platform.position.y && player.position.y <= platform.position.y + platform.height) {
                isJumping = true;
            }
        });
    }

    // Colisión de dos figuras
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            
            player.velocity.y = 0;

        }
    })

    if (scrollOffset >= 2000) {
        player.position.x = 0;
        player.position.y = 0;
        scrollOffset = 0;
        console.log('Fin del juego');
    }

}

animate();

// Agregamos un "event listener" al objeto global "window" que escucha el evento "keydown"
window.addEventListener('keydown', ({ code }) => {
    // Dentro de la función que se ejecuta cuando ocurre el evento, imprimimos en la consola el valor de la variable "code"
    switch (code) {
        case 'KeyA':
            console.log('left');
            keys.left.pressed = true;
            break;
        case 'KeyS':
            console.log('down');
            break;
        case 'KeyD':
            console.log('right');
            keys.right.pressed = true;
            break;
        case 'KeyW': // salto
            console.log('up');
            if (!isJumping && player.velocity.y === 0) {
                isJumping = true;
                player.velocity.y -= 10;
            }
            break;
        default:
            break;
    }

    console.log(keys.right.pressed);
});



window.addEventListener('keyup', ({ code }) => {
    switch (code) {
        case 'KeyA':
            console.log('left');
            keys.left.pressed = false;
            break;
        case 'KeyS':
            console.log('down');
            break;
        case 'KeyD':
            console.log('right');
            keys.right.pressed = false;
            break;
        case 'KeyW':
            console.log('up');
            break;
        default:
            break;
    }

    console.log(keys.right.pressed);
});