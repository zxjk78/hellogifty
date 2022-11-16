package com.a705.hellogifty.api.dto.basic_response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
public class PageResult<T> extends CommonResult {
    private Page<T> data;
}
