package co.lilpilot.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Entity
@Data
@Table(name = "posts")
public class Post extends BaseModel {

    @ApiModelProperty(value = "文章标题")
    @Column(nullable = false)
    private String title;

    @ApiModelProperty(value = "文章内容")
    @Lob
    @Column(length = 16777216)
    private String content;

    @ApiModelProperty(value = "渲染后的文章内容")
    @Lob
    @Column(length = 16777216)
    private String renderedContent;

    @ApiModelProperty(value = "永久链接")
    private String permalink;

    @ApiModelProperty(value = "状态 0关闭 1开放 2草稿")
    private Integer status;

    @ApiModelProperty(value = "标签列表")
    //FetchType.EAGER : 默认LAZY会使用代理通过get()去获取 但在session关闭后查询不到
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")})
    private List<Tag> tags = new ArrayList<>();

    //维护多对多关系两端的状态
    //提供对子实体增加/删除的帮助类是很好的实践
    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getPosts().add(this);
    }

    public void removeTag(Tag tag) {
        tags.remove(tag);
        tag.getPosts().remove(this);
    }

    //toString不包含tags 避免死循环
    @Override
    public String toString() {
        return "Post{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", renderedContent='" + renderedContent + '\'' +
                ", permalink='" + permalink + '\'' +
                "}" + super.toString();
    }
}
