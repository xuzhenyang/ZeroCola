package co.lilpilot.blog.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by lilpilot on 10/01/2018.
 */
@Controller
public class ExceptionController implements ErrorController {
    @Override
    public String getErrorPath() {
        return "index";
    }
    @RequestMapping("/error")
    public String error() {
        return getErrorPath();
    }
}
