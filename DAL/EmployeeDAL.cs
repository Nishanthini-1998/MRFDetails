using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeMaster
{
    public class EmployeeDAL : DapperRepository
    {
        private const string SP_AKRA_SaveEmployee = "SP_AKRA_SaveEmployee";
        private const string SP_AKRA_GetEmployees = "SP_AKRA_GetEmployees";
        private const string SP_AKRA_GetEmployeesInactive = "SP_AKRA_GetEmployeesInactive";
        private const string SP_AKRA_UpdateEmployee = "SP_AKRA_UpdateEmployee";
        private const string SP_AKRA_DeleteEmployees = "SP_AKRA_DeleteEmployees";


        public bool Employee(EmployeeModel obj)
        {
            try
            {
                using (IDbConnection conn = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@Company_Id", obj.Company_Id);
                    p.Add("@Employee_Name", obj.Employee_Name);
                    p.Add("@Employee_Code", obj.Employee_Code);
                    p.Add("@Region_Name", obj.Region_Name);
                    p.Add("@User_Type", obj.User_Type_Id);
                    p.Add("@Email", obj.Email_Id);
                    p.Add("@Password", obj.Password);
                    p.Add("@loginuser", obj.Created_By);
                    conn.Query<dynamic>(SP_AKRA_SaveEmployee, p, commandType: CommandType.StoredProcedure).ToList();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }
        public List<dynamic> GetEmployees(int company_Id)
        {
            List<dynamic> lstemployee;
            try
            {
                using (IDbConnection conn = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@Company_Id", company_Id);
                    lstemployee = conn.Query<dynamic>(SP_AKRA_GetEmployees, p, commandType: CommandType.StoredProcedure).ToList();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lstemployee;
        }
        public List<dynamic> GetEmployeesInactive(int Company_Id)
        {
            List<dynamic> lstemployee;
            try
            {
                using (IDbConnection conn = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@Company_Id", Company_Id);
                    lstemployee = conn.Query<dynamic>(SP_AKRA_GetEmployeesInactive, p, commandType: CommandType.StoredProcedure).ToList();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lstemployee;
        }
        public bool UpdateEmployee(EmployeeModel obj)
        {
            try
            {
                using (IDbConnection conn = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@Company_Id", obj.Company_Id);
                    p.Add("@Employee_Id", obj.Employee_Id);
                    p.Add("@Employee_Name", obj.Employee_Name);
                    p.Add("@Employee_Code", obj.Employee_Code);
                    p.Add("@Region_Name", obj.Region_Name);
                    p.Add("@User_Type", obj.User_Type_Id);
                    p.Add("@Email", obj.Email_Id);
                    p.Add("@Password", obj.Password);
                    p.Add("@loginuser", obj.Created_By);
                    conn.Query<dynamic>(SP_AKRA_UpdateEmployee, p, commandType: CommandType.StoredProcedure).ToList();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }
        public int DeleteEmployees(int user_Id, int LogUser)
        {
            int result = 0;
            try
            {
                using (IDbConnection conn = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@EmpId", user_Id);
                    p.Add("@UserId", LogUser);
                    p.Add("@Result", "", DbType.Int32, ParameterDirection.Output, 1000);
                    conn.Query<int>(SP_AKRA_DeleteEmployees, p, commandType: CommandType.StoredProcedure);
                    result = p.Get<int>("@Result");
                    conn.Close();
                }
                result = 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}
