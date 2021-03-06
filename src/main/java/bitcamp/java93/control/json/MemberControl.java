package bitcamp.java93.control.json;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java93.domain.Member;
import bitcamp.java93.service.MemberService;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/member/")
public class MemberControl {
  @Autowired
  MemberService memberService;
  @Autowired
  ServletContext ctx;
  
  @RequestMapping("add") /*0: bombee, 1: facebook, 2: kakao*/
  public JsonResult add(Member member) throws Exception {
    memberService.add(member);
    return new JsonResult(JsonResult.SUCCESS, member);
  }
  
  @RequestMapping("getinfo")
  public JsonResult get(int no, Model model) throws Exception {
    Member member = memberService.get(no);
    if (member == null) {
      return new JsonResult(JsonResult.FAIL, no+"번 회원이 없습니다");
    }
    model.addAttribute("member", member);
    return new JsonResult(JsonResult.SUCCESS, member);
    
  }
  
  @RequestMapping("profile-upload")
  public JsonResult profileUpload(Member member, MultipartFile[] files) throws Exception {

    String newFilename = this.getNewFilename();
    File file = new File(ctx.getRealPath("/upload/" + newFilename));
    files[0].transferTo(file);
    System.out.println(newFilename);
    member.setProfilePicture("/upload/" + newFilename);
    
    
    
    File thumbnailfile = new File(ctx.getRealPath("/upload/" + newFilename + "_140"));
    Thumbnails.of(file).size(140, 140).outputFormat("png").toFile(thumbnailfile);

    ////////
    thumbnailfile = new File(ctx.getRealPath("/upload/" + newFilename + "_190"));
    Thumbnails.of(file).size(190, 140).outputFormat("png").toFile(thumbnailfile);
    // 아이폰6+
    //////////
    
    ///
    thumbnailfile = new File(ctx.getRealPath("/upload/" + newFilename + "_170"));
    Thumbnails.of(file).size(170, 120).outputFormat("png").toFile(thumbnailfile);
    /// 아이폰6
    
    //
    thumbnailfile = new File(ctx.getRealPath("/upload/" + newFilename + "_146"));
    Thumbnails.of(file).size(146, 121).outputFormat("png").toFile(thumbnailfile);
    
    // 아이폰5
    
    thumbnailfile = new File(ctx.getRealPath("/upload/" + newFilename + "_450"));
    Thumbnails.of(file).size(450, 300).outputFormat("png").toFile(thumbnailfile);

    memberService.profileUpdate(member);

    return new JsonResult(JsonResult.SUCCESS, member.getProfilePicture());
  }
  
  
  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count);
  }
//  @RequestMapping("searchMusician")
//  public JsonResult searchMusician(HttpSession session, String location) throws Exception {
//    HashMap<String,Object> dataMap = new HashMap<>();
//    List<Musician> search= (List<Musician>)musicianService.searchMusician(getLoginMember(session).getNo() ,location);
//    dataMap.put("listSurf", search);
//    return new JsonResult(JsonResult.SUCCESS, dataMap);
//  }

}
