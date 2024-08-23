package com.azienda.tictactoe.service;

import java.util.List;

import javax.persistence.EntityManager;

import com.azienda.tictactoe.dao.ScoreDao;
import com.azienda.tictactoe.dao.UserDao;
import com.azienda.tictactoe.exception.EmailAlreadyExsist;
import com.azienda.tictactoe.exception.InvalidCredentialsException;
import com.azienda.tictactoe.exception.UsernameAlreadyExsist;
import com.azienda.tictactoe.model.Score;
import com.azienda.tictactoe.model.User;

public class Service {
	private EntityManager manager;
	private UserDao userDao;
	private ScoreDao scoreDao;
	
	public Service() {
	}

	public Service(EntityManager manager, UserDao userDao, ScoreDao scoreDao) {
		super();
		this.manager = manager;
		this.userDao = userDao;
		this.scoreDao = scoreDao;
	}
	
	public User registerUser(String username, String password, String email) throws Exception {
		User user=null;
		try {
			manager.getTransaction().begin();
			//if di controllo se l'username è già esistente
			if(userDao.findUsername(username) !=null) {
				throw new UsernameAlreadyExsist ("Username Alrady Exist", null);
			}else if(userDao.findEmail(email) !=null){
				throw new EmailAlreadyExsist ("Email Alrady Exist", null);
			}else {
				user= new User(username, email, password);
				userDao.create(user);
				//manager.persist(user); //già esistente nel create del dao
				System.out.println("Utente creato con successo");
				Score scoreUtente= new Score(user, 0, 0, 0);
				if (user.getUsername().equals("admin")) {
					scoreUtente= new Score(user,50,0,0);
				}
				user.setScore(scoreUtente);
				//user=userDao.findScore(user.getId());
				//System.out.println(user.getScore().getWin());
				scoreDao.create(scoreUtente);
				//manager.persist(scoreUtente); //già esistente nel create del dao
				System.out.println(user.getScore());
				
				manager.getTransaction().commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
			manager.getTransaction().rollback();
			throw e;
		} return user;
	}
	
	public User loginCheck(String username, String password) throws Exception {
		User user=null;
		try {
			List<User> userList = userDao.retrieve();
			for(User u:userList) {
				//fix si può loggare case insensitive per l'username
				if(u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password)) {
					user=u;
					break;
				} 
			}
			if(user==null) {
				throw new InvalidCredentialsException("Invalid credentials", null);
			}
			System.out.println("Credenziali Valide");

			user=userDao.findScore(user.getId());
			System.out.println(user);
			System.out.println(user.getScore());
			
			return user;
		} catch (Exception e) {
			e.printStackTrace();
			//manager.getTransaction().rollback();
			throw e;
		}
	}
	
	public void updateScore(Integer userId, Integer userWin, Integer userDraw, Integer userLose) {
		User user=null;
		try {
			manager.getTransaction().begin();
			user=userDao.findScore(userId);
			user.getScore().setWin(userWin);
			user.getScore().setDraw(userDraw);
			user.getScore().setLose(userLose);
			manager.persist(user);
			System.out.println("Score Updated: "+ user.getUsername() + " " + user.getScore());
			manager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
	        manager.getTransaction().rollback();
	        throw e;
		}

	}
	
}
