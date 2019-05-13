package com.github.florianehmke.graphqlnotes.permission;

import com.github.florianehmke.graphqlnotes.service.UserService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

import static java.util.Arrays.asList;
import static java.util.stream.Stream.of;

@Component
@Aspect
public class PermissionEvaluator {

  private UserService userService;

  @Autowired
  public PermissionEvaluator(UserService userService) {
    this.userService = userService;
  }

  @Before("@annotation(com.github.florianehmke.graphqlnotes.permission.VerifyUser)")
  public void doPermissionCheck(JoinPoint joinPoint) throws IllegalStateException {
    // handle method / signature cast
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    Method method = signature.getMethod();

    Parameter userIdParameter =
        of(method.getParameters())
            .filter(parameter -> parameter.getAnnotationsByType(UserId.class).length > 0)
            .findFirst()
            .orElseThrow(IllegalStateException::new);

    Integer userId =
        parseUserId(
            joinPoint
                .getArgs()[
                asList(signature.getParameterNames()).indexOf(userIdParameter.getName())]);

    if (userId != null) {
      var currentUser = this.userService.currentUser();
      if (userId.longValue() != currentUser.getId()) {
        throw new AccessDeniedException("So nicht mein lieber!");
      }
    }
  }

  private static Integer parseUserId(Object userId) {
    if (userId == null) {
      return null;
    }
    if (userId instanceof Integer) {
      return (Integer) userId;
    }
    if (userId instanceof Long) {
      return ((Long) userId).intValue();
    }
    throw new IllegalStateException("how did this happen?");
  }
}
