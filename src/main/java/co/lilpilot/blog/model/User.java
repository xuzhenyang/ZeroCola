package co.lilpilot.blog.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Data
@Entity
public class User extends BaseModel {
    @ApiModelProperty(value = "用户名")
    private String username;
    @ApiModelProperty(value = "密码（md5）")
    private String passwordHashed;
    @ApiModelProperty(value = "角色")
    private String role;
}
