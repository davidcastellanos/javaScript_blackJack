/*
* C = CLUBS
* D = DIAMONDS
* H = HEARTS
* S = SPADES
*
* */

//Inicializaciones
let deck                = [];
const tipos             = [ 'C', 'D', 'H', 'S' ];
const cartas_especiales = [ 'A', 'J', 'Q', 'K', ];


let puntosJugador     = 0,
    puntosComputadora = 0;



// Referencias del HTML
const botonPedir = document.querySelector('#btnPedir' );
const botonPlantarse = document.querySelector('#btnPlantarse' );
const botonNuevoJuego = document.querySelector('#btnNuevo' );
const conteoPuntosHTML = document.querySelectorAll( 'small' );
const divCartasJugador = document.querySelector( '#jugador-cartas' );
const divCartasComputadora = document.querySelector( '#computadora-cartas' );



// ésta función crea una nueva baraja
const crearDeck = ( ) => {

    for ( let i = 2; i <= 10; i++ ) {
        for ( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }

    for ( let tipo of tipos) {
        for ( let esp of cartas_especiales ) {
            deck.push( esp + tipo );
        }

    }
    // console.log( deck );
    // El shuffle es una librería importada que pone random los elementos de un arreglo
    deck = _.shuffle( deck );
    // console.log( deck );
    return deck;
};
crearDeck(); // Llamado de la función



// ésta función me permite tomar una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay más cartas en la Baraja';
    }
    const cartaTomada = deck.pop() ; // Tomo el ultimo elemento y lo retorno

    // console.log( deck ); // Deck con nuevo tamaño
    // console.log( cartaTomada ); // Carta tomada mediante pop
    return cartaTomada;

};

// pedirCarta();



/* TURNO DE LA COMPUTADORA*/
const turnoComputadora = ( puntosMinimosJugador ) => {
     do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    conteoPuntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img')
    imgCarta.src = ` assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );
    divCartasComputadora.append( imgCarta );

    if ( puntosMinimosJugador > 21 ){
        break;
    }

     } while (  (puntosComputadora < puntosMinimosJugador) && puntosMinimosJugador <= 21 );

     setTimeout( () => {

         if ( puntosMinimosJugador === puntosComputadora ){
             alert('Empate, nadie Gana');
         } else if ( puntosMinimosJugador > 21 ) {
             alert( 'Gana Computadora' );
         } else if (puntosComputadora > 21  ) {
             alert( 'Gana Jugador' )
         } else {
             alert( 'Gana Computadora' );
         }

     }, 25 );



}



// ésta función recoge el valor de la carta y lo asigna COMO puntos acumulados
const valorCarta = ( cartaTomada ) => {
    const valor = cartaTomada.substring( 0, cartaTomada.length - 1 ); // parte la carta tipo splice, y escoge all menos el último indice
    return ( isNaN( valor ) ) ?          // comprueba si es una letra (o no es un número)
       ( valor === 'A' ) ? 11 : 10      // si es una letra y además es igual a la A le da valor de 11
        : valor * 1;                     // si es número, La multiplicación por 1 convierte el dato str a número

    /* MANERA LARGA DE HACERLO*/
    // let puntos = 0;
    // // console.log( { valor } ); 2 = 2, - 10 = 10, j = j
    // if ( isNaN( valor ) ) {
    //     console.log( 'No es un número' );
    //
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    //
    // } else {
    //     console.log( 'Es un número' );
    //     puntos = valor * 1; // La multiplicación por 1 me convierte el valor de str a numero
    // }
    //
    // console.log( puntos + puntos ); // para probar si si se conviertieron en numeros
    /* FIN*/

}
// const valorFinal = valorCarta( pedirCarta() ); // aquí paso la función anterior como parámetro de ésta y recibo el nuevo resultado
// console.log( { valorFinal } );




/* EVENTOS */
botonPedir.addEventListener( 'click', () => {
    const carta = pedirCarta(); // trae el el valor obtenido de la función pedirCarta donde se hace el POP

    puntosJugador = puntosJugador + valorCarta( carta ); // Suma los puntos - Sólo el substring
    conteoPuntosHTML[0].innerText = puntosJugador; // modifica los puntos del jugador y no del pc


    /* Se van a mostrar las imágenes en el HTML cuando se presione el botón pedir */

    // <img class="carta" src="assets/cartas/3C.png" alt="Carta de Póker">
    const imgCarta = document.createElement('img') // Crea un tag tipo img
    imgCarta.src = ` assets/cartas/${ carta }.png`; // se usan backtips para que el método src tome las cartas no hardcodeadas
    imgCarta.classList.add( 'carta' ); // se le asigna la clase carta creada en ek css que determina tamaño y posición de las img cartas

    divCartasJugador.append( imgCarta ); // una vez creado el tap img con todas sus caracteristicas, se le asigna esto al div html de imagenes jugador


    // Deteniendo conteo cuando sea igual o supere el 21:

    if ( puntosJugador > 21 ) {
        console.warn( 'Lo siento mucho, perdiste' );
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
        console.warn( '21, Genial!!!!' );
        botonPedir.disabled = true;
        botonPlantarse.disabled = true;
        turnoComputadora( puntosJugador );
    }


} );




botonPlantarse.addEventListener( 'click', () => {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    turnoComputadora( puntosJugador );
});

botonNuevoJuego.addEventListener( 'click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    conteoPuntosHTML[0].innerText = 0;
    conteoPuntosHTML[1] .innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    botonPedir.disabled = false;
    botonPlantarse.disabled = false;
});