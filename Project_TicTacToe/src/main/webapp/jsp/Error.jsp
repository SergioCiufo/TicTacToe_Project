<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Error Page</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">

<link rel="stylesheet"
	href="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/css/Error.css"%>" />
</head>
<body class="container">

<header class="row text-center align-items-center">
        <a href="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/jsp/TicTacToe.jsp"%>" id="title"><img id="title" src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
		+ "/media/title.png"%>"></a>
</header>
    
<main class="row justify-content-center">
  <div class="col-8" id="windowsError">
  	<div class="row" id="windowsBlue">
  		<h5>Error message</h5>
  	</div>
  	<div class="row" id="windowsGrey">
  		<div class="col-4">
	  		<img id="imgError" src="<%="http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
			+ "/media/error.png"%>">
  		</div>
  		<div class="col-8">
  		  	<h4>Something went wrong!</h4>
  		</div>
  	</div>
  	<div class="row" id="windowsBtn">
  		<div class="col-4">
  			<button id="errorBtn">Ok</button>
  		</div>
  	</div>
  </div>
</main>

<script>
  var redirectUrl = "<%= "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/jsp/TicTacToe.jsp" %>";

  // Aggiungi l'event listener al pulsante
  document.getElementById('errorBtn').addEventListener('click', function() {
    window.location.href = redirectUrl;
  });
</script>

</body>
</html>