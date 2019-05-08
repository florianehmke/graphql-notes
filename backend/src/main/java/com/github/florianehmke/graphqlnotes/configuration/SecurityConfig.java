package com.github.florianehmke.graphqlnotes.configuration;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakSecurityComponents;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

import static org.springframework.context.annotation.ScopedProxyMode.TARGET_CLASS;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackageClasses = KeycloakSecurityComponents.class)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) {
    var keycloakAuthenticationProvider = keycloakAuthenticationProvider();
    var authorityMapper = new SimpleAuthorityMapper();

    keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(authorityMapper);
    auth.authenticationProvider(keycloakAuthenticationProvider);
  }

  @Bean
  public KeycloakSpringBootConfigResolver KeycloakConfigResolver() {
    return new KeycloakSpringBootConfigResolver();
  }

  @Bean
  @Override
  protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
    return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
  }

  @Bean
  @Scope(scopeName = "request", proxyMode = TARGET_CLASS)
  public Authentication authentication() {
    return SecurityContextHolder.getContext().getAuthentication();
  }

  @Bean
  @Scope(scopeName = "request", proxyMode = TARGET_CLASS)
  public KeycloakPrincipal<KeycloakSecurityContext> keycloakPrincipal() {
    var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    if (principal instanceof KeycloakPrincipal) {
      return (KeycloakPrincipal<KeycloakSecurityContext>) principal;
    } else {
      return null;
    }
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);
    http.csrf().disable().authorizeRequests().antMatchers("/**").permitAll();
  }
}
