package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.UserInfoResponseDto;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.dto.basic_response.OneResult;
import com.a705.hellogifty.api.dto.user.MyInfoResponseDto;
import com.a705.hellogifty.api.dto.user.UserProfileResponseDto;
import com.a705.hellogifty.api.service.ResponseService;
import com.a705.hellogifty.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;



    @GetMapping("/my-info")
    public OneResult<MyInfoResponseDto> getMyInfo(@ApiIgnore @LoginUser User loginUser) {
        return responseService.getOneResult(userService.getMyInfo(loginUser));
    }

    @GetMapping("/{id}")
    public OneResult<UserProfileResponseDto> getUserInfo(@PathVariable Long id) {
        return responseService.getOneResult(userService.getUserInfo(id));
    }

}
