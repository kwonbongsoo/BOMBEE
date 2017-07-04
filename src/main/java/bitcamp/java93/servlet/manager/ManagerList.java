package bitcamp.java93.servlet.manager;
/* ServletContext 보관소에 저장된 MemberDao 이용하기
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bitcamp.java93.domain.Manager;
import bitcamp.java93.service.ManagerService;

@WebServlet(urlPatterns="/Manager/ManagerList")
public class ManagerList extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    /* 페이지 번호와 페이지당 출력 개수 파라미터 받기 */
    int pageNo = 1;
    int pageSize = 30;

    try { // pageNo 파라미터 값이 있다면 그 값으로 설정한다.
      pageNo = Integer.parseInt(req.getParameter("pageNo"));
    } catch (Exception e) {}

    try { // pageSize 파라미터 값이 있다면 그 값으로 설정한다.
      pageSize = Integer.parseInt(req.getParameter("pageSize"));
    } catch (Exception e) {}

    // 이렇게 출력 스트림을 얻기 전에 먼저 호출해야 한다.
    res.setContentType("text/html;charset=UTF-8"); // 위에 정의해주기때문에 아래 <meta> 는 안해줘도 된다.
    PrintWriter out = res.getWriter();

    out.println("<!DOCTYPE html>");
    out.println("<html>");
    out.println("<head>");
    out.println("  <meta charset='UTF-8'>");
    out.println("  <title>강사 관리</title>");

    // including 기법을 사용하여 각 페이지에 기본 CSS 스타일 코드를 출력한다.
    RequestDispatcher rd = req.getRequestDispatcher("/Style/core");
    rd.include(req, res);

    out.println("</head>");
    out.println("<body>");

    rd = req.getRequestDispatcher("/header");
    rd.include(req, res);

    out.println("<h1>강사 목록</h1>");

    try {
      ManagerService managerService = (ManagerService)this.getServletContext().getAttribute("managerService");
      List<Manager> list = managerService.list(pageNo, pageSize);

      out.println("<a href='form.html'>새 회원</a>");

      out.println("<table border='1'>");
      out.println("<thead>");
      out.println("  <tr><th>번호</th><th>이름</th><th>전화</th><th>이메일</th><th>홈페이지</th></tr>");
      out.println("</thead>");
      out.println("<tbody>");
      for (Manager mr : list) {
        out.println("<tr>");
        out.printf("  <td>%d</td>\n", mr.getNo());
        out.printf("  <td><a href='ManagerDetail?no=%d'>%s</a></td>\n", mr.getNo(), mr.getName());
        out.printf("  <td>%s</td>\n", mr.getTel());
        out.printf("  <td>%s</td>\n", mr.getEmail());
        out.printf("  <td>%s</td>\n", mr.getPosition());
        out.println("</tr>");
      }
      out.println("</tbody>");
      out.println("</table>");
    } catch (Exception e) {
      req.setAttribute("error", e); // ServletRequest 보관소에 오류 정보를 보관한다.
      rd = req.getRequestDispatcher("/error");
      rd.forward(req, res);
      return;
    }

    // including 기법을 사용하여 각 페이지마다 꼬리말을 붙인다.
    rd = req.getRequestDispatcher("/footer");
    rd.include(req, res);

    out.println("</body>");
    out.println("</html>");
  }
}












//
