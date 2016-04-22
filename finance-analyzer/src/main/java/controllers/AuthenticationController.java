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
		//user.setPassword(encryptPassword(user.getPassword()));
		return (new UserController()).createUser(user);
	}
	
	/*public String encryptPassword(String password) {
		final PasswordService passwordService = getPasswordService();
		return passwordService.encryptPassword(password);
	}
	
	private PasswordService getPasswordService() {
		final RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		final Collection<Realm> realms = securityManager.getRealms();
		PasswordMatcher credentialsMatcher = null;
		for (Realm next : realms) {
			if (next instanceof AuthenticatingRealm) {
				final AuthenticatingRealm authenticatingRealm = (AuthenticatingRealm) next;
				if (authenticatingRealm.getCredentialsMatcher() instanceof PasswordMatcher) {
					credentialsMatcher = (PasswordMatcher) authenticatingRealm.getCredentialsMatcher();
					break;
				}
			}
		}
		if (credentialsMatcher == null) {
			throw new IllegalStateException("Bad configuration");
		}
		return credentialsMatcher.getPasswordService();
	}*/
}
