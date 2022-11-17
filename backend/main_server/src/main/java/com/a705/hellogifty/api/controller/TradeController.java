package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import com.a705.hellogifty.api.dto.user.UserEvaluationRequestDto;
import com.a705.hellogifty.api.dto.user.UserReportRequestDto;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.dto.basic_response.OneResult;
import com.a705.hellogifty.api.dto.basic_response.PageResult;
import com.a705.hellogifty.api.dto.trade_post.TradePostDetailResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostRequestDto;
import com.a705.hellogifty.api.service.ResponseService;
import com.a705.hellogifty.api.service.TradeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trade")
public class TradeController {

    private final TradeService tradeService;
    private final ResponseService responseService;


    @ApiOperation(value = "판매글 검색", notes = "판매글 검색")
    @GetMapping("/")
    public PageResult<TradePostListResponseDto> searchTradePost (@RequestParam(required = false) String keyWord, @RequestParam(required = false) Short smallCategoryId, @RequestParam(required = false) Short largeCategoryId, @RequestParam(required = false, defaultValue = "1") Integer sortChoice, int page) {
        return responseService.getPageResult(tradeService.tradePostSearchResult(keyWord, smallCategoryId, largeCategoryId, sortChoice, page));
    }

    @ApiOperation(value = "판매글 상세정보", notes = "판매글 상세정보")
    @GetMapping("/{tradePostId}")
    public OneResult<TradePostDetailResponseDto> tradePostDetail(@ApiIgnore @LoginUser User loginUser, @PathVariable Long tradePostId) {
        TradePostDetailResponseDto tradePostDetail = tradeService.tradePostDetail(loginUser, tradePostId);
        return responseService.getOneResult(tradePostDetail);
    }

    @ApiOperation(value = "판매글 작성", notes = "판매글 올리기")
    @PostMapping("/")
    public CommonResult tradePostCreate(@ApiIgnore @LoginUser User loginUser, @RequestBody TradePostRequestDto tradePostRequestDto) throws IOException {
//        String defaultPath = System.getProperty("user.dir")+File.separator+"static"+File.separator+"img"+File.separator+"gifticonCropImg"+File.separator;
//        String originalImgName = tradeService.getOriginalImgName(loginUser, tradePostRequestDto.getGifticonId());
//        MultipartFile cropImg = tradePostRequestDto.getCropImg();
//        File img = new File(defaultPath+"crop_"+originalImgName);
//        cropImg.transferTo(img);

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

    // 거래 후 유저 평가
    @ApiOperation(value = "유저 평가", notes = "유저 평가")
    @PostMapping("/{id}/evaluation/user/{userId}")
    public CommonResult evaluateUser(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("id") Long tradePostId,
            @PathVariable("userId") Long targetUserId,
            @RequestBody UserEvaluationRequestDto userEvaluationRequestDto)
    {
        tradeService.evaluateUser(tradePostId, loginUser, targetUserId, userEvaluationRequestDto.getScore());
        return responseService.getSuccessResult();
    }

    // 유저 신고
    @ApiOperation(value = "유저 신고", notes = "유저 신고")
    @PostMapping("/{id}/report/user/{userId}")
    public CommonResult evaluateUser(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("id") Long tradePostId,
            @PathVariable("userId") Long targetUserId,
            @RequestBody UserReportRequestDto userReportRequestDto)
    {
        tradeService.reportUser(tradePostId, loginUser, targetUserId, userReportRequestDto.getReason(), userReportRequestDto.getContent() );
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "유통기한이 지난 판매글 상태 변경")
    @PutMapping("/expiration")
    public CommonResult expirationUpdate() {
        tradeService.updateTradeState();
        return responseService.getSuccessResult();
    }
}
