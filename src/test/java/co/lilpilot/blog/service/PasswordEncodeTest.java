package co.lilpilot.blog.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by lilpilot on 10/09/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PasswordEncodeTest {

    @Test
    public void testEncodePassword() {
        System.out.println(new BCryptPasswordEncoder().encode("test"));
    }
}
