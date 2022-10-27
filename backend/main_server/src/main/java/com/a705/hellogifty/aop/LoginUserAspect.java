package com.a705.hellogifty.aop;


import com.a501.recipe.api.domain.entity.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.SoftException;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;

@Component
@Aspect
public class LoginUserAspect {


    @Around("execution(* *(.., @com.a501.recipe.aop.LoginUser (*), ..))")
    public Object passLoginUser(ProceedingJoinPoint pjp) throws Throwable {

        Object[] args = pjp.getArgs();

        //get all annotations for arguments
        MethodSignature signature = (MethodSignature) pjp.getSignature();
        String methodName = signature.getMethod().getName();
        Class<?>[] parameterTypes = signature.getMethod().getParameterTypes();
        Annotation[][] annotations;
        try {
            annotations = pjp.getTarget().getClass().
                    getMethod(methodName, parameterTypes).getParameterAnnotations();
        } catch (Exception e) {
            throw new SoftException(e);
        }

        //Find annotated argument
        for (int i = 0; i < args.length; i++) {
            for (Annotation annotation : annotations[i]) {
                if (annotation.annotationType() == LoginUser.class) {
                    Object raw = args[i];
                    if (raw instanceof User) {
                        SecurityContext context = SecurityContextHolder.getContext();
                        Authentication authentication = context.getAuthentication();

                        User loginUser=((User)authentication.getPrincipal());
                        // and replace it with a new value
                        args[i] = loginUser;
                    }
                }
            }
        }
        //execute original method with new args
        return pjp.proceed(args);
    }

}