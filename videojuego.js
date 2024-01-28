
window.onload = function () {
    document.getElementById("nombre").value = "";
    const TAMAÑOCANVAX = 1300;
    const TAMAÑOCANVAY = 800;

    const flechaDerecha = 39;
    const flechaIzquierda = 37;
    const flechaArriba = 38;
    const flechaAbajo = 40;
    const ESPACIO = 32;

    let pantalla = 0;

    const transicion_ = document.getElementById("transicion");
    const transicionInicial_ = document.getElementById("transicionInicial");
    const papiro = document.getElementById("papiro");
    let informacion = document.getElementById('informacion');
    let barraVida = document.getElementById('barraVida');
    let barraGolpeo = document.getElementById('barraGolpeo');
    let informacionGolepo = document.getElementById('informacionGolpeo');
    let lista = document.getElementById('lista_records');
    let idesqueleto;
    let imagenesqueleto;
    let miEsqueleto;
    let esqueletos = [];
    let daño = 1;

    let idwarrior;
    let miWarrior;
    let imagenwarrior;
    let posicionwarrior = 27; //Posicion inicial para que el guerrero aparezca de frente
    let xDerecha, xIzquierda, yArriba, yAbajo;

    let portales = [];
    let posicion1 = 100;
    let posicion2 = 433;
    let posicion3 = 866;
    let posicion4 = 1159;

    let botonReiniciar;

    let rocas = [new Roca(0, 30), new Roca(70, 98), new Roca(150, 30), new Roca(330, 30), new Roca(400, 98), new Roca(480, 30), new Roca(760, 30), new Roca(910, 30), new Roca(830, 98), new Roca(1050, 30), new Roca(1195, 30), new Roca(1118, 98)];

    let transicionCompletada = false;
    let idtrancision0;
    let idcompronacionchoque;
    let comprobarColisiontrasTransicion = false;
    let poderGolpear = true;
    let colisionando = false;
    let alternadorDeTexto = 1;
    let explotar = true;
    let juegoCompletado = false;
    let minutos = 0;
    let record;
    let segundos = 0;
    let contador;
    let nombre;
    let records = [];
    let tema_principal = document.getElementById("tema_principal");
    let audioDesenterrarDiamante = document.getElementById("desenterrarDiamante");
    let recogerDiamante = document.getElementById("cogerDiamante");
    let audioCaminar = document.getElementById("caminar");
    let explosion = document.getElementById("explosion");

    function Warrior() {

        this.posicionx = 640;
        this.posiciony = 330;
        this.tamañox = 30;
        this.tamañoy = 68;
        this.velocidad = 15;
        this.tamañorecorteX = 37;
        this.tamañorecorteY = 48;
        this.orientacion = 4;
        this.golpeo = false;
        this.vidas = 100;
        this.golpeado = false;
    }

    Warrior.prototype.animacionWarrior = [[14, 718], [78, 720], [142, 720], [205, 720], [268, 720], [331, 720], [395, 720], [460, 719], [525, 719], [21, 591], [82, 592], [148, 591], [213, 591], [277, 591], [340, 592], [404, 590], [469, 591], [533, 591], [10, 527], [74, 527], [138, 528], [202, 528], [267, 527], [331, 527], [395, 527], [460, 528], [523, 527], [17, 655], [81, 655], [145, 655], [210, 655], [273, 655], [337, 655], [401, 655], [465, 656], [529, 655]]; // Posiciones del sprite donde recortar cada imagen
    Warrior.prototype.animacionWarriorGolpeo = [[10, 463], [68, 463], [132, 463], [193, 463], [263, 463], [330, 463], [391, 463], [449, 463], [3, 335], [70, 335], [134, 335], [201, 335], [259, 335], [320, 335], [387, 335], [457, 335], [4, 272], [68, 273], [139, 272], [211, 266], [277, 261], [405, 261], [405, 261], [457, 266], [4, 399], [71, 399], [134, 399], [210, 386], [277, 389], [341, 394], [405, 389], [466, 386]];

    Warrior.prototype.moverDerecha = function () {
        if (!juegoCompletado) {
            this.posicionx += this.velocidad;
            audioCaminar.play();
        }
    }
    Warrior.prototype.moverIzquierda = function () {
        if (!juegoCompletado) {
            audioCaminar.play();

            this.posicionx -= this.velocidad;
        }
    }
    Warrior.prototype.moverArriba = function () {
        if (!juegoCompletado) {
            this.posiciony -= this.velocidad;
            audioCaminar.play();

        }
    }
    Warrior.prototype.moverAbajo = function () {
        if (!juegoCompletado) {
            this.posiciony += this.velocidad;
            audioCaminar.play();

        }
    }
    Warrior.prototype.restarVida = function () {
        this.vidas -= daño;
    }

    function Esqueleto() {
        this.posicionx = 0;
        this.posiciony = 0;
        this.tamañox = 37;
        this.tamañoy = 58;
        this.velocidad = 4;
        this.tamañorecorteX = 30;
        this.tamañorecorteY = 48;
        this.orientacion = 1;
        this.persiguiendo = false;
        this.distanciaRecorrida = 0;
        this.vidas = 5;
        this.xDerechaEsqueleto = true;
        this.xIzquierdaEsqueleto;
        this.yArribaEsqueleto;
        this.yAbajoEsqueleto;
        this.posicionesqueleto = 0;
    }

    Esqueleto.prototype.animacionEsqueleto = [[21, 207 + 1344], [84, 208 + 1344], [150, 207 + 1344], [211, 207 + 1344], [274, 207 + 1344], [336, 208 + 1344], [402, 207 + 1344], [467, 207 + 1344], [532, 206 + 1344], [23, 79 + 1344], [83, 80 + 1344], [149, 79 + 1344], [215, 79 + 1344], [278, 79 + 1344], [340, 80 + 1344], [407, 79 + 1344], [471, 79 + 1344], [535, 79 + 1344], [17, 15 + 1344], [81, 15 + 1344], [145, 15 + 1344], [209, 16 + 1344], [273, 15 + 1344], [337, 15 + 1344], [401, 15 + 1344], [466, 16 + 1344], [529, 15 + 1344], [17, 143 + 1344], [81, 143 + 1344], [145, 143 + 1344], [209, 144 + 1344], [273, 143 + 1344], [337, 143 + 1344], [401, 143 + 1344], [465, 144 + 1344], [529, 143 + 1344]]; // Posiciones del sprite donde recortar cada imagen

    Esqueleto.prototype.moverDerecha = function () {
        this.posicionx += this.velocidad;
    }
    Esqueleto.prototype.moverIzquierda = function () {
        this.posicionx -= this.velocidad;
    }
    Esqueleto.prototype.moverArriba = function () {
        this.posiciony -= this.velocidad;
    }
    Esqueleto.prototype.moverAbajo = function () {
        this.posiciony += this.velocidad;
    }
    //Esta función hace que el esqueleto persiga al guerrero cuando se acerque a x distancia, primero en el eje x y luego en el eje y
    Esqueleto.prototype.perseguirWarrior = function () {

        this.xDerechaEsqueleto = false;
        this.xIzquierdaEsqueleto = false;
        this.yArribaEsqueleto = false;
        this.yAbajoEsqueleto = false;

        const distanciaX = miWarrior.posicionx - this.posicionx;
        const distanciaY = miWarrior.posiciony - this.posiciony;

        if (Math.abs(distanciaX) > this.velocidad) {
            // Mover horizontalmente
            this.posicionx += distanciaX > 0 ? this.velocidad : -this.velocidad;
            this.posiciony = this.posiciony;

            if (miWarrior.posicionx - this.posicionx >= 0) {
                this.orientacion = 1;
                this.xDerechaEsqueleto = true;
            } else {
                this.orientacion = 2;
                this.xIzquierdaEsqueleto = true;
            }

        } else {
            // Mover verticalmente
            this.posicionx = this.posicionx;
            this.posiciony += distanciaY > 0 ? this.velocidad : -this.velocidad;

            if (miWarrior.posiciony - this.posiciony <= 0) {
                this.orientacion = 3;
                this.yArribaEsqueleto = true;
            } else {
                this.orientacion = 4;
                this.yAbajoEsqueleto = true;
            }

        }


    }
    Esqueleto.prototype.restarVida = function () {
        this.vidas--;
    }

    function Mago() {
        this.posicionx = 60;
        this.posiciony = 600;
        this.posicion = 0;
        this.xDerecha;
        this.xIzquierda;
        this.yArriba;
        this.yAbajo;
        this.tamañox = 45;
        this.tamañoy = 65;
        this.tamañorecorteX = 34;
        this.tamañorecorteY = 51;
    }


    Mago.prototype.animacion = [[22, 2593], [24, 2711], [63, 2712], [102, 2711], [141, 2711], [180, 2711], [219, 2712], [257, 2711], [296, 2711]];

    Mago.prototype.moverDerecha = function () {
        this.posicionx += this.velocidad;
        if (this.posicionx > TAMAÑOCANVAX - this.tamañox) {
            this.posicionx = TAMAÑOCANVAX - this.tamañox;
        }
    }
    Mago.prototype.moverIzquierda = function () {
        this.posicionx -= this.velocidad;
        if (this.posicionx > TAMAÑOCANVAX - this.tamañox) {
            this.posicionx = TAMAÑOCANVAX - this.tamañox;
        }
    }
    Mago.prototype.moverArriba = function () {
        this.posiciony -= this.velocidad;
        if (this.posiciony < 0) {
            this.posiciony = 0;
        }
    }
    Mago.prototype.moverAbajo = function () {
        this.posiciony += this.velocidad;
        if (this.posiciony > TAMAÑOCANVAY - this.tamañoy) {
            this.posiciony = TAMAÑOCANVAY - this.tamañoy;
        }
    }

    function Roca(posicionx, posiciony) {
        this.posicionx = posicionx;
        this.posiciony = posiciony;
        this.tamañox = 100;
        this.tamañoy = 100;
        this.tamañorecorteX = 148;
        this.tamañorecorteY = 126;
    }

    Roca.prototype.posicion = [45, 3250];

    function pintarRoca(miRoca) {
        ctx.drawImage(miRoca.imagen,
            miRoca.posicion[0],
            miRoca.posicion[1],
            miRoca.tamañorecorteX,
            miRoca.tamañorecorteY,
            miRoca.posicionx,
            miRoca.posiciony,
            miRoca.tamañox,
            miRoca.tamañoy);
    }

    function pintarRocas() {
        rocas.forEach(element => {
            pintarRoca(element);
        });
    }

    function Portal(posicionx, posiciony, tipo) {
        this.posicionx = posicionx;
        this.posiciony = posiciony;
        this.tamañox = 37;
        this.tamañoy = 90;
        this.tamañorecorteX = 45;
        this.tamañorecorteY = 114;
        this.activo = true;
        this.posicionportal = 0;
        this.tipo = tipo;
        this.dentro = false;
        this.completado = false;
    }

    Portal.prototype.animacion = [[3, 2176], [53, 2179], [103, 2181], [153, 2179], [208, 2178], [258, 2181], [307, 2184], [358, 2181], [413, 2179], [463, 2182], [513, 2185], [563, 2182], [620, 2181], [670, 2184], [619, 2184], [770, 2184]];

    function Bocadillo() {
        this.posicionx = 70;
        this.posiciony = 500;
        this.tamañox = 200;
        this.tamañoy = 150;
        this.tamañorecorteX = 107;
        this.tamañorecorteY = 114;
        this.activo = true;
    }

    Bocadillo.prototype.animacion = [246, 3264];

    function Exclamacion() {
        this.posicionx = 80;
        this.posiciony = 555;
        this.tamañox = 8;
        this.tamañoy = 30;
        this.tamañorecorteX = 18;
        this.tamañorecorteY = 86;
        this.activo = true;
    }

    Exclamacion.prototype.animacion = [410, 3262];

    function Diamante() {
        this.posicionx = Math.floor(Math.random() * (1250 - 400 + 1)) + 400;
        this.posiciony = Math.floor(Math.random() * (745 - 212 + 1)) + 212;
        this.tamañox = 25;
        this.tamañoy = 25;
        this.tamañorecorteX = 37;
        this.tamañorecorteY = 37;
        this.tipo = 1;
        this.posicion = 0;
        this.capturado = false;
        this.visible = false;
        this.activo = true;
    }

    Diamante.prototype.animacion = [[473, 2856], [513, 2856], [555, 2856], [599, 2856], [641, 2856], [684, 2856], [478, 2896], [518, 2896], [559, 2896], [598, 2896], [637, 2896], [678, 2896], [468, 2938], [509, 2938], [550, 2938], [384, 2900], [384, 2942], [384, 2985], [384, 3026], [384, 3068], [384, 3110], [384, 3151], [435, 2854], [431, 2901], [431, 2943], [428, 2985], [427, 3026], [425, 3067], [425, 3109], [425, 3150], [550, 3183], [591, 3059], [633, 3059], [677, 3059], [720, 3059], [599, 3101], [598, 3142], [597, 3183], [636, 3101], [675, 3101], [715, 3101], [632, 3142], [632, 3183], [673, 3142], [714, 3142], [551, 3140], [511, 3018], [514, 3059], [513, 3099], [513, 3140], [513, 3181], [554, 3017], [594, 3017], [634, 3017], [674, 3017], [714, 3017], [714, 2977], [590, 2937], [631, 2937], [672, 2937], [713, 2937], [467, 2977], [508, 2977], [549, 2977], [590, 2977], [631, 2977], [672, 2977], [467, 3018]];
    Diamante.prototype.pista = [691, 2854];


    Diamante.prototype.recoger = function () {
        this.posiciony -= 40;
        if (this.posiciony < -40) {
            this.activo = false;
            this.visible = false;
            miExclamacion.activo = true;
            explotar = true;
        }
    }
    Diamante.prototype.generarDiamante = function () {

        if (esqueletos.length === 0 && !miDiamante.activo && miDiamante.capturado === false) {
            switch (pantalla) {
                case 1:
                    miDiamante.posiciony = Math.floor(Math.random() * (745 - 212 + 1)) + 212;
                    miDiamante.posicionx = Math.floor(Math.random() * (1250 - 400 + 1)) + 400;

                    miDiamante.activo = true; miDiamante.visible = false;
                    miDiamante.tipo = 2;
                    break;
                case 2:
                    miDiamante.posiciony = Math.floor(Math.random() * (745 - 212 + 1)) + 212;
                    miDiamante.posicionx = Math.floor(Math.random() * (1250 - 400 + 1)) + 400;

                    miDiamante.activo = true; miDiamante.visible = false;
                    miDiamante.tipo = 3;
                    break;
                case 3:
                    miDiamante.posiciony = Math.floor(Math.random() * (745 - 212 + 1)) + 212;
                    miDiamante.posicionx = Math.floor(Math.random() * (1250 - 400 + 1)) + 400;

                    miDiamante.activo = true; miDiamante.visible = false;
                    miDiamante.tipo = 4;
                    break;
                case 4:
                    miDiamante.posiciony = Math.floor(Math.random() * (745 - 212 + 1)) + 212;
                    miDiamante.posicionx = Math.floor(Math.random() * (1250 - 400 + 1)) + 400;

                    miDiamante.activo = true; miDiamante.visible = false;
                    miDiamante.tipo = 5;
                    break;
            }
        }



    }
    function Explosion() {
        this.posicionx = rocas[1].posicionx - 3;
        this.posiciony = rocas[1].posiciony - 20;
        this.tamañox = 130;
        this.tamañoy = 130;
        this.tamañorecorteX = 48;
        this.tamañorecorteY = 48;
        this.posicion = 0;
    }

    Explosion.prototype.animacion = [[775, 2736], [722, 2736], [671, 2736], [620, 2735], [768, 2683], [718, 2678], [667, 2678], [617, 2678], [764, 2626], [715, 2626], [668, 2626], [620, 2626]];

    function pintarWarrior() {

        if (miWarrior.golpeo) {

            golpear();

            if (xDerecha) {

                miWarrior.orientacion = 1;
                miWarrior.moverDerecha();

            } else if (xIzquierda) {

                miWarrior.orientacion = 2;
                miWarrior.moverIzquierda();

            } else if (yArriba) {

                miWarrior.orientacion = 3;
                miWarrior.moverArriba();

            } else if (yAbajo) {

                miWarrior.orientacion = 4;
                miWarrior.moverAbajo();

            }

        } else {

            miWarrior.tamañorecorteY = 48;

            if (xDerecha) {

                miWarrior.moverDerecha();
                miWarrior.orientacion = 1;

                caminar();

            } else if (xIzquierda) {

                miWarrior.moverIzquierda();
                miWarrior.orientacion = 2;

                caminar();

            } else if (yArriba) {

                miWarrior.moverArriba();
                miWarrior.orientacion = 3;

                caminar();

            } else if (yAbajo) {

                miWarrior.moverAbajo();
                miWarrior.orientacion = 4;

                caminar();

            }
        }

        for (let i = 0; i < esqueletos.length; i++) {
            if (miWarrior.vidas <= 0 && miWarrior.posicionx < TAMAÑOCANVAX - miWarrior.tamañox) {
                switch (esqueletos[i].orientacion) {
                    case 1:
                        miWarrior.posicionx = esqueletos[i].posicionx + esqueletos[i].tamañox;
                        break;
                    case 2:
                        miWarrior.posicionx = esqueletos[i].posicionx - esqueletos[i].tamañox;
                        break;
                    case 3:
                        miWarrior.posiciony = esqueletos[i].posiciony - esqueletos[i].tamañoy;
                        break;
                    case 4:
                        miWarrior.posiciony = esqueletos[i].posiciony + esqueletos[i].tamañoy;
                        break;
                }
            }
        }

        if (pantalla === 0 || !transicionCompletada) {
            comprobarColisionconRocas();
            comprobarColisionconMago();
        }

        if (miDiamante.activo && !miExclamacion.activo) {
            comprobarColisionconDiamante();
        }

        comprobarFueradeCanva(miWarrior);
        comprobarColisionconPortal();

        if (comprobarColisiontrasTransicion) {
            comprobarColisionEsqueletoWarrior();
        }

        if (!miWarrior.golpeo) {
            // Pintamos el warrior
            ctx.drawImage(miWarrior.imagen, // Imagen completa con todos los comecocos (Sprite)
                miWarrior.animacionWarrior[posicionwarrior][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                miWarrior.animacionWarrior[posicionwarrior][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                miWarrior.tamañorecorteX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
                miWarrior.tamañorecorteY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
                miWarrior.posicionx,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
                miWarrior.posiciony,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
                miWarrior.tamañox,
                miWarrior.tamañoy);
        } else {
            // Pintamos el warrior

            ctx.drawImage(miWarrior.imagen, // Imagen completa con todos los comecocos (Sprite)
                miWarrior.animacionWarriorGolpeo[posicionwarrior][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                miWarrior.animacionWarriorGolpeo[posicionwarrior][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
                miWarrior.tamañorecorteX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
                miWarrior.tamañorecorteY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
                miWarrior.posicionx,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
                miWarrior.posiciony,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
                miWarrior.tamañox,		    // Tamaño X del comecocos que voy a dibujar
                miWarrior.tamañoy);         //  Y del comecocos que voy a dibujar	
        }

    }

    function pintarEsqueleto(miEsqueleto) {

        if (!miEsqueleto.persiguiendo || !comprobarColisiontrasTransicion) {//Si el esqueleto no está persiguiendo, se moverá de forma cuadricular, 200 pixeles para cada lado o hasta que se choque con algún objeto o pared

            if (miEsqueleto.xDerechaEsqueleto) {

                miEsqueleto.distanciaRecorrida += miEsqueleto.velocidad;

                miEsqueleto.moverDerecha();

                if (miEsqueleto.distanciaRecorrida >= 200 || miEsqueleto.posicionx >= TAMAÑOCANVAX - miEsqueleto.tamañox) {
                    miEsqueleto.xDerechaEsqueleto = false;
                    miEsqueleto.yAbajoEsqueleto = true;
                    miEsqueleto.orientacion = 4;
                    miEsqueleto.distanciaRecorrida = 0;
                }

            } else if (miEsqueleto.xIzquierdaEsqueleto) {

                miEsqueleto.distanciaRecorrida += miEsqueleto.velocidad;

                miEsqueleto.moverIzquierda();

                if (miEsqueleto.distanciaRecorrida >= 200 || miEsqueleto.posicionx <= 0) {
                    miEsqueleto.xIzquierdaEsqueleto = false;
                    miEsqueleto.yArribaEsqueleto = true;
                    miEsqueleto.orientacion = 3;
                    miEsqueleto.distanciaRecorrida = 0;

                }
            } else if (miEsqueleto.yArribaEsqueleto) {

                miEsqueleto.distanciaRecorrida += miEsqueleto.velocidad;

                miEsqueleto.moverArriba();

                if (miEsqueleto.distanciaRecorrida >= 200 || miEsqueleto.posiciony <= 0) {
                    miEsqueleto.yArribaEsqueleto = false;
                    miEsqueleto.xDerechaEsqueleto = true;
                    miEsqueleto.orientacion = 1;
                    miEsqueleto.distanciaRecorrida = 0;

                }
            } else if (miEsqueleto.yAbajoEsqueleto) {

                miEsqueleto.distanciaRecorrida += miEsqueleto.velocidad;

                miEsqueleto.moverAbajo();

                if (miEsqueleto.distanciaRecorrida >= 200 || miEsqueleto.posiciony >= TAMAÑOCANVAY - miEsqueleto.tamañoy) {
                    miEsqueleto.yAbajoEsqueleto = false;
                    miEsqueleto.xIzquierdaEsqueleto = true;
                    miEsqueleto.orientacion = 2;
                    miEsqueleto.distanciaRecorrida = 0;

                }

            }

            //El esqueleto perseguirá al guerrero si se acerca a 200 pixeles o menos
            if (Math.abs(miEsqueleto.posicionx - miWarrior.posicionx) < 200 && Math.abs(miEsqueleto.posiciony - miWarrior.posiciony) < 200) {
                miEsqueleto.persiguiendo = true;
            }

        } else {

            miEsqueleto.perseguirWarrior();
            //El esqueleto dejará de perseguir al guerrero si se aleja a 200 pixeles o más
            if (Math.abs(miEsqueleto.posicionx - miWarrior.posicionx) > 200 || Math.abs(miEsqueleto.posiciony - miWarrior.posiciony) > 200) {
                miEsqueleto.persiguiendo = false;
                miEsqueleto.distanciaRecorrida = 0;

            }

        }
        // Pintamos el esqueleto
        ctx.drawImage(miEsqueleto.imagen,
            miEsqueleto.animacionEsqueleto[miEsqueleto.posicionesqueleto][0],
            miEsqueleto.animacionEsqueleto[miEsqueleto.posicionesqueleto][1],
            miEsqueleto.tamañorecorteX,
            miEsqueleto.tamañorecorteY,
            miEsqueleto.posicionx,
            miEsqueleto.posiciony,
            miEsqueleto.tamañox,
            miEsqueleto.tamañoy);

    }

    function generarEsqueletos(numeroEsqueletos) {
        for (let i = 0; i < numeroEsqueletos; i++) {
            let miEsqueleto = new Esqueleto();
            miEsqueleto.velocidad = Math.floor(Math.random() * 3) + 6;
            miEsqueleto.posicionx = Math.floor(Math.random() * 1200);
            miEsqueleto.posiciony = Math.floor(Math.random() * 500) + 200;
            esqueletos[i] = miEsqueleto;
        }

        switch (pantalla) {
            case 2: daño = 3;
                break;
            case 3: daño = 7;
                break;
            case 4: daño = 10;
                break;
        }
    }

    function pintarEsqueletos() {

        esqueletos.forEach(element => {
            if (element) {
                pintarEsqueleto(element);
            }

        });

    }

    function pintarPortal(miPortal) {

        ctx.drawImage(miPortal.imagen, // Imagen completa con todos los comecocos (Sprite)
            miPortal.animacion[miPortal.posicionportal][0],
            miPortal.animacion[miPortal.posicionportal][1],
            miPortal.tamañorecorteX,
            miPortal.tamañorecorteY,
            miPortal.posicionx,
            miPortal.posiciony,
            miPortal.tamañox,
            miPortal.tamañoy);
    }

    function pintarPortales() {
        portales.forEach(element => {
            if (element.activo || element.dentro) {
                pintarPortal(element);
            }
        });
    }

    function caminar() {


        if (!juegoCompletado) {
            switch (miWarrior.orientacion) {
                case 1: posicionwarrior = (posicionwarrior + 1) % 9; miWarrior.tamañorecorteX = 33; break;
                case 2: posicionwarrior = 9 + (posicionwarrior + 1) % 9; miWarrior.tamañorecorteX = 33; break;
                case 3: posicionwarrior = 18 + (posicionwarrior + 1) % 9; miWarrior.tamañorecorteX = 37; break;
                case 4: posicionwarrior = 27 + (posicionwarrior + 1) % 9; miWarrior.tamañorecorteX = 37; break;
                default: posicionwarrior = (posicionwarrior + 1) % 9; miWarrior.tamañorecorteX = 37; break;
            }
        } else {
            switch (miWarrior.orientacion) {
                case 1: posicionwarrior = 0; break;
                case 2: posicionwarrior = 9; break;
                case 3: posicionwarrior = 18; break;
                case 4: posicionwarrior = 27; break;
            }
        }

    }

    function golpear() {

        barraGolpeo.style.width = 0;

        setTimeout(function () {
            barraGolpeo.style.width = '100%';
            barraGolpeo.style.backgroundColor = 'rgb(170, 170, 255)';
        }, 3000);

        setTimeout(function () {
            barraGolpeo.style.backgroundColor = 'blue';
        }, 6000);

        switch (miWarrior.orientacion) {
            case 1: posicionwarrior = (posicionwarrior + 1) % 8; miWarrior.tamañorecorteX = 54;
                miWarrior.tamañox = 45;
                miWarrior.tamañorecorteY = 48; break;
            case 2: posicionwarrior = 8 + (posicionwarrior + 1) % 8; miWarrior.tamañorecorteX = 54;
                miWarrior.tamañox = 45;
                miWarrior.tamañorecorteY = 48; break;
            case 3: posicionwarrior = 16 + (posicionwarrior + 1) % 8; miWarrior.tamañorecorteX = 42;
                miWarrior.tamañox = 45;
                miWarrior.tamañorecorteY = 60;
                break;
            case 4: posicionwarrior = 24 + (posicionwarrior + 1) % 8; miWarrior.tamañorecorteX = 42;
                miWarrior.tamañox = 45;
                miWarrior.tamañorecorteY = 60;
                break;
            default: posicionwarrior = (posicionwarrior + 1) % 8; break;
        }
    }

    function pintarMago() {
        ctx.drawImage(miMago.imagen,
            miMago.animacion[miMago.posicion][0],
            miMago.animacion[miMago.posicion][1],
            miMago.tamañorecorteX,
            miMago.tamañorecorteY,
            miMago.posicionx,
            miMago.posiciony,
            miMago.tamañox,
            miMago.tamañoy);
    }
    function pintarBocadiilo() {
        ctx.drawImage(miBocadillo.imagen,
            miBocadillo.animacion[0],
            miBocadillo.animacion[1],
            miBocadillo.tamañorecorteX,
            miBocadillo.tamañorecorteY,
            miBocadillo.posicionx,
            miBocadillo.posiciony,
            miBocadillo.tamañox,
            miBocadillo.tamañoy);
    }
    function pintarTexto() {

        ctx.font = '14px faces';
        ctx.fillStyle = 'brown';

        if (miDiamante.tipo === 5 && alternadorDeTexto === 4) {
            alternadorDeTexto = 5;
        }
        switch (alternadorDeTexto) {
            case 1:
                let linea1 = "En las arenas yace un diamante"
                let linea2 = "de antaño. Busca detenidamente"
                let linea3 = "y pasa por encima de el para"
                let linea4 = "recogerlo."

                ctx.fillText(linea1, 83, 525);
                ctx.fillText(linea2, 83, 545);
                ctx.fillText(linea3, 83, 565);
                ctx.fillText(linea4, 83, 585);
                break;
            case 2:
                let linea5 = "Busco un diamante perdido,"
                let linea6 = "un tesoro resplandeciente."
                let linea7 = "¿Te atreves a ser mi valiente"
                let linea8 = " buscador de joyas?"

                ctx.fillText(linea5, 83, 525);
                ctx.fillText(linea6, 83, 545);
                ctx.fillText(linea7, 83, 565);
                ctx.fillText(linea8, 83, 585);

                break;
            case 3:
                let linea9 = "En el brillo de los diamantes"
                let linea10 = "yace el secreto del universo,"
                let linea11 = "una chispa de misterio eterno."

                ctx.fillText(linea9, 83, 530);
                ctx.fillText(linea10, 83, 550);
                ctx.fillText(linea11, 83, 570);
                break;
            case 4:

                let linea12 = "¡GENIAL! Te abriré"
                let linea13 = "el camino donde hay"
                let linea14 = "otro diamante custiodado"
                let linea15 = "por un ejército. ¡APARTA!"

                ctx.fillText(linea12, 95, 527);
                ctx.fillText(linea13, 95, 547);
                ctx.fillText(linea14, 95, 567);
                ctx.fillText(linea15, 95, 587);
                break;
            case 5:
                let linea16 = "¡Gracias, " + nombre + "!"
                let linea17 = "Tu valentía ha traído"
                let linea18 = "todos los diamantes en"
                let linea19 = "un tiempo récord " + "[" + record + "]."

                ctx.fillText(linea16, 95, 527);
                ctx.fillText(linea17, 95, 547);
                ctx.fillText(linea18, 95, 567);
                ctx.fillText(linea19, 95, 587);

                setTimeout(function () {
                    alternadorDeTexto = 6;
                }, 5000)
                break;
            case 6:
                let linea20 = "La magia florece gracias a ti."
                let linea21 = "¡Hasta la próxima aventur@!"
                let linea22 = "";
                let linea23 = "";

                ctx.fillText(linea20, 85, 547);
                ctx.fillText(linea21, 85, 567);

                pararJuego();
                break;
        }

    }
    function pintarExclamacion() {
        ctx.drawImage(miExclamacion.imagen,
            miExclamacion.animacion[0],
            miExclamacion.animacion[1],
            miExclamacion.tamañorecorteX,
            miExclamacion.tamañorecorteY,
            miExclamacion.posicionx,
            miExclamacion.posiciony,
            miExclamacion.tamañox,
            miExclamacion.tamañoy);
    }
    function pintarDiamante() {

        if (miDiamante.tipo === 3 && miDiamante.posicion === 35 || miDiamante.posicion === 36 || miDiamante.posicion === 37) {
            miDiamante.tamañorecorteX = 33;
        } else {
            miDiamante.tamañorecorteX = 37;
        }

        if (miDiamante.tipo === 4) {
            miDiamante.tamañorecorteY = 42;
            miDiamante.tamañorecorteX = 35;

        }


        ctx.drawImage(miDiamante.imagen,
            miDiamante.animacion[miDiamante.posicion][0],
            miDiamante.animacion[miDiamante.posicion][1],
            miDiamante.tamañorecorteX,
            miDiamante.tamañorecorteY,
            miDiamante.posicionx,
            miDiamante.posiciony,
            miDiamante.tamañox,
            miDiamante.tamañoy);
    }

    function pintarPista() {
        ctx.drawImage(miDiamante.imagen,
            miDiamante.pista[0],
            miDiamante.pista[1],
            10,
            2,
            miDiamante.posicionx,
            miDiamante.posiciony,
            10,
            5);
    }
    function pintarExplosion() {
        explosion.play();
        movimientoExplosion();

        if (miDiamante.tipo != 1) {
            switch (miDiamante.tipo) {
                case 2:
                    miExplosion.posicionx = rocas[3].posicionx - 3;
                    miExplosion.posiciony = rocas[3].posiciony - 20;
                    break;
                case 3:
                    miExplosion.posicionx = rocas[6].posicionx - 3;
                    miExplosion.posiciony = rocas[6].posiciony - 20;
                    break;
                case 4:
                    miExplosion.posicionx = rocas[8].posicionx - 3;
                    miExplosion.posiciony = rocas[8].posiciony - 20;
                    break;
            }
        }


        ctx.drawImage(miExplosion.imagen,
            miExplosion.animacion[miExplosion.posicion][0],
            miExplosion.animacion[miExplosion.posicion][1],
            miExplosion.tamañorecorteX,
            miExplosion.tamañorecorteY,
            miExplosion.posicionx,
            miExplosion.posiciony,
            miExplosion.tamañox,
            miExplosion.tamañoy);

        if (miExplosion.posicion === 11) {
            explotar = false;
            switch (miDiamante.tipo) {
                case 1:
                    rocas.splice(1, 1);
                    break;
                case 2:
                    rocas.splice(3, 1);
                    break;

                case 3:
                    rocas.splice(6, 1);
                    break;

                case 4:
                    rocas.splice(8, 1);
                    break;
            }

        }
    }
    function movimientoEsqueleto() {
        for (let i = 0; i < esqueletos.length; i++) {
            switch (esqueletos[i].orientacion) {
                case 1: esqueletos[i].posicionesqueleto = (esqueletos[i].posicionesqueleto + 1) % 9; break;
                case 2: esqueletos[i].posicionesqueleto = 9 + (esqueletos[i].posicionesqueleto + 1) % 9; break;
                case 3: esqueletos[i].posicionesqueleto = 18 + (esqueletos[i].posicionesqueleto + 1) % 9; break;
                case 4: esqueletos[i].posicionesqueleto = 27 + (esqueletos[i].posicionesqueleto + 1) % 9; break;
                default: esqueletos[i].posicionesqueleto = (esqueletos[i].posicionesqueleto + 1) % 9; break;
            }
        }

    }

    function movimientoPortal() {
        portales.forEach(element => {
            switch (element.tipo) {
                case 1: element.posicionportal = (element.posicionportal + 1) % 4;
                    break;
                case 2: element.posicionportal = 4 + (element.posicionportal + 1) % 4;
                    break;
                case 3: element.posicionportal = 8 + (element.posicionportal + 1) % 4;
                    break;
                case 4: element.posicionportal = 12 + (element.posicionportal + 1) % 4;
                    break;
            }
        });

    }

    function movimientoDiamante() {

        switch (miDiamante.tipo) {
            case 1: miDiamante.posicion = (miDiamante.posicion + 1) % 15; break;
            case 2: miDiamante.posicion = 15 + (miDiamante.posicion + 1) % 15; break;
            case 3: miDiamante.posicion = 30 + (miDiamante.posicion + 1) % 15; break;
            case 4: miDiamante.posicion = 45 + (miDiamante.posicion + 1) % 12; break;
            case 5: miDiamante.posicion = 57 + (miDiamante.posicion + 1) % 11; break;
            default: miDiamante.posicion = (miDiamante.posicion + 1) % 15; break;
        }
    }
    function movimientoExplosion() {

        miExplosion.posicion = (miExplosion.posicion + 1) % 12;

    }
    function activaMovimiento(evt) {

        if (!juegoCompletado) {
            switch (evt.keyCode) {
                // Right arrow.
                case flechaDerecha:
                    xDerecha = true;
                    break;
                case flechaIzquierda:
                    xIzquierda = true;
                    break;
                case flechaArriba:
                    yArriba = true
                    break;
                case flechaAbajo:
                    yAbajo = true;
                    break;
                case ESPACIO:
                    if (pantalla != 0) {
                        if (poderGolpear) {
                            miWarrior.golpeo = true;
                            poderGolpear = false;

                            setTimeout(function () {
                                miWarrior.golpeo = false;
                                //Cuando dejamos de golpear, ajustamos para que el tamaño de recorte, el tamaño del warrior y la posicion del del sprite sean los adecuados
                                switch (miWarrior.orientacion) {
                                    case 1: posicionwarrior = 0; miWarrior.tamañorecorteX = 30; miWarrior.tamañox = 30; break;
                                    case 2: posicionwarrior = 9; miWarrior.tamañorecorteX = 30; miWarrior.tamañox = 30; break;
                                    case 3: posicionwarrior = 18; miWarrior.tamañorecorteX = 37; miWarrior.tamañox = 30; break;
                                    case 4: posicionwarrior = 27; miWarrior.tamañorecorteX = 37; miWarrior.tamañox = 30; break;
                                    default: posicionwarrior = 0; break;
                                }
                                setTimeout(function () {
                                    poderGolpear = true;
                                }, 3000);
                            }, 3000);
                        }
                    }
            }
        }

    }

    function desactivaMovimiento(evt) {

        if (!juegoCompletado) {


            switch (evt.keyCode) {

                case flechaDerecha:

                    xDerecha = false;
                    posicionwarrior = 0; //Cuando dejemos de movernos, el guerrero estará con los pies juntos
                    break;

                case flechaIzquierda:

                    xIzquierda = false;
                    posicionwarrior = 9;

                    break;

                case flechaArriba:

                    yArriba = false;
                    posicionwarrior = 18;

                    break;
                case flechaAbajo:

                    yAbajo = false;
                    posicionwarrior = 27;

                    break;

            }
        }
    }

    function comprobarFueradeCanva(personaje) {
        if (personaje.posicionx >= TAMAÑOCANVAX - personaje.tamañox) {
            personaje.posicionx = TAMAÑOCANVAX - personaje.tamañox;
        }
        if (personaje.posicionx < 0) {
            personaje.posicionx = 0;
        }
        if (personaje.posiciony < 0) {
            personaje.posiciony = 0;
        }
        if (personaje.posiciony > TAMAÑOCANVAY - personaje.tamañoy) {
            personaje.posiciony = TAMAÑOCANVAY - personaje.tamañoy;
        }
    }

    function comprobarColisionEsqueletoWarrior() {
        for (let i = 0; i < esqueletos.length; i++) {
            if ((
                miWarrior.posicionx + miWarrior.tamañox > esqueletos[i].posicionx &&
                miWarrior.posicionx < esqueletos[i].posicionx + miWarrior.tamañox &&
                miWarrior.posiciony + miWarrior.tamañoy > esqueletos[i].posiciony &&
                miWarrior.posiciony < esqueletos[i].posiciony + esqueletos[i].tamañoy
            )) {

                if (!miWarrior.golpeo) {

                    miWarrior.restarVida();

                    if (miWarrior.vidas >= 0 && !miWarrior.golpeado) {
                        miWarrior.golpeado = true;
                        if (esqueletos[i].orientacion === 1) {
                            miWarrior.posicionx += 100;
                        } else if (esqueletos[i].orientacion === 2) {
                            miWarrior.posicionx -= 100;
                        } else if (esqueletos[i].orientacion === 3) {
                            miWarrior.posiciony -= 100;
                        } else {
                            miWarrior.posiciony += 100;
                        }
                    }


                    comprobarFueradeCanva(miWarrior);

                } else {
                    esqueletos[i].restarVida();
                    if (esqueletos[i].vidas > 0) {
                        if (miWarrior.orientacion === 1) {
                            esqueletos[i].posicionx += 100;
                        } else if (miWarrior.orientacion === 2) {
                            if (miWarrior.posicionx + 14 < esqueletos[i].posicionx + miWarrior.tamañox) {
                                esqueletos[i].posicionx -= 100;
                            }

                        } else if (miWarrior.orientacion === 3) {
                            esqueletos[i].posiciony -= 100;
                        } else if (miWarrior.orientacion === 4) {
                            esqueletos[i].posiciony += 100;
                        }
                        comprobarFueradeCanva(esqueletos[i]);
                    } else {
                        esqueletos.splice(i, 1);
                    }

                }

            }
        }
        miWarrior.golpeado = false;
    }

    function comprobarColisionconPortal() {
        portales.forEach(function (element, indice) {

            if (element.activo || element.dentro) {

                if ((
                    miWarrior.posicionx + miWarrior.tamañox > element.posicionx &&
                    miWarrior.posicionx < element.posicionx + element.tamañox &&
                    miWarrior.posiciony + miWarrior.tamañoy > element.posiciony &&
                    miWarrior.posiciony < element.posiciony + miWarrior.tamañox
                )) {

                    switch (miWarrior.orientacion) {
                        case 1:
                            miWarrior.posicionx = element.posicionx - element.tamañox;
                            break;
                        case 2:
                            miWarrior.posicionx = element.posicionx + element.tamañox;
                            break;
                        case 3:
                            miWarrior.posiciony = element.posiciony + miWarrior.tamañox + 1;
                            break;
                    }

                    if (!element.completado && miDiamante.capturado) {
                        if (!element.dentro) {
                            element.dentro = true;
                            switch (indice) {
                                case 0: pantalla = 1;
                                    generarEsqueletos(9);

                                    miDiamante.capturado = false;
                                    break;
                                case 1: pantalla = 2;
                                    generarEsqueletos(15);

                                    miDiamante.capturado = false;
                                    break;
                                case 2: pantalla = 3;
                                    generarEsqueletos(20);

                                    miDiamante.capturado = false;
                                    break;
                                case 3: pantalla = 4;
                                    generarEsqueletos(30);

                                    miDiamante.capturado = false;
                                    break;
                            }
                        } else if (esqueletos.length === 0) {

                            pantalla = 0;
                            element.activo = true;

                        }

                        if (element.activo && !element.completado) {
                            if (esqueletos.length === 0) {
                                element.completado = true;
                                comprobarColisiontrasTransicion = false;
                            }
                            element.activo = false;
                            transicion();
                        }
                    }

                }
            }

        });

    }
    function comprobarColisionconRocas() {

        rocas.forEach(element => {

            if (miWarrior.posicionx + miWarrior.tamañox > element.posicionx &&
                miWarrior.posicionx < element.posicionx + element.tamañox &&
                miWarrior.posiciony + miWarrior.tamañoy > element.posiciony &&
                miWarrior.posiciony < element.posiciony + miWarrior.tamañox) {

                if (miWarrior.orientacion === 1) {
                    miWarrior.posicionx = element.posicionx - miWarrior.tamañox;
                }
                if (miWarrior.orientacion === 2) {
                    miWarrior.posicionx = element.posicionx + element.tamañox;
                }
                if (miWarrior.orientacion === 3) {
                    miWarrior.posiciony = element.posiciony + miWarrior.tamañox;
                }
                if (miWarrior.orientacion === 4) {
                    miWarrior.posiciony = element.posiciony - miWarrior.tamañox;
                }

            }
        });


    }
    function comprobarColisionconMago() {

        /*Si colisiono con el mago y el portal 4 ya está completado, he terminado el juego*/

        if (colisionando && (miWarrior.posicionx > miMago.posicionx + 200 || miWarrior.posiciony > miMago.posiciony + 200 || miWarrior.posicionx < miMago.posicionx - 200 || miWarrior.posiciony < miMago.posiciony - 200)) {
            alternadorDeTexto = (alternadorDeTexto % 3) + 1;
        }

        if (miWarrior.posicionx + miWarrior.tamañox > miMago.posicionx &&
            miWarrior.posicionx < miMago.posicionx + miMago.tamañox &&
            miWarrior.posiciony + miWarrior.tamañoy > miMago.posiciony &&
            miWarrior.posiciony < miMago.posiciony + miWarrior.tamañox) {
            if (miDiamante.tipo === 5) {
                juegoCompletado = true;
                guardarRecord();
            }
            colisionando = true;
            miExclamacion.activo = false;
            if (miWarrior.orientacion === 1) {
                miWarrior.posicionx = miMago.posicionx - miWarrior.tamañox;
            }
            if (miWarrior.orientacion === 2) {
                miWarrior.posicionx = miMago.posicionx + miMago.tamañox;
            }
            if (miWarrior.orientacion === 3) {
                miWarrior.posiciony = miMago.posiciony + miWarrior.tamañox;
            }
            if (miWarrior.orientacion === 4) {
                miWarrior.posiciony = miMago.posiciony - miWarrior.tamañoy;
            }
        } else if (miWarrior.posicionx > miMago.posicionx + 200 || miWarrior.posiciony > miMago.posiciony + 200 || miWarrior.posicionx < miMago.posicionx - 200 || miWarrior.posiciony < miMago.posiciony - 200) {
            colisionando = false;
        }
    }
    function comprobarColisionconDiamante() {

        if (miWarrior.posicionx + miWarrior.tamañox > miDiamante.posicionx &&
            miWarrior.posicionx < miDiamante.posicionx + miDiamante.tamañox &&
            miWarrior.posiciony + miWarrior.tamañoy > miDiamante.posiciony &&
            miWarrior.posiciony < miDiamante.posiciony + miDiamante.tamañoy) {
            if (!miDiamante.visible) {
                audioDesenterrarDiamante.play();
                if (miWarrior.orientacion === 1) {
                    miWarrior.posicionx = miDiamante.posicionx - miWarrior.tamañox * 5;
                }
                if (miWarrior.orientacion === 2) {
                    miWarrior.posicionx = miDiamante.posicionx + miDiamante.tamañox * 5;
                }
                if (miWarrior.orientacion === 3) {
                    miWarrior.posiciony = miDiamante.posiciony + miWarrior.tamañoy;
                }
                if (miWarrior.orientacion === 4) {
                    miWarrior.posiciony = miDiamante.posiciony - miWarrior.tamañoy * 2;
                }
                miDiamante.visible = true;

            } else {
                recogerDiamante.play();
                miDiamante.capturado = true;
                alternadorDeTexto = 4;
            }



        }
    }
    function limpiarPantalla() {
        ctx.clearRect(0, 0, TAMAÑOCANVAX, TAMAÑOCANVAY);
    }

    function transicion() {
        //Obtener la posicion del canvas para poder hacer la transición en el centro del mismo, ya que si reducimos pantalla, los margenes se disminuyen
        let x = canvas.offsetLeft;
        let y = canvas.offsetTop;

        transicion_.style.left = (x) + 'px';
        transicion_.style.top = (y) + 'px';


        transicion_.style.scale = 1;

        transicion_.style.opacity = 1;

        setTimeout(function () {
            switch (pantalla) {
                case 0: canvas.style.backgroundImage = 'url("Fondo/arena.png")';
                    break;
                case 1:
                    canvas.style.backgroundImage = 'url("Fondo/azul.png")';
                    break;
                case 2:
                    canvas.style.backgroundImage = 'url("Fondo/cesped.png")';
                    break;
                case 3:
                    canvas.style.backgroundImage = 'url("Fondo/cueva.png")';
                    break;
                case 4:
                    canvas.style.backgroundImage = 'url("Fondo/infierno.png")';
                    break;
            }

            miWarrior.orientacion = 4;

            portales.forEach(element => {
                if (pantalla != 0) {
                    transicionCompletada = true;
                } else {
                    transicionCompletada = false;
                    element.dentro = false;
                }

                if (element.dentro) {

                    element.posicionx = 625;

                    if (miWarrior.orientacion != 3) {
                        miWarrior.posiciony = element.posiciony + 40;
                    }
                    caminar();
                    miWarrior.posicionx = element.posicionx + 5;

                } else {
                    if (pantalla != 0) {
                        element.activo = false;
                    } else {
                        element.activo = true;

                        if (element.completado) {
                            switch (element.tipo) {
                                case 1: element.posicionx = posicion1;
                                    break;
                                case 2: element.posicionx = posicion4;
                                    break;
                                case 3: element.posicionx = posicion2;
                                    break;
                                case 4: element.posicionx = posicion3;
                                    break;
                            }
                            if (miWarrior.orientacion != 3) {
                                miWarrior.posiciony = element.posiciony + 40;
                            }
                            caminar();
                            miWarrior.posicionx = element.posicionx + 5;
                        }


                    }
                }




            });

        }
            , 1000)


        setTimeout(function () {
            transicion_.style.scale = 0
        }
            , 2000);

        if (pantalla != 0) {
            idcompronacionchoque = setTimeout(function () {
                comprobarColisiontrasTransicion = true;
            }, 3000);
        }


    }

    function transicionInicial() {

        transicionInicial_.style.scale = 1;
        transicionInicial_.style.opacity = 1;

        setTimeout(function () {
            transicionInicial_.style.opacity = 0;
            setTimeout(function () {
                papiro.style.opacity = 0;
                informacion.style.opacity = 1;
                informacionGolepo.style.opacity = 1;
            }, 15000);
        }
            , 4000);

    }

    function pintarAnimacion() {

        if (miWarrior.vidas > 0) {
            limpiarPantalla();
            miDiamante.generarDiamante();

            if (transicionCompletada) {
                if (comprobarColisiontrasTransicion) {
                    comprobarColisionEsqueletoWarrior();
                }
                pintarPortales();
                pintarWarrior();
                pintarEsqueletos();

                if (miDiamante.visible && miDiamante.activo) {
                    pintarDiamante();
                    if (miDiamante.capturado) {
                        miDiamante.recoger()
                    };

                } else if (!miDiamante.visible && miDiamante.activo) {
                    pintarPista();
                }

            } else {
                pintarRocas();
                pintarMago();
                pintarPortales();

                if (miDiamante.visible && miDiamante.activo) {
                    pintarDiamante();
                    if (miDiamante.capturado) {
                        miDiamante.recoger()
                    };

                } else if (!miDiamante.visible && miDiamante.activo) {
                    pintarPista();
                }

                pintarWarrior();

                if (colisionando) {
                    pintarBocadiilo();
                    pintarTexto();
                }

                if (miExclamacion.activo) {
                    pintarExclamacion();
                } else if (miDiamante.capturado && !miDiamante.activo && !colisionando && explotar && !juegoCompletado) {
                    pintarExplosion();
                }

            }

            if (juegoCompletado) {
                botonReiniciar.disabled = false;
                pintarRecords();
                pararJuego();
            }


        } else {
            limpiarPantalla();
            pararJuego();
            botonReiniciar.disabled = false;
        }

    }

    function inicarJuego() {
        idanimacion = setInterval(pintarAnimacion, 1000 / 20);
        idmovimiento = setInterval(movimientoEsqueleto, 1000 / 10);
        idportal = setInterval(movimientoPortal, 1000 / 5);
        idDiamante = setInterval(movimientoDiamante, 1000 / 10);
        idActualizarVida = setInterval(actualizarBarraVida, 1000 / 50);

    }

    function pararJuego() {
        clearInterval(idmovimiento);
        clearInterval(idportal);
        clearInterval(idanimacion);
        clearInterval(idDiamante);
        detenerContador();
    }

    sprite = new Image();
    sprite.src = "Sprites/sprite.png";

    Warrior.prototype.imagen = sprite;
    Esqueleto.prototype.imagen = sprite;
    Portal.prototype.imagen = sprite;
    Roca.prototype.imagen = sprite;
    Mago.prototype.imagen = sprite;
    Bocadillo.prototype.imagen = sprite;
    Exclamacion.prototype.imagen = sprite;
    Diamante.prototype.imagen = sprite;
    Explosion.prototype.imagen = sprite;

    miWarrior = new Warrior();
    let miPortal = new Portal(100, 0, 1);
    let miPortal2 = new Portal(433, 0, 3);
    let miPortal3 = new Portal(866, 0, 4);
    let miPortal4 = new Portal(1159, 0, 2);
    let miMago = new Mago();
    let miBocadillo = new Bocadillo();
    let miExclamacion = new Exclamacion();
    let miDiamante = new Diamante(500, 600);
    let miExplosion = new Explosion();

    portales.push(miPortal, miPortal2, miPortal3, miPortal4);

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");
    const estilos = getComputedStyle(canvas);

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    function iniciarReproduccion() {
        tema_principal.addEventListener('ended', function () {
            tema_principal.currentTime = 0;
            tema_principal.play();
        });
        tema_principal.play();
    }

    function reiniciarPartida() {
        resetearContador();
        iniciarContador();
        iniciarReproduccion();
        clearTimeout(idcompronacionchoque);
        daño = 1;
        portales = [];
        rocas = [new Roca(0, 30), new Roca(70, 98), new Roca(150, 30), new Roca(330, 30), new Roca(400, 98), new Roca(480, 30), new Roca(760, 30), new Roca(910, 30), new Roca(830, 98), new Roca(1050, 30), new Roca(1195, 30), new Roca(1118, 98)];
        canvas.style.backgroundImage = 'url("/Fondo/arena.png")';
        esqueletos = [];
        miWarrior = new Warrior();
        miPortal = new Portal(100, 0, 1);
        miPortal2 = new Portal(433, 0, 3);
        miPortal3 = new Portal(866, 0, 4);
        miPortal4 = new Portal(1159, 0, 2);
        miMago = new Mago();
        miBocadillo = new Bocadillo();
        miExclamacion = new Exclamacion();
        miDiamante = new Diamante(500, 600);
        miExplosion = new Explosion();
        posicionwarrior = 27;
        juegoCompletado = false;
        portales.push(miPortal, miPortal2, miPortal3, miPortal4);
        transicionCompletada = false;
        comprobarColisiontrasTransicion = false;
        poderGolpear = true;
        colisionando = false;
        alternadorDeTexto = 1;
        explotar = true;
        xDerecha = false;
        xIzquierda = false;
        yArriba = false;
        yAbajo = false;
        pantalla = 0;
        posicion1 = 100;
        posicion2 = 433;
        posicion3 = 866;
        posicion4 = 1159;

        inicarJuego();
        botonReiniciar.disabled = true;

    };

    function guardarRecord() {
        localStorage.setItem(nombre, record);
    }

    function iniciarPartida() {
        nombre = document.getElementById("nombre").value;
        console.log(nombre);
        if (nombre === "") {
            alert("Debes introducir un nombre para comenzar una partida");
        } else {
            transicionInicial();
            iniciarReproduccion();
            inicarJuego();
            botonIniciar.disabled = true;
            setTimeout(iniciarContador, 21000);
            document.getElementById("nombre").value = "";
        }

    }

    // Actualiza la barra de vida
    function actualizarBarraVida() {
        miWarrior.vidas = Math.max(0, Math.min(100, miWarrior.vidas));

        // Actualiza el ancho de la barra de vida
        barraVida.style.width = miWarrior.vidas + '%';
    }


    function iniciarContador() {
        contador = setInterval(function () {
            segundos++;
            if (segundos == 60) {
                segundos = 0;
                minutos++;
            }
            actualizarContador();
        }, 1000); // Actualizar cada segundo (1000 milisegundos)
    }

    function detenerContador() {
        clearInterval(contador);
    }

    function resetearContador() {
        minutos = 0;
        segundos = 0;
        detenerContador();
        actualizarContador();
    }

    function actualizarContador() {
        let formatoMinutos = minutos < 10 ? "0" + minutos : minutos;
        let formatoSegundos = segundos < 10 ? "0" + segundos : segundos;
        record = formatoMinutos + ":" + formatoSegundos;
        document.getElementById("contador").innerHTML = record;
    }

    function pintarRecords() {

        if (records) {
            records = [];
            while (lista.firstChild) {
                lista.removeChild(lista.firstChild);
            }
        }

        for (let clave in localStorage) {
            if (localStorage.hasOwnProperty(clave)) {
                // Obtiene el valor asociado a la clave
                localStorage.getItem(clave);
                records.push(clave + ": " + localStorage.getItem(clave));
            }
        }

        records.sort(function (a, b) {
            let tiempoA = a.split(":");
            let tiempoB = b.split(":");

            let minutosA = parseInt(tiempoA[1]) * 60 + parseInt(tiempoA[2]);
            let minutosB = parseInt(tiempoB[1]) * 60 + parseInt(tiempoB[2]);

            return minutosA - minutosB;
        });

        console.log("Registros ordenados:", records);
        for (let i = 0; i < 10; i++) {
            // Crea un elemento de lista y agrega la información
            if (records[i]) {
                let listItem = document.createElement("li");
                listItem.textContent = records[i];
                lista.appendChild(listItem);
            }
        }

    }

    botonReiniciar = document.getElementById("Reinicarpartida");
    botonIniciar = document.getElementById("Iniciarpartida");

    botonReiniciar.onclick = reiniciarPartida;
    botonReiniciar.disabled = true;

    botonIniciar.onclick = iniciarPartida;
    pintarRecords();
}
