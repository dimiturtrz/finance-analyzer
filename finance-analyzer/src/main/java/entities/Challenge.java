package entities;

public class Challenge {
	private int id;
	private int user_id;
	private String declaration;
	private String since;
	private String deadline;
	private int status;
	private float progress;
	
	private static final String[] statuses = {"in progress", "failed", "completed"};
}
