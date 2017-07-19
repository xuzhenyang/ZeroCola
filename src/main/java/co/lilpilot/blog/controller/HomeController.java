package co.lilpilot.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by lilpilot on 2017/7/17.
 */
@Controller
public class HomeController {
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
