package com.github.florianehmke.graphqlnotes.service;

import org.springframework.stereotype.Service;
import reactor.core.publisher.FluxSink;

import java.util.ArrayList;
import java.util.List;

@Service
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
