package com.azienda.tictactoe.dao;

import java.util.List;

public interface DaoInterface<T> {
	public T create(T ref);
	public List<T> retrieve();
	public T update(T ref);
	public void delete(T ref);
}
 