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

import entities.User;

@XmlRootElement
@Path("/users")
public class UserController {
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsers() {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final TypedQuery<User> query =
				em.createNamedQuery(User.QUERY_ALL, User.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getMsg(@PathParam("id") int id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final User result = em.find(User.class, id);
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
	public User createUser(User user) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(user);
			em.getTransaction().commit();
			
			return user;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteUser(@PathParam("id") long id) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final User user = em.find(User.class, id);
			if (user == null) {
				throw new IllegalArgumentException(
						"No task with id: " + id);
			}
			em.remove(user);
			
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
	public User updateUser(@PathParam("id") long id, User user) {
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final User result = em.merge(user);
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
