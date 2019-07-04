package com.yash.ppmtool.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * Project task model is used for transfering data from one place to another
 * @author silky.jain
 *
 */
@Entity
@Table(name="projecttasks")
public class ProjectTask {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	/**
	 * id of projecttask
	 */
	public Long id;
	
	@Column(updatable=false,unique=true)
	/**
	 * projectsequence of projecttask
	 */
	public String projectSequence;
	
	@NotBlank(message="Summary should not be blank ")
	@Size(min=10,max=100,message="Summary must be between 10 to 100 characters")
	/**
	 * summary of projecttask
	 */
	public String summary;
	
	@NotBlank(message="Acceptance Criteria should not be blank")
	/**
	 * acceptanceCriteria of projecttask
	 */
	public String acceptanceCriteria;
	
	@NotBlank(message="Status should not be blank")
	/**
	 * status of projectask // 1.todo 2.progress 3.done
	 */
	public String status;
	
	/**
	 * priority of projecttask //1.low 2.medium 3.high
	 */
	@NotNull(message="Priority must not be blank")
	public Integer priority;
	@Future(message="Duedate should be in future")
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * duedate of projecttask
	 */
	public  Date dueDate;
	
	@JsonIgnore
	@ManyToOne(cascade=CascadeType.ALL)
	/**
	 * backlog associated with projecttask
	 */
	public  Backlog backlog;
	
	/**
	 * projectIdentifier of project
	 */
	public String projectIdentifier;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * createdat of projecttask
	 */
	public Date created_At;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * updatedat of projecttask
	 */
	public Date updated_At;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectSequence() {
		return projectSequence;
	}

	public void setProjectSequence(String projectSequence) {
		this.projectSequence = projectSequence;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getAcceptanceCriteria() {
		return acceptanceCriteria;
	}

	public void setAcceptanceCriteria(String acceptanceCriteria) {
		this.acceptanceCriteria = acceptanceCriteria;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Backlog getBacklog() {
		return backlog;
	}

	public void setBacklog(Backlog backlog) {
		this.backlog = backlog;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public Date getCreated_At() {
		return created_At;
	}

	public void setCreated_At(Date created_At) {
		this.created_At = created_At;
	}

	public Date getUpdated_At() {
		return updated_At;
	}

	public void setUpdated_At(Date updated_At) {
		this.updated_At = updated_At;
	}
	
	@PrePersist
	public void onCreate() {
		created_At= new Date();
		
	}
	@PostUpdate
	public void onUpdate() {
		updated_At= new Date();
		
	}
	
	

	
}
