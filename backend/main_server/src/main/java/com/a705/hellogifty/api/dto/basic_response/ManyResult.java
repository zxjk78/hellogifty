package com.a705.hellogifty.api.dto.basic_response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ManyResult<T> extends CommonResult {
    private List<T> data;

}
