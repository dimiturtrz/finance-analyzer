package entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="transactions")
public class Transaction {
	@Id
	private int id;
	private String description;
	private float value;
	private String date;
	private boolean important;
}