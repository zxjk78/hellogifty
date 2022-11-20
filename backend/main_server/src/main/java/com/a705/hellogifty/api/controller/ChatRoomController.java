package com.a705.hellogifty.api.controller;

import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.chatroom.ChatRoomListItemResponseDto;
import com.a705.hellogifty.api.dto.chatroom.ChatRoomUsersResponseDto;
import com.a705.hellogifty.api.dto.basic_response.CommonResult;
import com.a705.hellogifty.api.service.ChatRoomService;
import com.a705.hellogifty.api.service.ResponseService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ResponseService responseService;

    @ApiOperation(value = "채팅방 id 구하기", notes = "채팅방 id 구하기")
    @GetMapping("/trade/{tradeId}")
    public CommonResult getChatRoomId(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("tradeId") Long tradeId) throws Exception{
            if(loginUser==null) throw new IllegalAccessException();
            Long chatRoomId = chatRoomService.getChatRoomId(loginUser, tradeId);
            return responseService.getOneResult(chatRoomId);
    }

    @ApiOperation(value = "채팅방 판매자, 구매자", notes = "채팅방 참여자 조회")
    @GetMapping("/{id}/users")
    public CommonResult getChatRoomUsers(
            @ApiIgnore @LoginUser User loginUser,
            @PathVariable("id") Long chatRoomId) throws Exception{
        if(loginUser==null) throw new IllegalAccessException();
        ChatRoomUsersResponseDto res = chatRoomService.getChatRoomUsers(loginUser, chatRoomId);
        return responseService.getOneResult(res);
    }

    @ApiOperation(value = "내가 참여 중인 채팅방 조회", notes = "내가 참여 중인 채팅방 조회")
    @GetMapping("/my")
    public CommonResult getMyChatRoomList(@ApiIgnore @LoginUser User loginUser) throws Exception{
        if(loginUser==null) throw new IllegalAccessException();
        List<ChatRoomListItemResponseDto> res = chatRoomService.getMyChatRoomList(loginUser);
        return responseService.getManyResult(res);
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
