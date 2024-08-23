package com.azienda.tictactoe.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.azienda.tictactoe.model.Score;
import com.azienda.tictactoe.model.User;

public class ScoreDao implements DaoInterface<Score> {
	EntityManager manager;

	public ScoreDao() {
		super();
	}

	public ScoreDao(EntityManager manager) {
		super();
		this.manager = manager;
	}

	@Override
	public Score create(Score ref) {
		manager.persist(ref);
		return ref;
	}

	@Override
	public List<Score> retrieve() {
		return manager.createQuery("select x from Score x", Score.class).getResultList();
	} 

	@Override
	public Score update(Score ref) {
		manager.persist(ref);
		return ref;
	}

	@Override
	public void delete(Score ref) {
		manager.remove(ref);	
	}
	
	

}
