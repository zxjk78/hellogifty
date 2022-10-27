package com.a705.hellogifty.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
//@EnableWebSecurity(debug = true)
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration {
    private final JwtProvider jwtProvider;

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().and()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests() // exception Handling을 위해 permit
                .antMatchers("/login/**", "/signup/**", "/reissue", "/exception/**").permitAll()
                .anyRequest().hasRole("USER")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new WebAuthenticationEntryPoint())
                .accessDeniedHandler(new WebAccessDeniedHandler())
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // Swagger 관련 Url 예외처리
        return (web) -> web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui/index.html", "/webjars/**", "/swagger/**", "/swagger-ui/**", "/resources/**");
    }
}
