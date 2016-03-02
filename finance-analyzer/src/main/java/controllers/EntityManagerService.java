package controllers;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerService {
	private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("finance-analyzer");
	
	public static EntityManager createEntityManager() {
		return emf.createEntityManager();
	}

}