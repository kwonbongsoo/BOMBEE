package bitcamp.java93.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java93.dao.MemberDao;
import bitcamp.java93.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberDao memberDao;

  
  
}






