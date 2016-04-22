package helpers;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;

public class ShiroPasswordService {
	public static String generatePassword(String plainTextPassword, String passwordSalt){
		String hashedPasswordBase64 = new Sha256Hash(plainTextPassword, passwordSalt, 1024).toBase64();
		return hashedPasswordBase64;
	}
	
	public static String generateSalt(){
		RandomNumberGenerator rng = new SecureRandomNumberGenerator();
		Object salt = rng.nextBytes();
		return salt.toString();
	}
}
