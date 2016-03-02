package entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="friendships")
public class Friendship {
	@Id
	private int id;
	private int user_id_1;
	private int user_id_2;
}
