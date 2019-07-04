package com.yash.ppmtool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yash.ppmtool.domain.Backlog;
import com.yash.ppmtool.domain.ProjectTask;
import com.yash.ppmtool.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private BacklogService backlogService;

	public ProjectTask saveOrUpdate(ProjectTask task) {
		Backlog backlog = backlogService.findByProjectIdentifier(task.getProjectIdentifier().toUpperCase());
		
		if (task.getId() == null) {
						
			backlog.setPTSequence(backlog.getPTSequence()+1);
			backlog.getProjectTasks().add(task);
			task.setProjectSequence(task.getProjectIdentifier().toUpperCase() +"_"+ backlog.getPTSequence());
			task.setBacklog(backlog);
		} else {
			ProjectTask oldProjectTask=findByProjectSequence(task.getProjectSequence());
			System.out.println(oldProjectTask);
			task.setCreated_At(oldProjectTask.getCreated_At());
		
			task.setBacklog(backlog);
		}

		ProjectTask projectTask = projectTaskRepository.save(task);

		return projectTask;
	}

	public ProjectTask findByProjectSequence(String projectSequence) {
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
		return projectTask;
	}

	public List<ProjectTask> findAllByProjectIdentifier(String projectIdentifier) {
		List<ProjectTask> projectTasks = (List<ProjectTask>) projectTaskRepository
				.findAllByProjectIdentifier(projectIdentifier.toUpperCase());
		return projectTasks;
	}

	public void delete(String projectSequence) {
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence.toUpperCase());
		projectTaskRepository.delete(projectTask);
	}

}
