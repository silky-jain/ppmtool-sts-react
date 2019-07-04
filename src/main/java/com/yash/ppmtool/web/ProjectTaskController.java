package com.yash.ppmtool.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.yash.ppmtool.domain.ProjectTask;
import com.yash.ppmtool.service.MapValidationService;
import com.yash.ppmtool.service.ProjectTaskService;

@RestController
@RequestMapping("/api/projecttasks")
@CrossOrigin
public class ProjectTaskController {
	@Autowired
	private ProjectTaskService projectTaskService;
	@Autowired
	private MapValidationService mapValidationService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProjectTask (@Valid@RequestBody ProjectTask projectTask,BindingResult result){
		
	ResponseEntity<?> errorMap=mapValidationService.errorMapValidation(result);
		
		if(errorMap!=null) {
			return errorMap;
		}
		ProjectTask savedProjectTask= projectTaskService.saveOrUpdate(projectTask);
		
		return new ResponseEntity<ProjectTask>(savedProjectTask, HttpStatus.CREATED);
	}
	
	
	
	@DeleteMapping("/{projectSequence}")
	public void  deleteProjectTask(@PathVariable String projectSequence){
		projectTaskService.delete(projectSequence);
	}
	
	@GetMapping("/{projectSequence}")
	public ProjectTask findByProjectSequence(@PathVariable String projectSequence){
		
		ProjectTask projectTask= projectTaskService.findByProjectSequence(projectSequence);
		return projectTask;
		
	}
	
	@GetMapping("/all/{projectIdentifier}")
	public List<ProjectTask> findAllByProjectIdentifier(@PathVariable String projectIdentifier){
		
		List<ProjectTask>projectTasks=  projectTaskService.findAllByProjectIdentifier(projectIdentifier);
		return projectTasks;
		
	}

}
