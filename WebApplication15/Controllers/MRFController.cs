using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication15.Models;

namespace WebApplication15.Controllers
{
    public class MRFController : Controller
    {
        MRFDB mrfDB = new MRFDB();
        UserDetails userdetails = new UserDetails();

        // GET: MRF SUCCESS PROJECT
        public ActionResult GetMRFDetails()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(mrfDB.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(MRFMODEL mrf)
        {
            return Json(mrfDB.Add(mrf), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(UserDetailsModel emp)
        {
            return Json(userdetails.Update(emp), JsonRequestBehavior.AllowGet);
        }

    }
}


 