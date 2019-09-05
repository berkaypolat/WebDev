package com.okta.example.JUGs.jugtours;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.okta.example.JUGs.jugtours.models.Event;
import com.okta.example.JUGs.jugtours.models.Group;
import com.okta.example.JUGs.jugtours.models.GroupRepository;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {
	
	private final GroupRepository repository;
	
	public Initializer(GroupRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public void run(String... strings) {
		Stream.of("Denver JUG", "Utah JUG", "Seattle JUG",
				"San Francisco JUG").forEach(name -> repository.save( new Group(name) )
		);
		
		Group djug = repository.findByName("Denver JUG");
		Event e = Event.builder().title("Full Stack Reactive")
				.description("Reactive with Spring Boot + Reacht")
				.date(Instant.parse("2018-12-12T18:00:00.00Z"))
				.build();
		djug.setEvents(Collections.singleton(e));
		repository.save(djug);
		
		repository.findAll().forEach(System.out::println);
	}

}
