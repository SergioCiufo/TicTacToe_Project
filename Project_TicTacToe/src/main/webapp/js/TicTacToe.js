$(document).ready(function () {
    // State variables
    var player = "X";
    var bot = "O";
    var gameActive = true;
    var gametable = ["", "", "", "", "", "", "", "", ""];
    var playerScore = 0;
    var botScore = 0;
    var drawScore = 0;

    // DOM elements
    const playerScoreEl = document.getElementById("playerScore");
    const botScoreEl = document.getElementById("botScore");
    const drawScoreEl = document.getElementById("drawScore");
    const tapSound = document.getElementById("tapSound");
    const winSound = document.getElementById("winSound");
    const loseSound = document.getElementById("loseSound");
    const drawSound = document.getElementById("drawSound");
    const statusImage = document.getElementById("statusImage");
    const statusMessage = $("#statusMessage");
    const divLogin = document.getElementById("divLogin");
    const divRegister = document.getElementById("divRegister");
    const btnLogin = document.getElementById("btnLogin");
    const btnRegister = document.getElementById("btnRegister");
    const btnRegisterBack = document.getElementById("btnRegisterBack");

    // Set the volume of the sounds
    tapSound.volume = 0.5;
    winSound.volume = 0.5;
    loseSound.volume = 0.5;
    drawSound.volume = 0.5;
    
    // Handle login and registration buttons
    btnLogin.addEventListener("click", function (event) {
        event.stopPropagation();
        divLogin.style.display = "flex";
    });

    btnRegister.addEventListener("click", function (event) {
        event.stopPropagation();
        divRegister.style.display = "flex";
        divLogin.style.display = "none";
    });

    btnRegisterBack.addEventListener("click", function () {
        divRegister.style.display = "none";
        divLogin.style.display = "flex";
    });

    // Hide login and registration divs when clicking outside
    document.addEventListener("click", function (event) {
        if (!divLogin.contains(event.target) && !btnLogin.contains(event.target) && !divRegister.contains(event.target) && !btnRegister.contains(event.target)) {
            divLogin.style.display = "none";
            divRegister.style.display = "none";
        }
    });

    divLogin.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    divRegister.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Handle clicks on tic-tac-toe cells
    $(document).on("click", ".tap", function () {
        if (gameActive) {
            handleCellClick($(this));
        }
    });
    
    // Winning combinations
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

    function handleCellClick($cell) {
        $('.tap').prop('disabled', true);
        var cellIndex = $cell.parent().attr('id').replace('win', '');

        if (gametable[cellIndex] === "") {
            gametable[cellIndex] = player;
            tapSound.play();
            $cell.replaceWith('<img class="tapped" src="../media/' + player + '.png">');

            if (checkWin(player)) {
                handleWin("player");
            } else if (gametable.indexOf("") === -1) {
                handleDraw();
            } else {
                player = bot;
                botMove();
            }
        }
    }

    // Bot's move
    function botMove() {
        setTimeout(function () {
            // Find the best move for the bot
            var bestMove = findBestMove(bot);

            // If no winning move exists for the bot, try to block the player
            if (bestMove === -1) {
                bestMove = findBestMove(player === "X" ? "O" : "X");
            }

            // If no winning or blocking moves, choose a random move
            if (bestMove === -1) {
                var emptyCells = gametable.map((value, index) => value === "" ? index : null).filter(v => v !== null);
                bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            }

            // If a valid move was found, execute it
            if (bestMove !== -1) {
                executeBotMove(bestMove);
            }
        }, 500); // 500 milliseconds delay (1/2 second)
    }

    function executeBotMove(bestMove) {
        // Update the game grid with the bot's move
        gametable[bestMove] = bot;
        
        // Play the move sound
        tapSound.play();
        
        // Find the cell element corresponding to the bot's move and replace it with a bot image
        $('#win' + bestMove).find('.tap').replaceWith('<img class="tapped" src="../media/' + bot + '.png">');

        // Check if the bot won with this move
        if (checkWin(bot)) {
            handleWin("bot"); // Handle bot's victory
        } else if (gametable.indexOf("") === -1) {
            // If all cells are occupied and no one has won, it's a draw
            handleDraw(); // Handle draw
        } else {
            // Re-enable cell clicks and change turn
            $('.tap').prop('disabled', false);
            player = "X"; // Set player to human for the next turn
        }
    }

    function findBestMove(player) {
        // Variable to track the best move found
        let winningMove = -1;

        // Iterate through all winning combinations
        for (let combo of winCombination) {
            // Variable to count the number of player's marks in the combination
            let count = 0;
            // Variable to track the index of the empty cell in the combination
            let emptyIndex = -1;

            // Check each cell in the combination
            combo.forEach(index => {
                if (gametable[index] === player) {
                    // Increment count if the cell contains the player's mark
                    count++;
                } else if (gametable[index] === "") {
                    // Store the index of the empty cell
                    emptyIndex = index;
                }
            });

            // If there are two of the player's marks in the combination and one empty cell, it's a winning move
            if (count === 2 && emptyIndex !== -1) {
                // Store the index of the winning move
                winningMove = emptyIndex;
                break; // Exit loop, as the best move is found
            }
        }

        // Return the index of the winning move found, or -1 if none
        return winningMove;
    }

    function checkWin(currentPlayer) {
        // Check if there is at least one winning combination that is completely occupied by the current player
        return winCombination.some(combination => {
            // Check if all cells in the current combination contain the player's mark
            return combination.every(index => gametable[index] === currentPlayer);
        });
    }

    function handleWin(winner) {
        // Check if the winner is the player
        if (winner === "player") {
            // Play the player's victory sound
            winSound.play();
            // Increment player's score
            playerScore++;
            // Update the HTML element showing the player's score
            playerScoreEl.innerText = playerScore;
            // Send score update to the server
            updateScore(playerScore, drawScore, botScore);
            // Show a victory message
            showStatusMessage("win");
        } 
        // Check if the winner is the bot
        else if (winner === "bot") {
            // Play the loss sound for the player (bot's victory)
            loseSound.play();
            // Increment bot's score
            botScore++;
            // Update the HTML element showing the bot's score
            botScoreEl.innerText = botScore;
            // Send score update to the server
            updateScore(playerScore, drawScore, botScore);
            // Show a defeat message
            showStatusMessage("defeat");
        }
        // Disable further actions in the game
        gameActive = false;
    }

    function handleDraw() {
        // Play the draw sound
        drawSound.play();
        
        // Increment draw score
        drawScore++;
        
        // Update the HTML element showing the draw score
        drawScoreEl.innerText = drawScore;
        
        // Send score update to the server
        updateScore(playerScore, drawScore, botScore);
        
        // Show a draw message
        showStatusMessage("draw");
        
        // Disable further actions in the game
        gameActive = false;
    }

    function showStatusMessage(result) {
        // Set the status image based on the game result
        statusImage.src = "../media/" + result + ".png";

        // Show the status message by removing the 'hidden' class
        statusMessage.removeClass('hidden');

        // Disable further actions in the game
        gameActive = false;

        // Add event handler to hide the status message when clicked
        $(document).on("click", "#statusMessage", function () {
            // Add the 'hidden' class to the status message to hide it
            statusMessage.addClass('hidden');

            // Re-enable buttons to allow new game actions
            $('.tap').prop('disabled', false);
        });
    }

    // Handle click on the "newGame" button to start a new game
    $(document).on("click", "#newGame", function () {
        // Play the tap sound when the button is clicked
        tapSound.play();

        // Add the 'fade-out' class to all cells to start an exit animation
        $('.cell').addClass('fade-out');

        // Wait 500 milliseconds (duration of the animation) and then execute the resetGame function
        setTimeout(resetGame, 500);
    });

    // Function to reset the game state and prepare for a new game
    function resetGame() {
        // Reset the game grid content
        gametable = ["", "", "", "", "", "", "", "", ""];

        // Set the game to active
        gameActive = true;

        // Set the current player to "X" (presumably the human player)
        player = "X";

        // For each cell in the game grid
        $('.cell').each(function () {
            // If the cell contains an element with class 'tapped' (i.e., a move has been played)
            if ($(this).find('.tapped').length > 0) {
                // Remove the 'tapped' image from the cell
                $(this).find('.tapped').remove();

                // Add an empty 'tap' button to the cell
                $(this).append('<button class="tap"></button>');
            }
        });

        // Remove the 'fade-out' class from all cells (reset animation)
        $('.cell').removeClass('fade-out');

        // Re-enable cell buttons to allow interactions
        $('.cell').find('.tap').prop('disabled', false);
    }
    
    // Function to update scores on the server using an AJAX request
    function updateScore(userWin, userDraw, userLose) {
        // Debug log to indicate that the score update request is in progress
        console.log("Sending score update request...");

        // Create a new XMLHttpRequest instance
        var xhr = new XMLHttpRequest();

        // Configure the AJAX request
        xhr.open("POST", "/Project_TicTacToe/pointUpdate", true); // Specify HTTP method (POST) and target URL
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Set the request header to send URL encoded data

        // Prepare request parameters as URL encoded string
        var params = "userWin=" + encodeURIComponent(userWin)  // Encode and add player win score
            + "&userDraw=" + encodeURIComponent(userDraw)  // Encode and add draw score
            + "&userLose=" + encodeURIComponent(userLose); // Encode and add player lose score

        // Debug log to display request parameters
        console.log("Request params: " + params);

        // Define callback function to handle the response of the request
        xhr.onload = function () {
            if (xhr.status === 200) {
                // If request is successful (status 200), log success and server response
                console.log("Data successfully sent: " + xhr.responseText);
            } else {
                // If request fails, log error message with server response
                console.log("Error during data submission: " + xhr.responseText);
            }
        };

        // Define callback function to handle errors in the request
        xhr.onerror = function () {
            // Log error if AJAX request fails
            console.error("Error in the AJAX request");
        };

        // Send the request with encoded parameters
        xhr.send(params);
    }
});