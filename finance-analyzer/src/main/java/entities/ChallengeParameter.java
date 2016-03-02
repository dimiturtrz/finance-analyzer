package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name="challenge_parameters")
@NamedQueries({
	@NamedQuery(name=ChallengeParameter.QUERY_ALL,
		query = "SELECT t from challenge_parameters t")
})
public class ChallengeParameter {
	public static final String QUERY_ALL = "allChallengeParameters";
	@Id
	private int id;
	private int challenge_id;
	private boolean less_than;
	private float value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getChallenge_id() {
		return challenge_id;
	}
	public void setChallenge_id(int challenge_id) {
		this.challenge_id = challenge_id;
	}
	public boolean isLess_than() {
		return less_than;
	}
	public void setLess_than(boolean less_than) {
		this.less_than = less_than;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
}
