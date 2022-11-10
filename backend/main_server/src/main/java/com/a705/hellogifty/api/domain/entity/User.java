package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.dto.user.MmsIndexEditDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity implements UserDetails {

    @Column(unique = true, nullable = true, length = 30)
    String name;

    @Column(nullable = false, unique = true, length = 50)
    String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false, length = 100)
    String password;

    String phoneNumber;

    Long mmsIndex;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public void updateMmsIndex(MmsIndexEditDto mmsIndexEditDto) {
        this.mmsIndex = mmsIndexEditDto.getUserMmsIndex();
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    List<Gifticon> gifticonList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    List<TradePost> tradePostList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
//    List<TradeHistory> saleHistoryList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
//    List<TradeHistory> purchaseHistoryList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "evaluator", cascade = CascadeType.ALL)
//    List<Evaluation> evaluationByMeList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "evaluatee", cascade = CascadeType.ALL)
//    List<Evaluation> evaluationForMeList = new ArrayList<>();


}
