package com.azienda.tictactoe.service;

import java.util.List;

import javax.persistence.EntityManager;

import com.azienda.tictactoe.dao.ScoreDao;
import com.azienda.tictactoe.dao.UserDao;
import com.azienda.tictactoe.exception.EmailAlreadyExsist;
import com.azienda.tictactoe.exception.InvalidCredentialsException;
import com.azienda.tictactoe.exception.UsernameAlreadyExsist;
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
	
	public String registerUser(String username, String password, String email) throws Exception {
		String check=null;
		try {
			manager.getTransaction().begin();
			//if di controllo se l'username è già esistente
			if(userDao.findUsername(username) !=null) {
				throw new UsernameAlreadyExsist ("Username Alrady Exist", null);
			}else if(userDao.findEmail(email) !=null){
				throw new EmailAlreadyExsist ("Email Alrady Exist", null);
			}else {
				User user= new User(username, email, password);
				manager.persist(user);
				userDao.create(user);
				manager.getTransaction().commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
			manager.getTransaction().rollback();
			throw e;
		} return check;
	}
	
	public User loginCheck(String username, String password) throws Exception {
		User user=null;
		try {
			manager.getTransaction().begin();
			List<User> userList = userDao.retrieve();
			for(User u:userList) {
				if(u.getUsername().equals(username) && u.getPassword().equals(password)) {
					user=u;
					break;
				} 
			}
			if(user==null) {
				throw new InvalidCredentialsException("Invalid credentials", null);
			}
			System.out.println("Credenziali Valide");
			manager.getTransaction().commit();
			return user;
		} catch (Exception e) {
			e.printStackTrace();
			manager.getTransaction().rollback();
			throw e;
		}
	}

}
