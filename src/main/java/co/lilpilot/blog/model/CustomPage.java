package co.lilpilot.blog.model;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.Collections;
import java.util.List;

/**
 * Created by lilpilot on 2017/7/9.
 */
@Data
public class CustomPage<T> {
    private int pageIndex;
    private int pageSize;
    private int totalPage;
    private List<T> data = Collections.emptyList();

    public CustomPage() {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.totalPage = 0;
    }

    public CustomPage(Page<T> page) {
        this.pageIndex = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalPage = page.getTotalPages();
        this.data = page.getContent();
    }

    public CustomPage(int pageIndex, int pageSize, int totalPage, List<T> data) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalPage = totalPage;
        this.data = data;
    }
}
