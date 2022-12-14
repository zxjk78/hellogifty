package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.gifticon.GifticonToValidateDataDto;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.dto.basic_response.ManyResult;
import com.a705.hellogifty.api.dto.basic_response.OneResult;
import com.a705.hellogifty.api.dto.gifticon.GifticonDetailResponseDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonEditRequestDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonListResponseDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonRegisterRequestDto;
import com.a705.hellogifty.api.service.GifticonService;
import com.a705.hellogifty.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Api(tags = "")
@RequiredArgsConstructor
@RestController
@RequestMapping("/mygifticon")
public class GifticonController {

    private final GifticonService gifticonService;

    private final ResponseService responseService;

    @Value("${image.gifticon.path}")
    String gifticonImagePath;

    @ApiOperation(value = "내 소유 전체 기프티콘 조회", notes = "로그인한 유저가 갖고 있는 모든 기프티콘 리스트")
    @GetMapping("/")
    public ManyResult<GifticonListResponseDto> myAllGifticon (@ApiIgnore @LoginUser User loginUser) {
//        List<GifticonListResponseDto> result = gifticonService.myAllGifticon(loginUser);
        return responseService.getManyResult(gifticonService.myAllGifticon(loginUser));
    }

    @ApiOperation(value = "내가 판매중인 기프티콘 목록 조회", notes = "로그인한 유저가 판매글을 올린 기프티콘 리스트")
    @GetMapping("/ontrade")
    public ManyResult<GifticonListResponseDto> myTradeGifticon (@ApiIgnore @LoginUser User loginUser) {
        return responseService.getManyResult(gifticonService.myTradeGifticon(loginUser));
    }

    @ApiOperation(value = "내 소유 기프티콘 상세정보", notes = "기프티콘 상세 정보 조회")
    @GetMapping("/{gifticonId}")
    public OneResult<GifticonDetailResponseDto> myGifticonDetail (@ApiIgnore @LoginUser User loginUser, @PathVariable Long gifticonId) {
        GifticonDetailResponseDto gifticonDetail = gifticonService.myGifticonDetail(loginUser, gifticonId);
        return responseService.getOneResult(gifticonDetail);
    }

    @ApiOperation(value = "기프티콘 등록" , notes = "기프티콘 등록")
    @PostMapping("/")
    public CommonResult myGifticonRegister(@ApiIgnore @LoginUser User loginUser, @ModelAttribute GifticonRegisterRequestDto gifticonRegisterRequestDto) throws IOException {

//        String fileUploadNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
//        String defaultPath = System.getProperty("user.dir")+gifticonImagePath;
//        MultipartFile originalImg = gifticonRegisterRequestDto.getImg();
//        System.out.println(gifticonRegisterRequestDto);
//        System.out.println(originalImg);
//        String originalImgName = originalImg.getOriginalFilename();
//        File image = new File(defaultPath+loginUser.getEmail()+"_"+fileUploadNow+"_"+originalImgName);
//        originalImg.transferTo(image);

        gifticonService.myGifticonRegister(loginUser, gifticonRegisterRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "내 소유 기프티콘 수정", notes = "기프티콘 정보 수정")
    @PutMapping("/{gifticonId}")
    public CommonResult myGifticonEdit (@ApiIgnore @LoginUser User loginUser, @PathVariable Long gifticonId, @RequestBody GifticonEditRequestDto gifticonEdit) {
        gifticonService.myGifticonEdit(loginUser, gifticonId, gifticonEdit);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "기프티콘 사용여부 변경", notes = "기프티콘 사용여부 변경")
    @PutMapping("/isused/{gifticonId}")
    public CommonResult changeGifticonState (@ApiIgnore @LoginUser User loginUser, @PathVariable Long gifticonId) {
        gifticonService.changeGifticonState(loginUser, gifticonId);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "내 소유 기프티콘 삭제", notes = "기프티콘 삭제")
    @DeleteMapping("/{gifticonId}")
    public CommonResult myGifticonDelete (@ApiIgnore @LoginUser User loginUSer, @PathVariable Long gifticonId) {
        gifticonService.myGifticonDelete(loginUSer, gifticonId);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value="기프티콘 정보 추출 및 유효성 검사", notes = "기프티콘 정보 추출 및 유효성 검사")
    @PostMapping("/validation")
    public CommonResult validateGifticons (@ModelAttribute GifticonToValidateDataDto gifticonToValidateDataDto) throws IOException {
        if(gifticonToValidateDataDto.getImgList()==null) return responseService.getFailResult(500,"이미지리스트 null");
        return responseService.getManyResult(gifticonService.validateGifticons(gifticonToValidateDataDto.getImgList()));
    }
}
