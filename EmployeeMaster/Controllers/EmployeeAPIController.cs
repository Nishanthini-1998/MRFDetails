using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;



namespace EmployeeMaster
{
    public class EmployeeAPIController : ApiController
    {
        EmployeeBL _objBL = new EmployeeBL();
        
        [HttpGet]
        [ActionName("GetEmployees")]
        public List<dynamic> GetEmployees(int Company_Id)
        {
            return _objBL.GetEmployees(Company_Id);
        }
        [HttpGet]
        [ActionName("GetEmployeesInactive")]
        public List<dynamic> GetEmployeesInactive(int Company_Id)
        {
            return _objBL.GetEmployeesInactive(Company_Id);
        }
        [HttpPost]
        [ActionName("UpdateEmployee")]
        public bool UpdateEmployee(EmployeeModel obj)
        {
            return _objBL.UpdateEmployee(obj); ;
        }
        [HttpPost]
        [ActionName("Employee")]
        public bool Employee(EmployeeModel obj)
        {
            return _objBL.Employee(obj); ;
        }
        [HttpPost]
        [ActionName("DeleteEmployees")]
        public int DeleteEmployees(int User_Id, int LogUser)
        {
            return _objBL.DeleteEmployees(User_Id, LogUser);
        }
    }
}
