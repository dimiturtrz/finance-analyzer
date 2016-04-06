package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity(name="challenge_parameters")
@NamedQueries({
	@NamedQuery(name=ChallengeParameter.QUERY_ALL,
		query = "SELECT t from challenge_parameters t")
})
public class ChallengeParameter {
	public static final String QUERY_ALL = "allChallengeParameters";
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name="challenge_id")
	@JsonIgnore
	private Challenge challenge;
	private boolean lessThan;
	private float value;
	public void setChallenge(Challenge challenge) {
		this.challenge = challenge;
	}
	public Challenge getChallenge() {
		return challenge;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isLessThan() {
		return lessThan;
	}
	public void setLess_than(boolean lessThan) {
		this.lessThan = lessThan;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
}
