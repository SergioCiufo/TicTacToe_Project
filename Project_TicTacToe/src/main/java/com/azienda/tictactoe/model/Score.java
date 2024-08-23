package com.azienda.tictactoe.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Score {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer win;
	private Integer lose;
	private Integer draw;
	
	@OneToOne
	private User user;
	
	public Score(){
		super();
	}
	
	public Score(User user, Integer win, Integer lose, Integer draw){
		super();
		this.win=win;
		this.lose=lose;
		this.draw=draw;
		this.user=user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getWin() {
		return win;
	}

	public void setWin(Integer win) {
		this.win = win;
	}

	public Integer getLose() {
		return lose;
	}

	public void setLose(Integer lose) {
		this.lose = lose;
	}

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	@Override
	public int hashCode() {
		return Objects.hash(draw, id, lose, win);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Score other = (Score) obj;
		return Objects.equals(draw, other.draw) && Objects.equals(id, other.id) && Objects.equals(lose, other.lose)
				&& Objects.equals(win, other.win);
	}

	@Override
	public String toString() {
		return "Score [id=" + id + ", win=" + win + ", lose=" + lose + ", draw=" + draw + "]";
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

