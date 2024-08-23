package com.azienda.tictactoe.ui;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.azienda.tictactoe.dao.ScoreDao;
import com.azienda.tictactoe.dao.UserDao;
import com.azienda.tictactoe.model.User;
import com.azienda.tictactoe.service.Service;
import com.azienda.tictactoe.utils.Costants;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;

@WebServlet(value="/init",loadOnStartup = 1 )
public class Init extends HttpServlet {
	@Override
	public void init() throws ServletException {
		EntityManager manager=null;
		try {
			EntityManagerFactory factory=Persistence.createEntityManagerFactory(Costants.PERSISTENCE);
			manager =factory.createEntityManager();
			System.out.println("Connection OK");
			UserDao userDao= new UserDao(manager);
			ScoreDao scoreDao= new ScoreDao(manager);
			Service service = new Service(manager, userDao, scoreDao);
			getServletContext().setAttribute(Costants.KEY_SERVICE, service);
			//service.registerUser("admin", "admin", "admin@admin.com");

		} catch (Exception e) {
			e.printStackTrace();
			manager.close(); 
			System.exit(0);
		}	
	}
}
