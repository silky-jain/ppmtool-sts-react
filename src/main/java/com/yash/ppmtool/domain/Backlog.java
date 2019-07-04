package com.yash.ppmtool.domain;

import java.util.ArrayList;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Backlog model is used for transfering  data from one place to another
 * @author silky.jain
 *
 */
@Entity
@Table(name="backlogs")
public class Backlog {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	/**
	 * id of backlog
	 */
	public Integer id;
	
	/**
	 * Project Task Sequence of backlog
	 */
	public Long PTSequence=0L;
	
	/**
	 * projectidentifier of backlog
	 */
	public String projectIdentifier;
	
	@OneToOne(cascade=CascadeType.ALL)
	/**
	 * project associated with backlog
	 */
	public Project project;
	
	@OneToMany(cascade=CascadeType.ALL,orphanRemoval=true,mappedBy="backlog")
	/**
	 * List of projecttasks associated with backlog
	 */
	public List<ProjectTask>projectTasks= new ArrayList<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	
	public Long getPTSequence() {
		return PTSequence;
	}

	public void setPTSequence(Long pTSequence) {
		PTSequence = pTSequence;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public List<ProjectTask> getProjectTasks() {
		return projectTasks;
	}

	public void setProjectTasks(List<ProjectTask> projectTasks) {
		this.projectTasks = projectTasks;
	}
	


}
