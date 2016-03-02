package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name="friendships")
@NamedQueries({
	@NamedQuery(name=Friendship.QUERY_ALL,
		query = "SELECT t from friendships t")
})
public class Friendship {
	public static final String QUERY_ALL = "allFriendships";
	@Id
	private int id;
	private int user_id_1;
	private int user_id_2;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id_1() {
		return user_id_1;
	}
	public void setUser_id_1(int user_id_1) {
		this.user_id_1 = user_id_1;
	}
	public int getUser_id_2() {
		return user_id_2;
	}
	public void setUser_id_2(int user_id_2) {
		this.user_id_2 = user_id_2;
	}
}
