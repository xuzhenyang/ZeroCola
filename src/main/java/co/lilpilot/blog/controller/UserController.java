package co.lilpilot.blog.controller;

import co.lilpilot.blog.security.JwtTokenUtil;
import co.lilpilot.blog.service.UserService;
import co.lilpilot.blog.util.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lilpilot on 2017/5/2.
 */
@RestController
@Slf4j
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserService userService;

    @PostMapping("/api/v1/login")
    public Map<String, String> login(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password, Device device) {
        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        log.info("用户 {} 登录成功", username);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        // Perform the security
        final String token = jwtTokenUtil.generateToken(userDetails, device);
        // Return the token
        // return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        HashMap<String, String> result = new HashMap<>();
        result.put("token", token);
        return result;
    }

    @PostMapping("/api/v1/register")
    public Result<String> register(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password) {
        if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
            return Result.fail("500", "用户名或密码不能为空");
        }
        userService.createUser(username, password);
        log.info("注册用户 用户名 : {}", username);
        return Result.success("成功注册");
    }
}
