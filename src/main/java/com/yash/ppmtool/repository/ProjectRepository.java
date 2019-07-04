package com.yash.ppmtool.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.yash.ppmtool.domain.Project;
import java.lang.String;
import java.util.List;
@Repository
public interface ProjectRepository extends CrudRepository<Project,Long>{
	
	Project findByProjectIdentifier(String projectidentifier);
	


}
