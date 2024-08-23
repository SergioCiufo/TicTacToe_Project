$(document).ready(function () {
    var player = "X";
    var bot = "O";
    var gameActive = true;
    var gametable = ["", "", "", "", "", "", "", "", ""];

    var playerScore = 0;
    var botScore = 0;
    var drawScore = 0;
    const playerScoreEl = document.getElementById("playerScore");
    const botScoreEl = document.getElementById("botScore");
    const drawScoreEl = document.getElementById("drawScore");

    var tapSound = document.getElementById("tapSound");
    var winSound = document.getElementById("winSound");
    var loseSound = document.getElementById("loseSound");
    var drawSound = document.getElementById("drawSound");
    tapSound.volume = 0.5;
    winSound.volume = 0.5;
    loseSound.volume = 0.5;
    drawSound.volume = 0.5;

    const winCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //se utente scelto 0 e 1, bot sceglie 2
    //se utente scelto 0 e 2, bot sceglie 1
    //se utente scelto 1 e 2, bot sceglie 0
    //if(player [0,1]){
    // bot = 2;
    //}


    // Gestione click su una cella
    $(document).on("click", ".tap", function () {
        if (gameActive) {
            // Disabilita temporaneamente i click
            $('.tap').prop('disabled', true);

            //cellIndex è una variabile che rappresenta l'indice della cella della griglia su cui il giocatore (o il bot) sta cercando di fare una mossa. 
            //Questo indice è utilizzato per aggiornare lo stato della griglia e per controllare la vittoria.
            var cellIndex = $(this).parent().attr('id').replace('win', '');

            // Verifica che la cella non sia già occupata
            if (gametable[cellIndex] === "") {
                // Aggiorna la griglia con il segno del giocatore corrente
                gametable[cellIndex] = player;
                tapSound.play();
                $(this).replaceWith('<img class="tapped" src="../media/' + player + '.png">');

                // Controllo vittoria
                if (checkWin(player)) {
                    winSound.play();
                    showStatusMessage("win"); // Mostra messaggio di vittoria
                    playerScore++;
                    playerScoreEl.innerText = playerScore;
                    gameActive = false;
                } else if (gametable.indexOf("") === -1) {
                    drawSound.play();
                    showStatusMessage("draw"); // Mostra messaggio di pareggio
                    drawScore++;
                    drawScoreEl.innerText = drawScore;
                    gameActive = false;
                } else {
                    // Cambio turno e attiva mossa del bot
                    player = bot;
                    botMove2();
                }
            }
        }
    });

    function botMove2() {
        // Aggiungi un ritardo di 1/2 secondo prima di eseguire la mossa del bot
        setTimeout(function () {
            // Variabile per tenere traccia se è stata fatta una mossa
            var moveMade = false;

            // Funzione per trovare la migliore mossa per un giocatore specifico
            function findBestMove(player) {
                // Trova le combinazioni di vittoria che contengono almeno due dei segni del giocatore
                let winningMove = -1;

                // Filtra le combinazioni vincenti che contengono almeno una delle mosse del giocatore
                for (let combo of winCombination) {
                    let count = 0;
                    let emptyIndex = -1;

                    combo.forEach(index => {
                        if (gametable[index] === player) {
                            count++;
                        } else if (gametable[index] === "") {
                            emptyIndex = index;
                        }
                    });

                    // Se ci sono due segni dello stesso giocatore e una cella vuota, questa è una mossa vincente
                    if (count === 2 && emptyIndex !== -1) {
                        winningMove = emptyIndex;
                        break; // Trova subito la mossa vincente
                    }
                }

                return winningMove;
            }

            // Prima, prova a trovare una mossa vincente per il bot
            var bestMove = findBestMove(bot);
            if (bestMove === -1) {
                // Poi, prova a bloccare la vittoria del giocatore avversario
                bestMove = findBestMove(player === "X" ? "O" : "X");
            }

            // Se non ci sono mosse vincenti o bloccanti, scegli una mossa casuale
            if (bestMove === -1) {
                var emptyCells = [];
                for (var i = 0; i < gametable.length; i++) {
                    if (gametable[i] === "") {
                        emptyCells.push(i);
                    }
                }
                if (emptyCells.length > 0) {
                    bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                }
            }

            // Se è stata trovata una mossa valida, eseguila
            if (bestMove !== -1) {
                gametable[bestMove] = bot;
                tapSound.play(); // Suono della mossa del bot
                $('#win' + bestMove).find('.tap').replaceWith('<img class="tapped" src="../media/' + bot + '.png">');

                // Controllo vittoria del bot
                if (checkWin(bot)) {
                    loseSound.play(); // Suono della vittoria del bot
                    showStatusMessage("defeat"); // Mostra messaggio di sconfitta
                    botScore++;
                    botScoreEl.innerText = botScore;
                    gameActive = false;
                } else if (gametable.indexOf("") === -1) {
                    drawSound.play(); // Suono del pareggio
                    showStatusMessage("draw"); // Mostra messaggio di pareggio
                    drawScore++;
                    drawScoreEl.innerText = drawScore;
                    gameActive = false;
                } else {
                    // Riabilita i click dopo che il bot ha fatto la sua mossa
                    $('.tap').prop('disabled', false);
                    // Cambio turno di nuovo al giocatore
                    player = "X";
                }
            }
        }, 500); // Ritardo di 500 millisecondi (1/2 secondo)
    }

    function checkWin(currentPlayer) {
        return winCombination.some(combination => {
            return combination.every(index => {
                return gametable[index] === currentPlayer;
            });
        });
    }

    // Funzione per resettare il gioco
    $(document).on("click", "#newGame", function () {
        tapSound.play();
        $('.cell').addClass('fade-out');

        // Dopo l'animazione, reset del gioco
        setTimeout(function () {
            gametable = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            player = "X";

            $('.cell').each(function () {
                if ($(this).find('.tapped').length > 0) {
                    $(this).find('.tapped').remove();
                    $(this).append('<button class="tap"></button>');
                }
            });

            // Rimuovi la classe di animazione
            $('.cell').removeClass('fade-out').find('.tap').prop('disabled', false);
        }, 500); // Assicurati che il timeout corrisponda alla durata dell'animazione
    });

    function showStatusMessage(result) {
        const statusImage = document.getElementById("statusImage");

        // Imposta l'immagine e mostra il messaggio di stato
        if (result === "win") {
            statusImage.src = "../media/win.png";
        } else if (result === "defeat") {
            statusImage.src = "../media/defeat.png";
        } else if (result === "draw") {
            statusImage.src = "../media/draw.png";
        }

        $("#statusMessage").removeClass('hidden'); // Mostra il messaggio di stato
        gameActive = false; // Disabilita ulteriori mosse
    }

    $(document).on("click", "#statusMessage", function () {
        $(this).addClass('hidden'); // Nascondi il messaggio di stato quando viene cliccato
        $('.tap').prop('disabled', false); // Riabilita i bottoni per la nuova partita
    });

// Bottone Login
var btnLogin = document.getElementById("btnLogin");
var divLogin = document.getElementById("divLogin");
//Bottone Register
var btnRegister = document.getElementById("btnRegister");
var divRegister = document.getElementById("divRegister");
var btnRegisterBack = document.getElementById("btnRegisterBack");

//Apre il Div Login
btnLogin.addEventListener("click", function (event) {
    event.stopPropagation(); // Evita che il click si propaghi al document
    divLogin.style.display = "flex"; // Mostra il form di login come flexbox per centrarlo
    gameActive = false;
});

// Nascondi divLogin se viene cliccato fuori da esso
document.addEventListener("click", function (event) {
    // Se il click non avviene all'interno di divLogin o del bottone btnLogin
    if (!divLogin.contains(event.target) && !btnLogin.contains(event.target) && !divRegister.contains(event.target)) {
        divLogin.style.display = "none";
        gameActive = true;
    }
});

// Impedisci la propagazione dell'evento di click su divLogin
divLogin.addEventListener("click", function (event) {
    event.stopPropagation();
});

//Apre il Div Registrati
btnRegister.addEventListener("click", function(event){
    event.stopPropagation();  // Evita che il click si propaghi al document
    divRegister.style.display="flex"; // Mostra il form di login come flexbox per centrarlo
    divLogin.style.display="none"; //nasconde il divLogin
    gameActive=false;
})

// Nascondi divRegistrati se viene cliccato fuori da esso
document.addEventListener("click", function (event) {
    // Se il click non avviene all'interno di divRegistrati o del bottone btnRegistrati
    if (!divRegister.contains(event.target) && !btnRegister.contains(event.target)) {
        divRegister.style.display = "none";
        gameActive = true;
    }
});

//chiude divRegistrati se viene cliccato back
btnRegisterBack.addEventListener("click", function(){
    divRegister.style.display="none";
    divLogin.style.display="flex";
})

});

