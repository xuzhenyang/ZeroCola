package co.lilpilot.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Data
@Entity
@Table(name = "tags")
public class Tag extends BaseModel {
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    // @JsonIgnore避免response中的json数据产生死循环
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    //toString不包含posts 避免死循环
    @Override
    public String toString() {
        return "Tag{" +
                "name='" + name + '\'' +
                "}" + super.toString();
    }
}
