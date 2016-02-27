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

import entities.ChallengeParameter;

@Path("/ChallengeParameters")
public class ChallengeParameterController {
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChallengeParameters() {
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
	public ChallengeParameter createChallengeParameter(ChallengeParameter challengeParameter) {
		return new ChallengeParameter();
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteChallengeParameter(@PathParam("id") long id) {
		return;
	}
	
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ChallengeParameter updateChallengeParameter(@PathParam("id") long id, ChallengeParameter challengeParameter) {
		return new ChallengeParameter();
	}
}
