package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.advice.dto.basic_response.CommonResult;
import com.a705.hellogifty.advice.dto.basic_response.ManyResult;
import com.a705.hellogifty.advice.dto.basic_response.OneResult;
import com.a705.hellogifty.advice.dto.gifticon.GifticonDetailResponseDto;
import com.a705.hellogifty.advice.dto.gifticon.GifticonEditRequestDto;
import com.a705.hellogifty.advice.dto.gifticon.GifticonListResponseDto;
import com.a705.hellogifty.advice.dto.gifticon.GifticonRegisterRequestDto;
import com.a705.hellogifty.api.service.GifticonService;
import com.a705.hellogifty.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "")
@RequiredArgsConstructor
@RestController
@RequestMapping("/mygifticon")
public class GifticonController {

    private final GifticonService gifticonService;

    private final ResponseService responseService;

    @ApiOperation(value = "내 소유 전체 기프티콘 조회", notes = "로그인한 유저가 갖고 있는 모든 기프티콘 리스트")
    @GetMapping("/")
    public ManyResult<GifticonListResponseDto> myAllGifticon (@ApiIgnore @LoginUser User loginUser) {
//        List<GifticonListResponseDto> result = gifticonService.myAllGifticon(loginUser);
        return responseService.getManyResult(gifticonService.myAllGifticon(loginUser));
    }

    @ApiOperation(value = "내 소유 기프티콘 상세정보", notes = "기프티콘 상세 정보 조회")
    @GetMapping("/{gifticonId}")
    public OneResult<GifticonDetailResponseDto> myGifticonDetail (@ApiIgnore @LoginUser User loginUser, @PathVariable Long gifticonId) {
        GifticonDetailResponseDto gifticonDetail = gifticonService.myGifticonDetail(loginUser, gifticonId);
        return responseService.getOneResult(gifticonDetail);
    }

    @ApiOperation(value = "기프티콘 등록" , notes = "기프티콘 등록")
    @PostMapping("/")
    public CommonResult myGifticonRegister(@ApiIgnore @LoginUser User loginUser, @RequestBody GifticonRegisterRequestDto gifticonRegisterRequestDto) {
        gifticonService.myGifticonRegister(loginUser, gifticonRegisterRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "내 소유 기프티콘 수정", notes = "기프티콘 정보 수정")
    @PutMapping("/{gifticonId}")
    public CommonResult myGifticonEdit (@ApiIgnore @LoginUser User loginUser, @PathVariable Long gifticonId, @RequestBody GifticonEditRequestDto gifticonEdit) {
        gifticonService.myGifticonEdit(loginUser, gifticonId, gifticonEdit);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "내 소유 기프티콘 삭제", notes = "기프티콘 삭제")
    @DeleteMapping("/{gifticonId}")
    public CommonResult myGifticonDelete (@ApiIgnore @LoginUser User loginUSer, @PathVariable Long gifticonId) {
        gifticonService.myGifticonDelete(loginUSer, gifticonId);
        return responseService.getSuccessResult();
    }

}
