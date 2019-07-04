package com.yash.ppmtool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yash.ppmtool.domain.Backlog;

import com.yash.ppmtool.repository.BacklogRepository;

@Service
public class BacklogService {
	@Autowired
	private BacklogRepository backlogRepository;

	public Backlog saveOrUpdate(Backlog backlog) {

		Backlog newbacklog = backlogRepository.save(backlog);
		return newbacklog;
	}

	public Optional<Backlog> findById(Long id) {
		Optional<Backlog> backlog = backlogRepository.findById(id);
		return backlog;

	}

	public List<Backlog> findAll() {

		List<Backlog> backlogs = (List<Backlog>) backlogRepository.findAll();
		return backlogs;
	}
	
	public void deleteById(Long id) {
		backlogRepository.deleteById(id);
	}
	
	public void delete(Backlog backlog) {
		backlogRepository.delete(backlog);
	}

	public Backlog findByProjectIdentifier(String projectIdentifier) {
		Backlog backlog=backlogRepository.findByProjectIdentifier(projectIdentifier);
		return backlog;
	}
}
