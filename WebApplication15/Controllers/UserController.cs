using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication15.Models;

namespace WebApplication15.Controllers
{
    public class UserController : Controller
    {
        UserDB userdb = new UserDB();
        // GET: User.........
        public ActionResult UserIndex()
        {
            return View();
        }

        public JsonResult GetMyMRF(string UserID, string UserPassword)
        {
            Session["Userid"] = UserID;
            return Json(userdb.GetMyMRF(UserID, UserPassword), JsonRequestBehavior.AllowGet);
        }
    }
}
