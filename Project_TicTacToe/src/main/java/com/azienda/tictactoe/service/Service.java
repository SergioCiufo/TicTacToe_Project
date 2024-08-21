package com.azienda.tictactoe.service;

import javax.persistence.EntityManager;

import com.azienda.tictactoe.dao.ScoreDao;
import com.azienda.tictactoe.dao.UserDao;

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
	
	public String registerUser(String username, String password, String email) {
		
	}

}
