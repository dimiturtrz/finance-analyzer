package controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
 
@Path("/test")
public class FinanceService {
 
	@GET
	public Response getMsg() {
 
		String output = "Jersey at work";
 
		return Response.status(200).entity(output).build();
 
	}
 
}