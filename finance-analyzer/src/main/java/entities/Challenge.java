package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity(name="challenges")
@NamedQueries({
	@NamedQuery(name=Challenge.QUERY_ALL,
		query = "SELECT t from challenges t")
})
public class Challenge {
	public static final String QUERY_ALL = "allChallenges";
	@Id
	private int id;
	private int user_id;
	private String declaration;
	private String since;
	private String deadline;
	private String status;
	private float progress;
}
