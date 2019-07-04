package com.yash.ppmtool.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yash.ppmtool.domain.Backlog;
import com.yash.ppmtool.domain.Project;
import com.yash.ppmtool.domain.ProjectTask;
import com.yash.ppmtool.exception.ProjectIdException;
import com.yash.ppmtool.repository.ProjectRepository;
@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private BacklogService backlogService;
	public Project saveOrUpdate(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase()); 
			project=projectRepository.save(project);
			
			Backlog backlog= new Backlog();
			backlog.setProject(project);
			backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
		
	
			backlogService.saveOrUpdate(backlog);
			
		}
		catch (Exception e) {
			throw new ProjectIdException("Project Id :"+project.getProjectIdentifier()+" already exists");
		}
		
		return project;
	}
	
	public List<Project> findAll(){
		return (List<Project>) projectRepository.findAll();
		
	}
	
	public void delete(Long id) {
		
		 Optional<Project> project=projectRepository.findById(id);
		Backlog backlog= backlogService.findByProjectIdentifier(project.get().getProjectIdentifier());
		backlogService.delete(backlog);
		
	}

	public Optional<Project> findById(Long id) {
		Optional<Project> project=projectRepository.findById(id);
		return project;
	}
	
	public Project findByprojectIdentifier(String projectIdentifier) {
		
		Project project= projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project==null) {
			throw new ProjectIdException("Project Id :"+projectIdentifier.toUpperCase()+" doesnt exist");
		}
		return project;
	}
	
	
}
