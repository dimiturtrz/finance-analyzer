package connectors;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import controllers.ChallengeController;
import controllers.EntityManagerService;
import entities.Challenge;
import entities.Transaction;

public class ChallengeUpdater {
	private Transaction old;
	private Transaction updated;
	
	public ChallengeUpdater(Transaction old, Transaction updated) {
		this.old = old;
		this.updated = updated;
	}
	
	public void updateChallenges(boolean deleting) {
		final EntityManager em = EntityManagerService.createEntityManager();
		List<Challenge> challenges = new ChallengeController().getChallenges();
		float delta = calculateDelta(old, updated);
		try {
			em.getTransaction().begin();
			
			for(Challenge challenge : challenges) {
				if(!challenge.hasExpired(new Date())) {
					if(updated.getValue() < 0) {
						if(deleting) {
							challenge.setProgress(challenge.getProgress() + delta);
						} else {
							challenge.setProgress(challenge.getProgress() - delta);
						}
						
					}					
				}
				em.merge(challenge);
			}
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}

	public float calculateDelta(Transaction old, Transaction updated) {
		if(old == updated) return old.getValue();

		if(old.getValue() < updated.getValue()) {
			return Math.abs(old.getValue() - updated.getValue());
		} else {
			return - Math.abs(old.getValue() - updated.getValue());
		}
	}
}
