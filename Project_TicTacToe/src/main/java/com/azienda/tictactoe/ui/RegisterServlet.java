package com.azienda.tictactoe.ui;

import java.io.IOException;

import com.azienda.tictactoe.exception.EmailAlreadyExsist;
import com.azienda.tictactoe.exception.UsernameAlreadyExsist;
import com.azienda.tictactoe.model.User;
import com.azienda.tictactoe.service.Service;
import com.azienda.tictactoe.utils.Costants;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			Service service=(Service)getServletContext().getAttribute(Costants.KEY_SERVICE);
			String usernameReg = req.getParameter(Costants.FORM_REGISTER_USERNAME);
			String passwordReg = req.getParameter(Costants.FORM_REGISTER_PASSWORD);
			String emailReg = req.getParameter(Costants.FORM_REGISTER_EMAIL);
			service.registerUser(usernameReg, passwordReg, emailReg);
			
			resp.sendRedirect(req.getContextPath()+"/jsp/TicTacToe.jsp");
		} catch (UsernameAlreadyExsist e) {
			e.printStackTrace();
			req.setAttribute(Costants.ERROR_REGISTER, e.getMessage());
			req.getRequestDispatcher("/jsp/TicTacToe.jsp").forward(req, resp);
		}catch(EmailAlreadyExsist e) {
			e.printStackTrace();
			req.setAttribute(Costants.ERROR_REGISTER, e.getMessage());
			req.getRequestDispatcher("/jsp/TicTacToe.jsp").forward(req, resp);
		}catch (Exception e) {
			e.printStackTrace();
			// da rivedere
			req.getRequestDispatcher(req.getContextPath()+"/jsp/Error.jsp");
		} 
	}
}
