package co.lilpilot.blog.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by lilpilot on 2017/5/2.
 */
@MappedSuperclass
@Data
public abstract class BaseModel {
    @ApiModelProperty(value = "主键id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ApiModelProperty(value = "创建时间")
    @Column(nullable = false)
    private Date createTime;

    @ApiModelProperty(value = "更新时间")
    @Column(nullable = false)
    private Date updateTime;

    @ApiModelProperty(value = "状态")
    private String status;

    @PrePersist
    public void preSave() {
        createTime = updateTime = new Date();
        status = "on";
    }

    @PreUpdate
    public void preUpdate() {
        updateTime = new Date();
    }
}