package com.yash.ppmtool.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yash.ppmtool.domain.Backlog;
import com.yash.ppmtool.domain.Project;
import com.yash.ppmtool.domain.ProjectTask;
import com.yash.ppmtool.service.BacklogService;
import com.yash.ppmtool.service.MapValidationService;
import com.yash.ppmtool.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	@Autowired
	private MapValidationService mapValidationService;
	
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject (@Valid@RequestBody Project project,BindingResult result){
		
		ResponseEntity<?> errorMap=mapValidationService.errorMapValidation(result);
		
		if(errorMap!=null) {
			return errorMap;
		}
		
		
		Project savedProject= projectService.saveOrUpdate(project);
	
		

		
		return new ResponseEntity<Project>(savedProject, HttpStatus.CREATED);
	}
	
	
	
	@GetMapping("/findByProjectIdentifier/{projectIdentifier}")
	public  Project getProjectByProjectIdentifier(@PathVariable String projectIdentifier){      
		Project project = projectService.findByprojectIdentifier(projectIdentifier);
		return project;
	}
	
	
	
	@GetMapping("/all")
	public  List<Project> retrieveAllProjects(){      
		List<Project> projects=projectService.findAll();
		return projects;
	}
	
	@DeleteMapping("/{id}")
	public void deleteProject(@PathVariable Long id){
		projectService.delete(id);
		
		
	}
	
	@GetMapping("/{id}")
	public Optional<Project> findBydId(@PathVariable Long id) {
	Optional<Project> project=	projectService.findById(id);
	return project;
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@RequestBody Project project,@PathVariable Long id){
		Optional<Project> project1=projectService.findById(id);
		if(!project1.isPresent()) 
			return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
		
		project.setId(id);
		project.setStartdate(project1.get().getStartdate());
		project.setEnddate(project1.get().getEnddate());
		project.setCreatedAt(project1.get().getCreatedAt());
		projectService.saveOrUpdate(project);
		
		return  new ResponseEntity<Project>(project,HttpStatus.OK);
		
		
	}
	
}
