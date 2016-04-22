package helpers;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.util.Factory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ShiroInitializer {
	private static final transient Logger log = LoggerFactory.getLogger(ShiroInitializer.class);
	
	public static void initialize() {
	    Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
	    SecurityManager securityManager = factory.getInstance();
	    SecurityUtils.setSecurityManager(securityManager);
	}
}
