package com.yash.ppmtool.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.yash.ppmtool.domain.Backlog;



@Repository
public interface BacklogRepository extends CrudRepository<Backlog,Long>{
	
	Backlog findByProjectIdentifier(String projectIdentifier);
	
	

}
