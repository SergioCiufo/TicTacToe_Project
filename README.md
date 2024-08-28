# TicTacToe_Project

**Description / Descrizione**

ENG:

**TicTacToe_Project** is an interactive web application that implements the classic game of Tic-Tac-Toe, where players can challenge an intelligent bot. The project features a registration and login system to keep track of wins, losses, and draws. Registered users can view their scores in real-time, both as logged-in users and as guests. The background of the page is created using an animated SVG graphic to provide a playful and engaging visual style.

ITA:

**TicTacToe_Project** è un'applicazione web interattiva che implementa il gioco del Tris (Tic-Tac-Toe), dove i giocatori possono sfidare un bot intelligente. Il progetto include un sistema di registrazione e login per tenere traccia delle vittorie, sconfitte e pareggi. Gli utenti registrati possono visualizzare i loro punteggi in tempo reale, sia come utenti autenticati che come ospiti. Lo sfondo della pagina è creato utilizzando un'immagine SVG animata per offrire uno stile visivo giocoso e coinvolgente.
Features / Funzionalità Principali

ENG:

    **Play Against an Intelligent Bot**: The bot is designed to prevent the player from winning if they are about to win (2 out of 3 cells) and tries to make winning moves when possible.
    **Registration and Login System**: Users can register with validation for existing usernames and emails in the database. Once logged in, their scores are retrieved and displayed.
    **Real-Time Scores**: Scores are dynamically updated using AJAX, without reloading the entire page.
    **Modern User Interface**: The web page is built using JSP, CSS, Bootstrap, JavaScript, and jQuery, offering a smooth and modern user experience.
    **Playful Design**: The background of the page is created using an SVG graphic, which is animated to provide a playful and engaging visual style.

ITA:

    **Gioca contro un Bot Intelligente**: Il bot è progettato per prevenire la vittoria del giocatore se quest'ultimo sta per vincere (2 caselle su 3) e tenta di fare mosse vincenti quando possibile.
    **Sistema di Registrazione e Login**: Gli utenti possono registrarsi con la validazione di username ed email esistenti nel database. Una volta loggati, i loro punteggi vengono recuperati e visualizzati.
    **Punteggi in Tempo Reale**: I punteggi vengono aggiornati dinamicamente usando AJAX, senza bisogno di ricaricare l'intera pagina.
    **Interfaccia Utente Moderna**: La pagina web è costruita utilizzando JSP, CSS, Bootstrap, JavaScript e jQuery, offrendo un'esperienza utente fluida e moderna.
    **Design Giocoso**: Lo sfondo della pagina è creato utilizzando un'immagine SVG, che è animata per offrire uno stile visivo giocoso e coinvolgente.

**Technologies Used / Tecnologie Utilizzate**

ENG:

    **Java with JPA (Hibernate)**: Backend management, including registration, login, and score handling.
    **JSP, CSS, Bootstrap**: Frontend structuring and styling for a responsive and attractive interface.
    **JavaScript, jQuery, AJAX**: Handling dynamic interactions and real-time score updates.

ITA:

    **Java con JPA (Hibernate)**: Gestione del backend, compresa la registrazione, il login e la gestione dei punteggi.
    **JSP, CSS, Bootstrap**: Strutturazione e stile del frontend per un'interfaccia responsiva e attraente.
    **JavaScript, jQuery, AJAX**: Gestione delle interazioni dinamiche e aggiornamento dei punteggi in tempo reale.

**System Requirements / Requisiti di Sistema**

ENG:

    **Java JDK 8 or higher**: Required to run the backend.
    **Apache Tomcat**: For deploying the web application.
    **MySQL Database**: Used to store user data and scores.

ITA:

    **Java JDK 8 o superiore**: Necessario per eseguire il backend.
    **Apache Tomcat**: Per il deployment dell'applicazione web.
    **Database MySQL**: Utilizzato per memorizzare i dati degli utenti e i punteggi.

**Installation / Installazione**

ENG:

    Clone the repository:

    git clone https://github.com/SergioCiufo/TicTacToe_Project.git

    Configure the MySQL database: Create a database and update the configuration in persistence.xml with your credentials.

    Build and deploy the project on Tomcat:
        Use Maven or an IDE like Eclipse or IntelliJ IDEA to build the project.
        Deploy the war file to an Apache Tomcat server.

    Access the application via browser:
        Go to the configured URL for Tomcat (http://localhost:8080/Project_TicTacToe/jsp/TicTacToe.jsp).

ITA:

    Clona il repository:

    git clone https://github.com/SergioCiufo/TicTacToe_Project.git

    Configura il database MySQL: Crea un database e aggiorna le configurazioni in persistence.xml con le tue credenziali.

    Compila e deploya il progetto su Tomcat:
        Usa Maven o un IDE come IntelliJ IDEA per costruire il progetto.
        Deploya il file war su un server Apache Tomcat.

    Accedi all'applicazione tramite browser:
        Vai all'URL configurato per Tomcat (http://localhost:8080/Project_TicTacToe/jsp/TicTacToe.jsp).

**Contributing / Contribuire**

ENG:

Contributions and improvements are welcome! Follow these steps to contribute:

    Fork the repository.
    Create a new branch for your changes:

    git checkout -b feature/your-feature-name

Implement your changes and commit:

    git commit -m "Description of the changes"

    Push the branch and open a pull request.

ITA:

I contributi e i miglioramenti sono benvenuti! Segui questi passaggi per contribuire:

    Forka il repository.
    Crea un branch per le tue modifiche:

    git checkout -b feature/nome-feature

Implementa le modifiche e fai commit:

    git commit -m "Descrizione delle modifiche"

    Pusha il branch e apri una pull request.

License / Licenza

This project is licensed under the MIT License.
