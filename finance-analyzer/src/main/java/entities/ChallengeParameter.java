package entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="challenge_parameters")
public class ChallengeParameter {
	@Id
	private int id;
	private int challenge_id;
	private boolean less_than;
	private float value;
}
