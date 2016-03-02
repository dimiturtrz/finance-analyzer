package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name="transactions")
@NamedQueries({
	@NamedQuery(name=Transaction.QUERY_ALL,
		query = "SELECT t from transactions t")
})
public class Transaction {
	public static final String QUERY_ALL = "allTransactions";
	@Id
	private int id;
	private String description;
	private float value;
	private String date;
	private boolean important;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public boolean isImportant() {
		return important;
	}
	public void setImportant(boolean important) {
		this.important = important;
	}
}