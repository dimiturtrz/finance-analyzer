package entities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;

@Entity(name="challenges")
@NamedQueries({
	@NamedQuery(name=Challenge.QUERY_ALL,
		query = "SELECT t from challenges t")
})
public class Challenge {
	public static final String QUERY_ALL = "allChallenges";
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private User owner;
	private String declaration;
	private String since;
	private String deadline;
	private String status;
	private float progress;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy="challenge")
	private ChallengeParameter challengeParameter;
	
	public boolean hasExpired(Date date) {
		SimpleDateFormat format =
		        new SimpleDateFormat("MM/dd/yyyy");
		try {
			Date parsed = format.parse(getDeadline());
			return date.after(parsed);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

	public ChallengeParameter getChallengeParameter() {
		return challengeParameter;
	}
	
	public void setChallengeParameter(ChallengeParameter challengeParameter) {
		this.challengeParameter = challengeParameter;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getDeclaration() {
		return declaration;
	}

	public void setDeclaration(String declaration) {
		this.declaration = declaration;
	}

	public String getSince() {
		return since;
	}

	public void setSince(String since) {
		this.since = since;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public float getProgress() {
		return progress;
	}

	public void setProgress(float progress) {
		this.progress = progress;
	}
	
}
