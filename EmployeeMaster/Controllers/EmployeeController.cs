using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeMaster.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeBL _objBL = new EmployeeBL();
        // GET: Employee
        public ActionResult EmployeeMaster()
        {
            return View();
        }

        public List<dynamic> GetEmployees(int Company_Id)
        {
            try
            {
                return _objBL.GetEmployees(Company_Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }
    }
}