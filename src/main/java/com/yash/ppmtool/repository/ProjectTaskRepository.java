package com.yash.ppmtool.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.yash.ppmtool.domain.ProjectTask;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask,Long> {

	ProjectTask findByProjectSequence(String projectSequence);

	List<ProjectTask> findAllByProjectIdentifier(String projectIdentifier);

	

}
