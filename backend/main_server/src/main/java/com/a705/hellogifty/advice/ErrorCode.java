package com.a705.hellogifty.advice;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    DefaultException(9999, "예외 발생"),
    UserNotFound(1000, "일치하는 사용자가 존재하지 않음"),
    EmailLoginFailed(1001, "가입하지 않은 아이디 또는 잘못된 비밀번호"),
    EmailSignupFailed(1002, "이미 가입된 이메일으로 회원 가입 시도"),
    AuthenticationEntrypoint(1003, "해당 자원에 접근하기 위한 권한이 없음"),
    AccessDenied(1004, "해당 자원에 접근하기 위한 권한이 충분하지 않음"),
    RefreshTokenNotEqualException(1005, "리프레시 토큰이 일치하지 않음"),
    RefreshTokenExpiredException(1006, "리프레시 토큰이 만료됨, 재로그인 필요"),
    RefreshTokenNotFoundException(1007, "리프레시 토큰이 DB에 존재하지 않음"),
    AccessTokenExpiredException(1013, "엑세스 토큰이 만료됨, 재발급 필요"),
    TradePostNotFoundException(2000, "거래글이 존재하지 않음"),
    ChatRoomNotFoundException(3000, "채팅방이 존재하지 않음"),
    TradeHistoryNotFoundException(2001, "거래 내역이 존재하지 않음"),
    UserEvaluationDataNotFound(2002,"유저 평가 점수가 존재하지 않음"),
    LargeCategoryNotFoundException(2003, "해당하는 카테고리가 존재하지 않음"),
    GifticonNotFoundException(2004, "해당하는 기프티콘이 존재하지 않음"),
    SmallCategoryNotFoundException(2005, "해당하는 브랜드가 존재하지 않음")
    ;



    private int code;
    private String message;
}
