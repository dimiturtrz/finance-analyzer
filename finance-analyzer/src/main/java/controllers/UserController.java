package controllers;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.User;

@Path("/users")
public class UserController {
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsers() {
		return Response.status(200).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMsg(@PathParam("id") int id) {
		return Response.status(200).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User createUser(User user) {
		return new User();
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteUser(@PathParam("id") long id) {
		return;
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUser(@PathParam("id") long id, User user) {
		return new User();
	}
}
