package co.lilpilot.blog.util;

import lombok.Data;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Data
public class Result<T> {
    private boolean success = false;
    private Map<String, T> data = null;
    private String msg = "";
    private String code = "500";

    public static <T> Result<T> success(T data) {
        Result result = new Result();
        result.setData(data);
        result.setCode("200");
        result.setMsg("success");
        result.setSuccess(true);
        return result;
    }

    public static <T> Result<T> fail(String code, String msg) {
        Result result = new Result();
        result.setSuccess(false);
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

    public Result<T> setData(T data) {
        Map map = new HashMap();
        map.put("result", data);
        this.data = map;
        return this;
    }

    public Result<T> setData(String key, T data) {
        Map map = new HashMap();
        map.put(key, data);
        this.data = map;
        return this;
    }

    //一定要有这个get方法 不然swagger获取不到data信息
    public T getData() {
        if(this.data != null && !this.data.isEmpty()) {
            Iterator iterator = this.data.keySet().iterator();
            if(iterator.hasNext()) {
                String key = (String)iterator.next();
                return this.data.get(key);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
