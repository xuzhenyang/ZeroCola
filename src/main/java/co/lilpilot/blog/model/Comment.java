package co.lilpilot.blog.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by lilpilot on 2017/5/26.
 */
@Data
@Entity
@Table(name = "comments")
public class Comment extends BaseModel {
    @ApiModelProperty(value = "邮箱")
    public String email;
    @ApiModelProperty(value = "昵称")
    public String nickname;
    @ApiModelProperty(value = "评论内容")
    public String content;
}
