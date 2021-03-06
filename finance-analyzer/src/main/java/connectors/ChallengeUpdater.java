package connectors;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import controllers.ChallengeController;
import controllers.EntityManagerService;
import entities.Challenge;
import entities.Transaction;

public class ChallengeUpdater {
	private final EntityManager em = EntityManagerService.createEntityManager();

	public void onCreate(Transaction t) {
		List<Challenge> challenges = new ChallengeController().getChallenges();
		try {
			em.getTransaction().begin();
			
			for(Challenge challenge : challenges) {
				if(!challenge.hasExpired(new Date())) {
					if(challenge.getChallengeParameter().isLessThan()) {
						if(t.getValue() < 0) {
							challenge.setProgress(challenge.getProgress() - t.getValue());
							em.merge(challenge);
						}
					} else {
						if(t.getValue() > 0) {
							challenge.setProgress(challenge.getProgress() + t.getValue());
							em.merge(challenge);
						}
					}
				}
			}

			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}
	
	public void onUpdate(Transaction old, Transaction updated) {
		List<Challenge> challenges = new ChallengeController().getChallenges();
		try {
			em.getTransaction().begin();
			
			for(Challenge challenge : challenges) {
				if(!challenge.hasExpired(new Date())) {
					float delta = calculateDelta(old, updated, challenge);
					if(delta != 0.0f) {
						challenge.setProgress(challenge.getProgress() + delta);
						em.merge(challenge);
					}
				}
			}
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}

	public float calculateDelta(Transaction old, Transaction updated, Challenge challenge) {
		if(old.getValue() < 0 && updated.getValue() < 0) {
			if(challenge.getChallengeParameter().isLessThan()) {
				return old.getValue() - updated.getValue();
			}
		}else if(old.getValue() > 0 && updated.getValue() > 0) {
			if(!challenge.getChallengeParameter().isLessThan()) {
				return updated.getValue() - old.getValue();
			}
		}else if(old.getValue() > 0 && updated.getValue() <= 0) {
			if(!challenge.getChallengeParameter().isLessThan()) {
				return -old.getValue();
			} else {
				return -updated.getValue();
			}
		}else if(old.getValue() < 0 && updated.getValue() >= 0) {
			if(challenge.getChallengeParameter().isLessThan()) {
				return old.getValue();
			} else {
				return updated.getValue();
			}
		}
		return 0.0f;
	}
	
	public void onDelete(Transaction t) {
		List<Challenge> challenges = new ChallengeController().getChallenges();
		try {
			em.getTransaction().begin();
			
			for(Challenge challenge : challenges) {
				if(!challenge.hasExpired(new Date())) {
					if(challenge.getChallengeParameter().isLessThan()) {
						if(t.getValue() < 0) {
							challenge.setProgress(challenge.getProgress() + t.getValue());
							em.merge(challenge);
						}
					} else {
						if(t.getValue() > 0) {
							challenge.setProgress(challenge.getProgress() - t.getValue());
							em.merge(challenge);
						}
					}
				}
			}

			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}
}
