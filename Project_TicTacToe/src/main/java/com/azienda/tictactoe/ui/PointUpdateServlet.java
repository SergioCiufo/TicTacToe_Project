package com.azienda.tictactoe.ui;

import java.io.BufferedReader;
import java.io.IOException;

import com.azienda.tictactoe.dao.UserDao;
import com.azienda.tictactoe.model.User;
import com.azienda.tictactoe.service.Service;
import com.azienda.tictactoe.utils.Costants;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/pointUpdate")
public class PointUpdateServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
        	User user=(User)req.getSession().getAttribute(Costants.KEY_SESSION_USER);
        	if (user!=null) {
        		// Recupera i dati dalla richiesta
                String userWinParam = req.getParameter("userWin");
                String userLoseParam = req.getParameter("userLose");
                String userDrawParam = req.getParameter("userDraw");
                
                if (userWinParam == null || userLoseParam == null || userDrawParam == null) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("Invalid parameters");
                    return;
                }

                Integer userWin = Integer.parseInt(userWinParam);
                Integer userLose = Integer.parseInt(userLoseParam);
                Integer userDraw = Integer.parseInt(userDrawParam);
       
                // Ottieni il servizio e aggiorna il punteggio
                Service service = (Service) getServletContext().getAttribute(Costants.KEY_SERVICE);
                
                service.updateScore(user.getId(),userWin,userLose,userDraw);
                
               
                resp.getWriter().write("Score updated successfully");
        	} else {
        		resp.getWriter().write("The score cannot be updated because the user is not logged in.");
        	}

        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("Invalid number format");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("Server error: " + e.getMessage());
        }
    }
}
