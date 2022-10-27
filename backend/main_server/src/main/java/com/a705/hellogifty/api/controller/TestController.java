package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.dto.basic_response.OneResult;
import com.a705.hellogifty.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "0. Test")
@RequiredArgsConstructor
@RestController
public class TestController {
    private final ResponseService responseService;

    @ApiOperation(value = "테스트", notes = "테스트 수행")
    @GetMapping("/test")
    public OneResult<String> test (@ApiIgnore @LoginUser User loginUser) {
        return responseService.getOneResult("Test");
    }
}
