package helpers;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import controllers.EntityManagerService;
import entities.User;

public class AuthenticationHelper {
	public static User getCurrentUser(){
		Subject subject = SecurityUtils.getSubject();
		String username = (String) subject.getPrincipal();
		return getUserFromUsername(username);
	}
	
	public static User getUserFromUsername(String username){
		final EntityManager em = EntityManagerService.createEntityManager();
		try {
			final TypedQuery<User> query =
					em.createNamedQuery(User.QUERY_BY_USERNAME, User.class);
			query.setParameter("username", username);
			return query.getSingleResult();
		} finally {
			em.close();
		}
	}
}
