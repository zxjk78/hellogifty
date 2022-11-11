package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.TradeHistoryNotFoundException;
import com.a705.hellogifty.advice.exception.TradePostNotFoundException;
import com.a705.hellogifty.advice.exception.UserEvaluationDataNotFound;
import com.a705.hellogifty.advice.exception.UserNotFoundException;
import com.a705.hellogifty.api.domain.entity.*;
import com.a705.hellogifty.api.domain.enums.ReportReason;
import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.trade_post.TradePostDetailResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostRequestDto;
import com.a705.hellogifty.api.repository.*;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradePostRepository tradePostRepository;
    private final GifticonRepository gifticonRepository;
    private final TradeHistoryRepository tradeHistoryRepository;
    private final UserRepository userRepository;
    private final EvalutationRepository evalutationRepository;
    private final UserEvaluationRepository userEvaluationRepository;
    private final ReportRepository reportRepository;

    @Value("${image.gifticon-crop.path}")
    String gifticonCroppedImagePath;

    @Transactional
    public TradePostDetailResponseDto tradePostDetail(User user, Long tradePostId) {
        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticonCropImg"+File.separator;
        TradePost tradePost = tradePostRepository.findById(tradePostId).get();
        return new TradePostDetailResponseDto(tradePost, defaultPath);
    }

    @Transactional
    public void tradePostCreate(User user, TradePostRequestDto tradePostRequestDto) throws IOException {
        Gifticon gifticon = gifticonRepository.findById(tradePostRequestDto.getGifticonId()).get();
//        String fileUploadNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String originalImgName = getOriginalImgName(user, gifticon.getId());
        String rawBase = tradePostRequestDto.getCropFileBase64();
        String[] basesplit = rawBase.split(",", 2);
        String extension = basesplit[0].split(";", 2)[0].split("/", 2)[1];
        String base = basesplit[1];
//        String extension = "png";
//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticonCropImg"+File.separator;
        String defaultPath = System.getProperty("user.dir")+gifticonCroppedImagePath;
        File img = new File(defaultPath+"crop"+"_"+originalImgName);

        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(base.getBytes());
        FileOutputStream fileOutputStream = new FileOutputStream(img);
        fileOutputStream.write(decodedBytes);
        fileOutputStream.close();

        TradePost tradePost = TradePost.builder().user(user)
                .gifticon(gifticon)
                .title(tradePostRequestDto.getTitle())
                .content(tradePostRequestDto.getContent())
                .price(tradePostRequestDto.getPrice())
                .tradeState(TradeState.ONSALE)
                .img(img.getName())
                .build();

        tradePostRepository.save(tradePost);
    }

    @Transactional
    public String getOriginalImgName(User user, Long gifticonId) {
        Gifticon gifticon = gifticonRepository.findById(gifticonId).get();
        return gifticon.getImg();
    }

    @Transactional
    public void tradePostEdit(User user, Long tradePostId, TradePostEditRequestDto tradePostEditRequestDto) {
        TradePost tradePost = tradePostRepository.findById(tradePostId).get();
        tradePost.update(tradePostEditRequestDto);
    }

    @Transactional
    public void tradePostDelete(User user, Long tradePostId) {
        tradePostRepository.deleteById(tradePostId);
    }

    @Transactional
    public void evaluateUser(Long tradePostId, User loginUser, Long targetUserId, float score) {
        User targetUser = userRepository.findById(targetUserId).orElseThrow(UserNotFoundException::new);
        TradeHistory tradeHistory = tradeHistoryRepository.findByTradePostIdAndSellerAndBuyer(tradePostId, loginUser, targetUser)
                .orElse(null);
        if(tradeHistory==null) tradeHistory = tradeHistoryRepository.findByTradePostIdAndSellerAndBuyer(tradePostId, targetUser, loginUser).orElseThrow(TradeHistoryNotFoundException::new);

        // 같은 거래에서 중복 평가 불가
        if(evalutationRepository.findTop1ByTradeHistoryAndEvaluator(tradeHistory,loginUser).orElse(null)!=null) throw new DuplicateRequestException();
        Evaluation evaluation = Evaluation.createEvaluation(tradeHistory, loginUser, targetUser, score);
        evalutationRepository.save(evaluation);

        UserEvaluation targetUserEvaluation = userEvaluationRepository.findByUser(targetUser).orElseThrow(UserEvaluationDataNotFound::new);
        targetUserEvaluation.addScore(score);
    }

    @Transactional
    public void reportUser(Long tradePostId, User loginUser, Long targetUserId, ReportReason reason, String content) {
        TradePost tradePost = tradePostRepository.findById(tradePostId).orElseThrow(TradePostNotFoundException::new);
        User targetUser = userRepository.findById(targetUserId).orElseThrow(UserNotFoundException::new);
        Report report = Report.createReport(tradePost, loginUser, targetUser, reason, content);
        reportRepository.save(report);
    }
}
