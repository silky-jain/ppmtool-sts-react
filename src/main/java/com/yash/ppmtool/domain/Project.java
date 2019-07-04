
package com.yash.ppmtool.domain;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
/**
 * Project model is used as Transfer model object  tranfering data one to another 
 * @author silky.jain
 *
 */
@Entity
public class Project {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	/**
	 * id of project
	 */
	private Long id;
	
	@NotBlank(message="Project Name should not be blank")
	@Size(max=50,min=5,message="Project Name should be betwwen 5 to 50 characters")
	/**
	 * projectName of project
	 */
	private String projectName;
	
	@NotBlank(message="project identifier should not be blank")
	@Size(min=2,max=5,message="project  identifier size should be 2 to 5 characters")
	@Column(updatable=false,unique=true)
	
	/**
	 * projectIdentifier of project 
	 */
	private String projectIdentifier;
	
	@NotBlank(message="project description should not be blank")
	/**
	 * description of project
	 */
	private String description;
	@FutureOrPresent(message="startdate should be in future or present")
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * stardate of project
	 */
	private Date startdate;
	@Future(message="enddate should be in future")
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * enddate of project
	 */
	private Date enddate;
	
	@Column(updatable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * created date of projcet
	 */
	private Date createdAt;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	/**
	 * updatedat date of project
	 */
	private Date updatedAt;
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@PrePersist
	public void onCreate() {
		createdAt= new Date();
		
	}
	
	@PostUpdate
	public void onUpdate() {
		updatedAt= new Date();
		
	}
	
}
