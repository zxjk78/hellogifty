package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.enums.ReportReason;
import lombok.Getter;

@Getter
public class UserReportRequestDto {

    private ReportReason reason;
    private String content;
}
