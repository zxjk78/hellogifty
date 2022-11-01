package com.a705.hellogifty.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "0. Test")
@RequiredArgsConstructor
@RestController
public class TestController {
//    private final ResponseService responseService;
//
//    @ApiOperation(value = "테스트", notes = "테스트 수행")
//    @GetMapping("/test")
//    public OneResult<String> test (@ApiIgnore @LoginUser User loginUser) {
//        return responseService.getOneResult("Test");
//    }
}
