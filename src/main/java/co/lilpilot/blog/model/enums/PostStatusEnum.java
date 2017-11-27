package co.lilpilot.blog.model.enums;

import lombok.Getter;

/**
 * Created by lilpilot on 2017/7/5.
 */
public enum PostStatusEnum {

    CLOSED(-1 ,"关闭"),
    OPEN(1, "开放"),
    DRAFT(2, "草稿");

    @Getter
    private Integer value;
    @Getter
    private String desc;

    PostStatusEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static String getDescByValue(Integer value) {
        for (PostStatusEnum postStatusEnum : PostStatusEnum.values()) {
            if (postStatusEnum.getValue().equals(value)) {
                return postStatusEnum.getDesc();
            }
        }
        return "";
    }

}
