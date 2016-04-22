import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import helpers.ShiroInitializer;

public class FinanceServletContextListener implements ServletContextListener{
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		System.out.println("ServletContextListener destroyed");
	}

        //Run this before web application is started
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("ServletContextListener started");
		ShiroInitializer.initialize();
	}
}