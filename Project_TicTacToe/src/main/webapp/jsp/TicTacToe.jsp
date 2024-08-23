<%@page import="com.azienda.tictactoe.model.Score"%>
<%@page import="com.azienda.tictactoe.model.User"%>
<%@page import="com.azienda.tictactoe.utils.Costants"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Tic Tac Toe</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">

<link rel="stylesheet"
	href="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/css/TicTacToe.css"%>" />

<audio id="tapSound"
	src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/tap.mp3"%>"
	preload="auto"></audio>
	
<audio id="winSound"
	src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/win.mp3"%>"
	preload="auto"></audio>
	
<audio id="loseSound"
	src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/lose.mp3"%>"
	preload="auto"></audio>
	
<audio id="drawSound"
	src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/draw.mp3"%>"
	preload="auto"></audio>

</head>

<% 
	User user=(User)request.getSession().getAttribute(Costants.KEY_SESSION_USER);

	String errorLogin=(String)request.getAttribute(Costants.ERROR_LOGIN);
	
	String errorRegister=(String)request.getAttribute(Costants.ERROR_REGISTER);
%>

<body class="container">
    <div id="statusMessage" class="status-message hidden">
        <img id="statusImage" src="" alt="winLoseDraw">
    </div>
    <header class="row text-center align-items-center">
        <a href="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/jsp/TicTacToe.jsp"%>" id="title"><img id="title" src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/title.png"%>"></a>

    </header>

    <main class="row justify-content-center">
        <sidebar class="col-2">
            <div class="row mt-3 mb-3">
                <button class="sideBtn" id="newGame"><img id="imgNewGame" src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/newGame.png"%>"></button>
            </div>
            <div class="row mb-3">
	            <% if (user==null) { %>
	            <button id="btnLogin" class="sideBtn">
	            <img class="sideImg" src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/media/login.png"%>">
	            </button>
				<% } else { %>	
	            	<form action="<%= request.getContextPath() %>/logout" method="post">
		                <button id="btnLogout" class="sideBtn">
		                    <img class="sideImg" src="<%= request.getContextPath() %>/media/logout.png" alt="Logout">
		                </button>
	            	</form>
				<% } %>
            </div>

        </sidebar>
        <!--Div Login HIDE se credenziali non valide -->
        <div class="row justify-content-center text-center" id="divLogin"  <% if (errorLogin != null) { %> style="display: flex;" <% } %> >
            <form action="<%=request.getContextPath() + "/login"%>" method="post" class="col-12 mt-5">
                <div class="row justify-content-center mb-3">
                    <div class="col-6">                   	
                        <h3>Username</h3>
                        <input type="text" name="loginUsername" class="form-control" placeholder="Enter username" required>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
                    <div class="col-6">
                        <h3>Password</h3>
                        <input type="password" name="loginPassword" class="form-control" placeholder="Enter password"
                            required>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
	                <% if (errorLogin!=null) { %>
	                <p class="pError"><b><%=errorLogin%></b></p>
	                <% } %>
	                    <div class="col-6">
	                    	
	                        <button type="submit" class="btn btn-primary">Login</button>
	                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12">
                        <button id="btnRegister" class="btn btn-success">Sign Up</button>
                    </div>
                </div>

            </form>
        </div>
        <!---->
        <!--Div Register HIDE-->
        <div class="row justify-content-center text-center" id="divRegister" <% if (errorRegister != null) { %> style="display: flex;" <% } %>>
            <form action="<%=request.getContextPath() + "/register"%>" method="post" class="col-12 mt-5">
                <div class="row justify-content-center mb-3">
                    <div class="col-6">
                        <h3>Username</h3>
                        <input type="text" name="registerUsername" class="form-control" placeholder="Enter username"
                            required>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
                    <div class="col-6">
                        <h3>Password</h3>
                        <input type="password" name="registerPassword" class="form-control" placeholder="Enter password"
                            required>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
                    <div class="col-6">
                        <h3>Email</h3>
                        <input type="email" name="registerEmail" class="form-control" placeholder="Enter email"
                            required>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
                <% if (errorRegister!=null) { %>
                <p class="pError"><b><%=errorRegister%></b></p>
                <% } %>
                    <div class="col-3">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>
                    <div class="col-3">
                        <button type="reset" class="btn btn-danger">Reset</button>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-3">
                        <button id="btnRegisterBack" class="btn btn-secondary">Back</button>
                    </div>
                </div>
            </form>

        </div>
        <!---->

        <div class="col-8 tab">
            <div class="row" id="row1">
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win0">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win1">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win2">
                    <button class="tap"></button>
                </div>
            </div>
            <div class="row borderBottom cell">

            </div>
            <div class="row" id="row2">
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win3">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win4">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win5">
                    <button class="tap"></button>
                </div>
            </div>
            <div class="row borderBottom cell">

            </div>
            <div class="row" id="row3">
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win6">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win7">
                    <button class="tap"></button>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center cell" id="win8">
                    <button class="tap"></button>
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="row">
                <h3 class="score">SCORE</h3>
            </div>
            <div class="row">
                <% 
					if (user != null && user.getScore() != null) {
				%>
					    <h4><%= user.getUsername() %>:
					    <span class="score" id="playerScore"><%= user.getScore().getWin() %> 
					    </span></h4>
				<% } else { %>	   
					    <h4>Player:
					    <span class="score" id="playerScore">0</span></h4>
					<% 
					}
					%>
            </div>
            
            <div class="row">
                <h4>Bot:
                <% 
					if (user != null && user.getScore() != null) {
				%>
                <span class="score" id="botScore"><%= user.getScore().getLose() %>
                </span></h4> 
                <% } else { %>
                <span class="score" id="botScore">0</span></h4>
                <% } %>
            </div>
            <div class="row">
            	
                <h4>Draw:
                <% 
					if (user != null && user.getScore() != null) {
				%>
                <span class="score" id="drawScore"><%= user.getScore().getDraw() %>
                </span></h4> 
                <% } else { %>
                <span class="score" id="drawScore">0</span></h4>
                <% } %>
                
            </div>
        </div>
    </main>

    <footer class="row text-center align-items-center">
        <div class="col-12">
            <h4>Tic Tac Toe Project 2024</h4>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/js/TicTacToe.js"%>"></script>
</body>

</html>