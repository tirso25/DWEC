let opciones = ['piedra', 'papel', 'tijera'];
let jugadasTodas = [];
let ultimaspartidas = [];
let jugadaActual = {};
let jugadaopci = {};
let stats = {
    partidasJugadas: 0,
    partidasGanadas: 0,
    partidasPerdidas: 0,
    partidasEmpatadas: 0,
    porcentajeVictorias: 0
};
let salvar = true;

console.log("ESCRIBE menu()");

function guardadas() {
    if (window.localStorage.getItem('jsonjugadasTodas')) {
        console.log("YA HAY UNA PARTIDA ALMACENADA EN LA MEMORIA, DESEAS CONTINUAN?")
        console.log("ESCRIBE si() / no()");
    } else {
        console.log("NO HAY PARTIDAS GUARDADAS");
    }
}

function si() {
    salvar = true;
    test();
}

function no() {
    salvar = false;
    test();
}

function test() {
    if (!salvar) {
        reiniciar();
    } else {
        let jugadasTodasVUELTA = JSON.parse(window.localStorage.getItem('jsonjugadasTodas'));
        let ultimaspartidasVUELTA = JSON.parse(window.localStorage.getItem('jsonjugadasTodas'));
        let statsVUELTA = JSON.parse(window.localStorage.getItem('jsonstats'));

        jugadasTodas = [...jugadasTodasVUELTA];
        ultimaspartidas = [...ultimaspartidasVUELTA]
        let keys = Object.keys(stats);
        for (let i in keys) {
            let key = keys[i];
            if (statsVUELTA[key] !== undefined) {
                stats[key] = statsVUELTA[key];
            }
        }
    }
}

function menu() {
    guardadas();
    console.log("*  PARA JUGAR ESCRIBE :  *");
    console.log("       jugar('piedra')");
    console.log("       jugar('papel')");
    console.log("       jugar('tijera')");
    console.log("*  PARA VER ESTADISTICAS ESCRIBE :  *");
    console.log("       estadisticas()");
    console.log("*  PARA REINICIAR ESCRIBE :  *");
    console.log("       reiniciar()");
    console.log("*  PARA VER MENU ESCRIBE :  *");
    console.log("       menu()");
    console.log("*  PARA VER UTIMAS 10 PARTIDAS ESCRIBE :  *");
    console.log("       verUltimasPartidas()");
    console.log("*  PARA LIMPIAR LA PANTALLA ESCRIBE :  *");
    console.log("       limpiar()");
}

function comprobarJanador(opcion, opcionBot) {
    if (opcion != 'piedra' && opcion != 'papel' && opcion != 'tijera') {
        console.warn("OPCION NO VALIDA");
    } else {
        //COMPROBAR EMPATES
        if (opcion == 'piedra' && opcionBot == 'piedra' || opcion == 'papel' && opcionBot == 'papel' || opcion == 'tijera' && opcionBot == 'tijera') {
            console.log("=============================");
            console.log("JUGADA JUGADOR : " + opcion);
            console.log("JUGADA BOT : " + opcionBot);
            console.log('EMPATE');
            console.log("=============================");
            stats.partidasEmpatadas++;
        }
        //COMPROBRA JANADOR
        else if (opcion == 'piedra' && opcionBot == 'tijera' || opcion == 'tijera' && opcionBot == 'papel' || opcion == 'papel' && opcionBot == 'piedra') {
            console.log("=============================");
            console.log("JUGADA JUGADOR : " + opcion);
            console.log("JUGADA BOT : " + opcionBot);
            console.log('GANASTE');
            console.log("=============================");
            stats.partidasGanadas++;
        }

        else if (opcion == 'piedra' && opcionBot == 'papel' || opcion == 'tijera' && opcionBot == 'piedra' || opcion == 'papel' && opcionBot == 'tijera') {
            console.log("=============================");
            console.log("JUGADA JUGADOR : " + opcion);
            console.log("JUGADA BOT : " + opcionBot);
            console.log('PERDISTE');
            console.log("=============================");
            stats.partidasPerdidas++;
        }
        stats.partidasJugadas++;
        stats.porcentajeVictorias = (stats.partidasGanadas / stats.partidasJugadas) * 100;

        let jugadaActual = {
            turno: stats.partidasJugadas,
            ganadas: stats.partidasGanadas,
            perdidas: stats.partidasPerdidas,
            empates: stats.partidasEmpatadas,
            porcentaje: stats.porcentajeVictorias,
            jugadaopci: {
                jugador: opcion,
                bot: opcionBot
            }
        };
        console.log(jugadaActual);
        if (ultimaspartidas.length < 10) {
            ultimaspartidas.push(jugadaActual);
        } else {
            ultimaspartidas.shift();
            ultimaspartidas.push(jugadaActual);
        }

        jugadasTodas.push(jugadaActual);

        window.localStorage.setItem('jsonultimaspartidas', JSON.stringify(ultimaspartidas));
        window.localStorage.setItem('jsonjugadasTodas', JSON.stringify(jugadasTodas));
        window.localStorage.setItem('jsonstats', JSON.stringify(stats));
    }
}

function jugar(opcion) {
    let tiradaBot = parseInt(Math.random() * (opciones.length));
    let opcionBot = opciones[tiradaBot];
    comprobarJanador(opcion, opcionBot);
}

function estadisticas() {
    console.log(jugadasTodas)
}

function reiniciar() {
    stats = {
        partidasJugadas: 0,
        partidasGanadas: 0,
        partidasPerdidas: 0,
        partidasEmpatadas: 0,
        porcentajeVictorias: 0
    };
    jugadasTodas = [];
    ultimaspartidas = [];
    jugadaopci = {};
    window.localStorage.clear();
    limpiar();
}

function verUltimasPartidas() {
    console.log(ultimaspartidas);
}

function limpiar() {
    console.clear();
    menu();
}