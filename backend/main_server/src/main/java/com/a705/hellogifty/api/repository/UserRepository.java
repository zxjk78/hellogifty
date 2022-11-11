package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);

    @Query("select u from User u join fetch u.userEvaluation ue where u.id=:id")
    Optional<User> findByIdWithUserEvaluation(@Param("id") Long id);
}
