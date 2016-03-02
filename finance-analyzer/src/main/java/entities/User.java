package entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="users")
public class User {
	@Id
	private int id;
	private String email;
	private String username;
	private String password_hash;
	private String password_salt;
	private float balance;
	private boolean admin;
}
