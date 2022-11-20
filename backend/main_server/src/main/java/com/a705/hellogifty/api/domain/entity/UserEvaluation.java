package com.a705.hellogifty.api.domain.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class UserEvaluation extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "User_id")
    private User user;

    private Float totalScore = 100f;

    public static UserEvaluation createUserEvaluation(User newUser) {
        UserEvaluation userEvaluation = new UserEvaluation();
        userEvaluation.user = newUser;

        return userEvaluation;
    }

    public void addScore(float score) {
        this.totalScore+=score;
    }

}
