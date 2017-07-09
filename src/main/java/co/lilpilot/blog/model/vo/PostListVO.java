package co.lilpilot.blog.model.vo;

import co.lilpilot.blog.model.Tag;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Created by lilpilot on 2017/7/5.
 */
@Data
public class PostListVO {
    private Long id;

    private Date createTime;

    private Date updateTime;

    private String title;

    private String permalink;

    private Integer status;

    private String statusDesc;

    private List<Tag> tags;
}
