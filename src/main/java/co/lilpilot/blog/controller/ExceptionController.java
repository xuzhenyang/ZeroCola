package co.lilpilot.blog.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;

/**
 * Created by lilpilot on 10/01/2018.
 */
@Controller
public class ExceptionController implements ErrorController {
    @Override
    public String getErrorPath() {
        return "/index";
    }
}
