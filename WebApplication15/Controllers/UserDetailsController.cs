using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication15.Models;

namespace WebApplication15.Controllers
{
    public class UserDetailsController : Controller
    {
        UserDetails objuserDetails = new UserDetails();
        UpdateDetailsDB objupdate = new UpdateDetailsDB();
        // GET: UserDetails
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(objuserDetails.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetByID()
        {
            var ID = Convert.ToInt32(Request.QueryString["ID"]);
            var UserDetailsModel = objupdate.ListAll().Find(x => x.ID.Equals(ID));
            //return Json(UserDetailsModel, JsonRequestBehavior.AllowGet);
            return View(UserDetailsModel);
        }

        public JsonResult Delete(int ID)
        {
            return Json(objuserDetails.Delete(ID), JsonRequestBehavior.AllowGet);
        }

    }
}


          