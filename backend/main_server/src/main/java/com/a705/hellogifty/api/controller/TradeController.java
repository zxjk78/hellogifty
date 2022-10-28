package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.api.dto.basic_response.ManyResult;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trade")
public class TradeController {

//    @ApiOperation(value = "판매글 검색", notes = "판매글 검색")
//    @GetMapping("/")
//    public ManyResult<TradePostListResponseDto> searchTradePost (@RequestParam String word) {
//
//    }

}
