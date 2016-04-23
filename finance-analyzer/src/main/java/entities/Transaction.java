package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name="transactions")
@NamedQueries({
	@NamedQuery(name=Transaction.QUERY_ALL,
		query = "SELECT t from transactions t"),
	@NamedQuery(name=Transaction.QUERY_BY_USER,
			query = "SELECT t from transactions t WHERE t.user = :user")
})
public class Transaction implements Cloneable {
	public static final String QUERY_ALL = "allTransactions";
	public static final String QUERY_BY_USER = "transactionsByUser";
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private User user;
	private String description;
	private float value;
	private String date;
	private boolean important;
	
	public Object clone(){  
	    try {
	        return super.clone();  
	    } catch(Exception e){ 
	        return null; 
	    }
	}

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
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}