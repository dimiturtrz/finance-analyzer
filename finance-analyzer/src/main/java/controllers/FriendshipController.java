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

import entities.Friendship;

@Path("/Friendships")
public class FriendshipController {
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFriendships() {
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
	public Friendship createFriendship(Friendship friendship) {
		return new Friendship();
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteFriendship(@PathParam("id") long id) {
		return;
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Friendship updateFriendship(@PathParam("id") long id, Friendship friendship) {
		return new Friendship();
	}
}
