package controllers;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

import entities.User;
import helpers.ShiroPasswordService;

@XmlRootElement
@Path("/auth")
public class AuthenticationController {
	@POST
	@Path("/authenticate")
	@Consumes(MediaType.APPLICATION_JSON)
	public void SignIn(User user){
		Subject currentUser = SecurityUtils.getSubject();
	    UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
	    currentUser.login(token);
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User signUp(User user) {
		user.setPasswordSalt(ShiroPasswordService.generateSalt());
		user.setPassword(ShiroPasswordService.generatePassword(user.getPassword(), user.getPasswordSalt()));
		return (new UserController()).createUser(user);
	}
}
