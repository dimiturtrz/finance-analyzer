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

import entities.Friendship;
import controllers.EntityManagerService;

@XmlRootElement
@Path("/friendships")
public class FriendshipController {
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Friendship> getFriendships() {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final TypedQuery<Friendship> query =
				em.createNamedQuery(Friendship.QUERY_ALL, Friendship.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Friendship getMsg(@PathParam("id") int id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final Friendship result = em.find(Friendship.class, id);
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
	public Friendship createFriendship(Friendship friendship) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(friendship);
			em.getTransaction().commit();
			
			return friendship;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteFriendship(@PathParam("id") long id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Friendship friendship = em.find(Friendship.class, id);
			if (friendship == null) {
				throw new IllegalArgumentException(
						"No task with id: " + id);
			}
			em.remove(friendship);
			
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
	public Friendship updateFriendship(@PathParam("id") long id, Friendship friendship) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Friendship result = em.merge(friendship);
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
