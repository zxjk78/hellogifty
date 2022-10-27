package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.api.dto.basic_response.ManyResult;
import com.a705.hellogifty.api.service.GifticonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "")
@RequiredArgsConstructor
@RestController
@RequestMapping("/gifticon")
public class GifticonController {

    private final GifticonService gifticonService;

    @ApiOperation(value = "내 이모티콘 모음", n)
    @GetMapping("/{gifticonId}")
    public ManyResult<myGifticonList
//    Authentication authentication
//            UserDetails userDetails = (UserDetails) authentication.getDetails();
}
