package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.advice.exception.AccessDeniedException;
import com.a705.hellogifty.advice.exception.AccessTokenExpiredException;
import com.a705.hellogifty.advice.exception.AuthenticationEntryPointException;
import com.a705.hellogifty.advice.dto.basic_response.CommonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RequiredArgsConstructor
@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entryPoint")
    public CommonResult entrypointException() {
        throw new AuthenticationEntryPointException();
    }

    @GetMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredException() {
        throw new AccessTokenExpiredException();
    }

    @PostMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPostException() {
        throw new AccessTokenExpiredException();
    }

    @PutMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPutException() {
        throw new AccessTokenExpiredException();
    }


    @DeleteMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredDeleteException() {
        throw new AccessTokenExpiredException();
    }

    @GetMapping("/accessDenied")
    public CommonResult accessDeniedException() {
        throw new AccessDeniedException();
    }

}
