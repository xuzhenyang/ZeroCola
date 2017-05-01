package co.lilpilot.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by lilpilot on 2017/5/1.
 */
@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(myApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("co.lilpilot.blog.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo myApiInfo() {
        return new ApiInfoBuilder()
                .title("MyBlog's rest api")
                .description("from lilpilot")
                .termsOfServiceUrl("http://blog.lilpilot.co")
                .version("1.0")
                .build();
    }
}
