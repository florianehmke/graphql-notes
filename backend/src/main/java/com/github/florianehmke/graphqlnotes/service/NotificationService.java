package com.github.florianehmke.graphqlnotes.service;

import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.FluxSink;

import java.util.ArrayList;
import java.util.List;

@Controller
@GraphQLApi
public class NotificationService {

  private final List<FluxSink<Notification>> subscribers = new ArrayList<>();

  public void notify(String title, String content) {
    Notification notification = new Notification(title, content);
    subscribers.forEach(notificationFluxSink -> notificationFluxSink.next(notification));
  }

  public void addSubscriber(FluxSink<Notification> subscriber) {
    subscribers.add(subscriber.onDispose(() -> subscribers.remove(subscriber)));
  }
}
