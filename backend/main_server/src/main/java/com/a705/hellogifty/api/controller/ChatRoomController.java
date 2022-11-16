package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.ChatRoomUsersResponseDto;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.service.ChatRoomService;
import com.a705.hellogifty.api.service.ResponseService;
import com.a705.hellogifty.api.service.TradeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ResponseService responseService;

    @GetMapping("/trade/{tradeId}")
    public CommonResult getChatRoomId(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("tradeId") Long tradeId) throws Exception{
            if(loginUser==null) throw new IllegalAccessException();
            Long chatRoomId = chatRoomService.getChatRoomId(loginUser, tradeId);
            return responseService.getOneResult(chatRoomId);
    }

    @GetMapping("/{id}/users")
    public CommonResult getChatRoomUsers(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("id") Long chatRoomId) throws Exception{
        if(loginUser==null) throw new IllegalAccessException();
        ChatRoomUsersResponseDto res = chatRoomService.getChatRoomUsers(loginUser, chatRoomId);
        return responseService.getOneResult(res);
    }


    @ApiOperation(value = "판매 완료", notes = "판매 완료")
    @PostMapping("/{chatRoomId}/done")
    public CommonResult tradeDone(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable Long chatRoomId) throws Exception{
        chatRoomService.completeTrade(loginUser, chatRoomId);
        return responseService.getSuccessResult();
    }

}
