package co.lilpilot.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by lilpilot on 2017/5/1.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .csrf().disable();
        /*
        * for problem on h2 web page
        * problem:
        * Refused to display 'xxx' in a frame because it set 'X-Frame-Options' to 'deny'.
        * */
        http.headers().frameOptions().disable();
    }
}
