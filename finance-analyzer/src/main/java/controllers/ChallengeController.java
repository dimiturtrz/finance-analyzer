package controllers;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;

import entities.Challenge;
import entities.ChallengeParameter;

@XmlRootElement
@Path("/challenges")
public class ChallengeController {
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Challenge> getChallenges() {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final TypedQuery<Challenge> query =
				em.createNamedQuery(Challenge.QUERY_ALL, Challenge.class);
			System.out.println(query.getResultList().get(0));
			return query.getResultList();
		} finally {
			em.close();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Challenge getChallenge(@PathParam("id") long id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final Challenge result = em.find(Challenge.class, id);
			if (result == null) {
				throw new IllegalArgumentException(
						"No task with id: " + id);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
	@POST
	@Path("")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Challenge createChallenge(Challenge challenge) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			ChallengeParameter param = challenge.getChallengeParameter();
			em.getTransaction().begin();
			
			em.persist(challenge);
			param.setChallenge(challenge);
			em.persist(param);
			
			em.getTransaction().commit();

			return challenge;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteChallenge(@PathParam("id") long id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Challenge challenge = em.find(Challenge.class, id);
			if (challenge == null) {
				throw new IllegalArgumentException(
						"No task with id: " + id);
			}
			em.remove(challenge);
			
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Challenge updateChallenge(@PathParam("id") long id, Challenge challenge) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			Challenge fromDb = getChallenge(id);
			challenge.getChallengeParameter().setChallenge(fromDb.getChallengeParameter().getChallenge());
			challenge.getChallengeParameter().setId(fromDb.getChallengeParameter().getId());
			challenge.setStatus(fromDb.getStatus());
			challenge.setProgress(fromDb.getProgress());
			challenge.setId(fromDb.getId());
			em.getTransaction().begin();
			em.merge(challenge.getChallengeParameter());
			final Challenge result = em.merge(challenge);
			em.getTransaction().commit();
			
			return result;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
}
