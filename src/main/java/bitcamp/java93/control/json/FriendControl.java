package bitcamp.java93.control.json;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java93.domain.Friend;
import bitcamp.java93.domain.Trainer;
import bitcamp.java93.service.FriendService;

@RestController
@RequestMapping("/friend/")
public class FriendControl {
  @Autowired
  FriendService friendService;



  @RequestMapping("add")
  public JsonResult add(Friend friend) throws Exception {
    friendService.add(friend);
    System.out.println(friend);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  @RequestMapping("add2")
  public JsonResult add2(Friend friend) throws Exception {
    friendService.add2(friend);
    System.out.println(friend);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }

  @RequestMapping("detail")
  public JsonResult detail(Friend friend) throws Exception {
    
    friendService.get(friend);
    
    return new JsonResult(JsonResult.SUCCESS, friend);
  } // service()
  
  @RequestMapping("delete")
  public JsonResult delete(Friend friend) throws Exception {
    friendService.remove(friend);
    
   return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  @RequestMapping("delete2")
  public JsonResult delete2(Friend friend) throws Exception {
    friendService.remove2(friend);
    
   return new JsonResult(JsonResult.SUCCESS, "ok");
  }


}