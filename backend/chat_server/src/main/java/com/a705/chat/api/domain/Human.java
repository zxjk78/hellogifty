package com.a705.chat.api.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash("human")
@Getter
@AllArgsConstructor
@Builder
public class Human {

    @Id
    private String id;

    @Indexed// 필드 값으로 데이터를 찾을 수 있게 하는 어노테이션
    private String name;

    private Integer age;

    @TimeToLive
    private Long expriation;

    public static Human createHuman(String id, String name, Integer age ) {
        return Human.builder()
                .id(id)
                .name(name)
                .age(age)
                .build();
    }

}
