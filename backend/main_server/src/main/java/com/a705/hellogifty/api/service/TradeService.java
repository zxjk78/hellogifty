package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.*;
import com.a705.hellogifty.api.domain.entity.*;
import com.a705.hellogifty.api.domain.enums.ReportReason;
import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.trade_post.TradePostDetailResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import com.a705.hellogifty.api.dto.trade_post.TradePostRequestDto;
import com.a705.hellogifty.api.repository.*;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final LargeCategoryRepository largeCategoryRepository;
    private final SmallCategoryRepository smallCategoryRepository;
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
//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticonCropImg"+File.separator;
//        String defaultPath = gifticonCroppedImagePath+File.separator;
        TradePost tradePost = tradePostRepository.findById(tradePostId).orElseThrow(TradePostNotFoundException::new);
        return new TradePostDetailResponseDto(tradePost);
    }

    @Transactional
    public void tradePostCreate(User user, TradePostRequestDto tradePostRequestDto) throws IOException {

//        String rawBase = tradePostRequestDto.getCropFileBase64();
//        String[] basesplit = rawBase.split(",", 2);
//        String extension = basesplit[0].split(";", 2)[0].split("/", 2)[1];
//        String base = basesplit[1];
//        String extension = "png";
//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticonCropImg"+File.separator;
//        String defaultPath = System.getProperty("user.dir")+gifticonCroppedImagePath;
//        Base64.Decoder decoder = Base64.getDecoder();
//        byte[] decodedBytes = decoder.decode(base.getBytes());
//        FileOutputStream fileOutputStream = new FileOutputStream(img);
//        fileOutputStream.write(decodedBytes);
//        fileOutputStream.close();

        Gifticon gifticon = gifticonRepository.findByUserAndId(user, tradePostRequestDto.getGifticonId()).orElseThrow(GifticonNotFoundException::new);
        String fileUploadNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String originalImgName = getOriginalImgName(user, gifticon.getId());
        MultipartFile originalCropImg = tradePostRequestDto.getCropImg();
        System.out.println(originalCropImg);

        //LOCAL defaultPath
//        String defaultPath = System.getProperty("user.dir")+gifticonCroppedImagePath;
        //EC2 defaultPath
        String defaultPath = gifticonCroppedImagePath+File.separator;
        File img = new File(defaultPath+"crop"+"_"+LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"))+"_"+originalImgName.toString());
        originalCropImg.transferTo(img);


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
        Gifticon gifticon = gifticonRepository.findByUserAndId(user, gifticonId).orElseThrow(GifticonNotFoundException::new);
        return gifticon.getImg();
    }

    @Transactional
    public void tradePostEdit(User user, Long tradePostId, TradePostEditRequestDto tradePostEditRequestDto) {
        TradePost tradePost = tradePostRepository.findByUserAndId(user, tradePostId).orElseThrow(TradePostNotFoundException::new);
        tradePost.update(tradePostEditRequestDto);
    }

    @Transactional
    public void tradePostDelete(User user, Long tradePostId) {
        tradePostRepository.deleteByUserAndId(user, tradePostId);
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


    @Transactional
    public Page<TradePostListResponseDto> tradePostSearchResult(String keyWord, Short smallCategoryId, Short largeCategoryId, Integer sortChoice, int page) {
        // 1. 키워드만 있을 경우
        // 2. smallCategoryId만 있을 경우(small, large 있을때 포함)
        // 3. largeCategoryId만 있을 경우
        // 4. 키워드, small, large 다 없을 경우
        // 5. 키워드, small 있을 경우(키워드, small, large 있을때 포함)
        // 6. 키워드, large 있을 경우


        List<TradePostListResponseDto> searchedTradePostList = new ArrayList<>();


        if (largeCategoryId == null && smallCategoryId == null) {
            for (TradePost tradePost : tradePostRepository.findByTradeStateAndTitleContains(TradeState.ONSALE, keyWord).orElseThrow(TradePostNotFoundException::new)) {
                searchedTradePostList.add((new TradePostListResponseDto(tradePost)));
            }
        } else if (smallCategoryId == null) {
            LargeCategory largeCategory = largeCategoryRepository.findById(largeCategoryId).orElseThrow(LargeCategoryNotFoundException::new);
            for (TradePost tradePost : tradePostRepository.findByTradeStateAndTitleContainsAndGifticon_SmallCategory_LargeCategory(TradeState.ONSALE, keyWord, largeCategory).orElseThrow(TradePostNotFoundException::new)) {
                searchedTradePostList.add(new TradePostListResponseDto(tradePost));
            }
        } else {
            SmallCategory smallCategory = smallCategoryRepository.findById(smallCategoryId).orElseThrow(SmallCategoryNotFoundException::new);
            for (TradePost tradePost : tradePostRepository.findByTradeStateAndTitleContainsAndGifticon_SmallCategory(TradeState.ONSALE, keyWord, smallCategory).orElseThrow(TradePostNotFoundException::new)) {
                searchedTradePostList.add(new TradePostListResponseDto(tradePost));
            }
        }

        if (sortChoice.equals(1)) {

            Collections.sort(searchedTradePostList, (TradePostListResponseDto d1, TradePostListResponseDto d2) -> {
                int result = 1;
                if (d1.getId() > d2.getId())
                    result = -1;

                return result;
            });
        } else if (sortChoice.equals(2)) {
            // 판매글 정보에 판매자 티어 들어가게 바꾸고 나서 고쳐야할 코드
            Collections.sort(searchedTradePostList, (TradePostListResponseDto d1, TradePostListResponseDto d2) -> {
                int result = 1;

                Float sellerEvaluation1 = tradePostRepository.findById(d1.getId()).orElseThrow(TradePostNotFoundException::new).getUser().getUserEvaluation().getTotalScore();
                Float sellerEvaluation2 = tradePostRepository.findById(d2.getId()).orElseThrow(TradePostNotFoundException::new).getUser().getUserEvaluation().getTotalScore();

                if (sellerEvaluation1 >= sellerEvaluation2)
                    result = -1;
                return result;
            });
        } else if (sortChoice.equals(3)) {

            Collections.sort(searchedTradePostList, (TradePostListResponseDto d1, TradePostListResponseDto d2) -> {
                int result = -1;
                if (d1.getPrice() >= d2.getPrice())
                    result = 1;

                return result;
            });
        } else if (sortChoice.equals(4)) {
            
            Collections.sort(searchedTradePostList, (TradePostListResponseDto d1, TradePostListResponseDto d2) -> {

                String[] d1expirationDate = d1.getExpirationDate().split("-");
                String[] d2expirationDate = d2.getExpirationDate().split("-");
                Long d1result = Long.parseLong(d1expirationDate[0]+d1expirationDate[1]+d1expirationDate[2]);
                Long d2result = Long.parseLong(d2expirationDate[0]+d2expirationDate[1]+d2expirationDate[2]);

                int result = -1;
                if (d1result >= d2result)
                    result = 1;

                return result;
            });
        }


        Pageable pageable = PageRequest.of(page, 10);
        int start = Math.min((int)pageable.getOffset(), searchedTradePostList.size());
        int end = Math.min((start + pageable.getPageSize()), searchedTradePostList.size());

        return new PageImpl<>(searchedTradePostList.subList(start, end), pageable, searchedTradePostList.size());
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateTradeState () {
//        System.out.println(LocalDateTime.now());
        List<TradePost> tradePostList = tradePostRepository.findByGifticon_ExpirationDateBefore(LocalDate.now()).orElseThrow(TradePostNotFoundException::new);
        for (TradePost tradePost : tradePostList) {
            tradePost.changeStateToExpired();
        }
    }
}
