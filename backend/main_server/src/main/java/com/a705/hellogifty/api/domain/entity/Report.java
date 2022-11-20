package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.domain.enums.ReportReason;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Report extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tradepost_id")
    private TradePost tradePost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportee_id")
    private User reportee;

    @Enumerated(EnumType.STRING)
    private ReportReason reason;

    @Column(length = 200)
    private String content;


    public static Report createReport(TradePost tradePost, User loginUser, User targetUser, ReportReason reason, String content) {
        Report report = new Report();
        report.tradePost = tradePost;
        report.reporter = loginUser;
        report.reportee = targetUser;
        report.reason = reason;
        report.content = content;
        return report;
    }
}
