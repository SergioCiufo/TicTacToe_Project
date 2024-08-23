package com.azienda.tictactoe.ui;

import java.io.IOException;

import com.azienda.tictactoe.exception.InvalidCredentialsException;
import com.azienda.tictactoe.model.Score;
import com.azienda.tictactoe.model.User;
import com.azienda.tictactoe.service.Service;
import com.azienda.tictactoe.utils.Costants;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet ("/login")
public class LoginServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			Service service=(Service)getServletContext().getAttribute(Costants.KEY_SERVICE);
			String username=req.getParameter(Costants.FORM_LOGIN_USERNAME);
			String password=req.getParameter(Costants.FORM_LOGIN_PASSWORD);
			User user=service.loginCheck(username, password);
			
			req.getSession().setAttribute(Costants.KEY_SESSION_USER, user);

			//ti rimanda alla pagina
			resp.sendRedirect(req.getContextPath()+"/jsp/TicTacToe.jsp");
		} catch (InvalidCredentialsException e) {
			e.printStackTrace();
			req.setAttribute(Costants.ERROR_LOGIN, e.getMessage());
			//ti rimanda alla pagina da rivedere //messaggio rt
			req.getRequestDispatcher("/jsp/TicTacToe.jsp").forward(req, resp);
		} catch (Exception e) {
			e.printStackTrace();
			// da rivedere
			req.getRequestDispatcher(req.getContextPath()+"/jsp/Error.jsp");
		}
	}

}
