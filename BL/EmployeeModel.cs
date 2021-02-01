using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeMaster
{
    public class EmployeeModel
    {

        public int Company_Id { get; set; }
        public int Employee_Id { get; set; }
        public string Employee_Name { get; set; }
        public string Employee_Code { get; set; }
        public string Region_Name { get; set; }
        public int User_Type_Id { get; set; }
        public string User_Type_Name { get; set; }
        public string Email_Id { get; set; }
        public string Password { get; set; }
        public int Created_By { get; set; }
        public int IsPasswordChanged { get; set; }

    }
}
