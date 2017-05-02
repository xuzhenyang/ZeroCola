package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.User;
import co.lilpilot.blog.security.JwtTokenUtil;
import co.lilpilot.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lilpilot on 2017/5/2.
 */
@RestController
@RequestMapping("/api/v1")
public class TestController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;


    @PostMapping("/login")
    public Map<String, String> login(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password, Device device) {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        // Perform the security
        final String token = jwtTokenUtil.generateToken(userDetails, device);

        // Return the token
        // return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        HashMap<String, String> r = new HashMap<>();
        r.put("token", token);
        return r;
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello world";
    }

    @GetMapping("/init")
    public String init() {
        User user = new User();
        user.setUsername("admin");
        user.setPasswordHashed(new BCryptPasswordEncoder().encode("123456"));
        user.setRole("ADMIN");
        userService.saveOrUpdate(user);
        user = new User();
        user.setUsername("user");
        user.setPasswordHashed(new BCryptPasswordEncoder().encode("123456"));
        user.setRole("USER");
        userService.saveOrUpdate(user);
        return "init success";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/test")
    public String test() {
        return "you are admin";
    }

}
