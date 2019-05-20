package com.github.florianehmke.graphqlnotes.graphql;

import com.github.florianehmke.graphqlnotes.service.Notification;
import com.github.florianehmke.graphqlnotes.service.NotificationService;
import io.leangen.graphql.annotations.GraphQLSubscription;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import static reactor.core.publisher.FluxSink.OverflowStrategy.LATEST;

@Controller
@GraphQLApi
public class NotificationController {

  private NotificationService notificationService;

  @Autowired
  public NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  @GraphQLSubscription(description = "Get notified about creation/deletion of notes.")
  public Publisher<Notification> notifications() {
    return Flux.create(notificationService::addSubscriber, LATEST);
  }
}
