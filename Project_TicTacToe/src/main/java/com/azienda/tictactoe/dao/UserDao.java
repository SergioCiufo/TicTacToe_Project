package com.azienda.tictactoe.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import com.azienda.tictactoe.model.User;

public class UserDao implements DaoInterface<User> {
	EntityManager manager;

	public UserDao() {
		super();
	}

	public UserDao(EntityManager manager) {
		super();
		this.manager = manager;
	}

	@Override
	public User create(User ref) {
		manager.persist(ref);
		return ref;
	}

	@Override
	public List<User> retrieve() {
		return manager.createQuery("select x from User x", User.class).getResultList();
	}

	@Override
	public User update(User ref) {
		manager.persist(ref);
		return ref;
	}

	@Override
	public void delete(User ref) {
		manager.remove(ref);		
	}
	
	public User findUsername(String username) {
		try {
			return manager.createQuery("select x from User x where x.username=:parUser", User.class).setParameter("parUser", username).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	public User findEmail(String email) {
		try {
			return manager.createQuery("select x from User x where x.email=:parEmail", User.class).setParameter("parEmail", email).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
	
}
