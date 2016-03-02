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

import entities.ChallengeParameter;
import controllers.EntityManagerService;

@XmlRootElement
@Path("/challenge-parameters")
public class ChallengeParameterController {
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public List<ChallengeParameter> getChallengeParameters() {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final TypedQuery<ChallengeParameter> query =
				em.createNamedQuery(ChallengeParameter.QUERY_ALL, ChallengeParameter.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ChallengeParameter getMsg(@PathParam("id") int id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final ChallengeParameter result = em.find(ChallengeParameter.class, id);
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
	public ChallengeParameter createChallengeParameter(ChallengeParameter challengeParameter) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(challengeParameter);
			em.getTransaction().commit();
			
			return challengeParameter;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteChallengeParameter(@PathParam("id") long id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final ChallengeParameter challengeParameter = em.find(ChallengeParameter.class, id);
			if (challengeParameter == null) {
				throw new IllegalArgumentException(
						"No task with id: " + id);
			}
			em.remove(challengeParameter);
			
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
	public ChallengeParameter updateChallengeParameter(@PathParam("id") long id, ChallengeParameter challengeParameter) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final ChallengeParameter result = em.merge(challengeParameter);
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
