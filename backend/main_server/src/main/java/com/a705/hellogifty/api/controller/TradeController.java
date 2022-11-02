package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.dto.basic_response.ManyResult;
import com.a705.hellogifty.api.dto.basic_response.OneResult;
import com.a705.hellogifty.api.dto.trade_post.TradePostDetailResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostRequestDto;
import com.a705.hellogifty.api.service.ResponseService;
import com.a705.hellogifty.api.service.TradeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trade")
public class TradeController {

    private final TradeService tradeService;
    private final ResponseService responseService;


//    @ApiOperation(value = "판매글 검색", notes = "판매글 검색")
//    @GetMapping("/")
//    public ManyResult<TradePostListResponseDto> searchTradePost (@RequestParam String word) {
//
//    }

    @ApiOperation(value = "판매글 상세정보", notes = "판매글 상세정보")
    @GetMapping("/{tradePostId}")
    public OneResult<TradePostDetailResponseDto> tradePostDetail(@ApiIgnore @LoginUser User loginUser, @PathVariable Long tradePostId) {
        TradePostDetailResponseDto tradePostDetail = tradeService.tradePostDetail(loginUser, tradePostId);
        return responseService.getOneResult(tradePostDetail);
    }

    @ApiOperation(value = "판매글 작성", notes = "판매글 올리기")
    @PostMapping("/")
    public CommonResult tradePostCreate(@ApiIgnore @LoginUser User loginUser, @RequestBody TradePostRequestDto tradePostRequestDto) {
        tradeService.tradePostCreate(loginUser, tradePostRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "판매글 수정", notes = "판매글 수정")
    @PutMapping("/{tradePostId}")
    public CommonResult tradePostEdit(@ApiIgnore @LoginUser User loginUser, @PathVariable Long tradePostId, @RequestBody TradePostEditRequestDto tradePostEditRequestDto) {
        tradeService.tradePostEdit(loginUser, tradePostId, tradePostEditRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "판매글 삭제", notes = "판매글 삭제")
    @DeleteMapping("/{tradePostId}")
    public CommonResult tradePostDelete(@ApiIgnore @LoginUser User loginUser, @PathVariable Long tradePostId) {
        tradeService.tradePostDelete(loginUser, tradePostId);
        return responseService.getSuccessResult();
    }

}
