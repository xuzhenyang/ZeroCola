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
@ToString(callSuper = true)
@Table(name = "tags")
public class Tag extends BaseModel {
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts = new ArrayList<>();

    //toString不包含tags 避免死循环
    @Override
    public String toString() {
        return "Tag{" +
                "name='" + name + '\'' +
                "}" + super.toString();
    }
}
