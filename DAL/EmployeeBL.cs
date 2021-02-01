using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeMaster
{
    public class EmployeeBL
    {
        EmployeeDAL _objDAL = new EmployeeDAL();

        public bool Employee(EmployeeModel obj)
        {
            return _objDAL.Employee(obj);
        }

        public List<dynamic> GetEmployees(int company_Id)
        {
            return _objDAL.GetEmployees(company_Id);
        }
        
        public bool UpdateEmployee(EmployeeModel obj)
        {
            return _objDAL.UpdateEmployee(obj);
        }

        public List<dynamic> GetEmployeesInactive(int Company_Id)
        {
            return _objDAL.GetEmployeesInactive(Company_Id);
        }
        public int DeleteEmployees(int user_Id, int LogUser)
        {
            return _objDAL.DeleteEmployees(user_Id, LogUser);
        }

    }
}
