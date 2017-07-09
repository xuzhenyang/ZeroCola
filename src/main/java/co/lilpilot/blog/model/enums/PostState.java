package co.lilpilot.blog.model.enums;

import lombok.Getter;

/**
 * Created by lilpilot on 2017/7/5.
 */
public enum PostState {

    CLOSED(0 ,"关闭"),
    OPEN(1, "开放"),
    DRAFT(2, "草稿");

    @Getter
    private Integer value;
    @Getter
    private String desc;

    PostState(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static String getDescByValue(Integer value) {
        for (PostState postState : PostState.values()) {
            if (postState.getValue().equals(value)) {
                return postState.getDesc();
            }
        }
        return "";
    }

}
