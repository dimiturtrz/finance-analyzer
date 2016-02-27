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

import entities.Challenge;

@Path("/challenges")
public class ChallengeController {
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChallenges() {
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
	public Challenge createChallenge(Challenge challenge) {
		return new Challenge();
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteChallenge(@PathParam("id") long id) {
		return;
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Challenge updateChallenge(@PathParam("id") long id, Challenge challenge) {
		return new Challenge();
	}
}
