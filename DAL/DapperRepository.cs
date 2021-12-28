#region Usings
using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Text;
using System.Collections.Generic;
using Dapper;
using System.Net.Http;
using System.Web.Http;
using EmployeeMaster;
#endregion Usings

namespace EmployeeMaster

{
    public class DapperRepository
    {
        #region Private Variables
        const string GLOBALCONFIG = "GlobalConfig";
        const string Kangle_Connection = "Kangle_Connection";
        const string HRMS_Connection = "HRMSConfig";
        #endregion Private Variables

        SqlConnection _conn;


        // HRMS Databse get connection string

        private string GetHRMSConnectionString()
        {
            return ConfigurationManager.AppSettings[HRMS_Connection];
            // return ConfigurationManager.AppSettings[Kangle_Connection];
        }
        protected IDbConnection IHRMSDbOpenConnection()
        {
            string connStr = GetHRMSConnectionString();
            IDbConnection connection = new SqlConnection(connStr);
            connection.Open();
            return connection;
        }
        protected SqlConnection IHRMSDbOpenConnectionForBulkCopy()
        {
            string connStr = GetHRMSConnectionString();
            SqlConnection connection = new SqlConnection(connStr);
            connection.Open();
            return connection;
        }

        //END HRMS Databse get connection string
        private string GetGlobalConnectionString()
        {
            return ConfigurationManager.AppSettings[GLOBALCONFIG];
            // return ConfigurationManager.AppSettings[Kangle_Connection];
        }

        protected IDbConnection IDbOpenConnection(string companyCode)
        {
            string connStr = GetCompanyConnectionString(companyCode);
            IDbConnection connection = new SqlConnection(connStr);
            connection.Open();
            return connection;
        }

        protected IDbConnection IGDbOpenConnection()
        {
            string connStr = GetGlobalConnectionString();
            IDbConnection connection = new SqlConnection(connStr);
            connection.Open();
            return connection;
        }
        public SqlConnection GetConnectionObjectForSqlBulCopy()
        {
            string strConnString;
            try
            {
                strConnString = GetHRMSConnectionString().ToString();

                _conn = new SqlConnection();
                _conn.ConnectionString = strConnString;
                return _conn;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #region Private Methaods

        // Retrive the Connection string based on Company Code.
        private IEnumerable<ConnectionString> GetConnectionString(string companyCode)
        {
            const string SPHDGETCONNECTIONSTRING = "sp_hdOfflineGetCompanyConnection";
            IEnumerable<ConnectionString> iConnectionModel = null;

            using (IDbConnection connection = IGDbOpenConnection())
            {
                var parameter = new DynamicParameters();
                parameter.Add("@CompanyCode", companyCode, dbType: DbType.String, direction: ParameterDirection.Input);
                iConnectionModel = connection.Query<ConnectionString>(SPHDGETCONNECTIONSTRING, parameter, commandType: CommandType.StoredProcedure);
                connection.Close();
            }
            return iConnectionModel;
        }

        public IEnumerable<CompanyModel> GetConnectionStringFromSubDomain(string subDomainName)
        {
            try
            {
                IEnumerable<CompanyModel> lst;
                using (IDbConnection connection = IHRMSDbOpenConnection())
                {
                    var p = new DynamicParameters();
                    p.Add("@Company_Name", subDomainName);
                    lst = connection.Query<CompanyModel>("SP_AKRA_GetConnectionString", p, commandType: CommandType.StoredProcedure);
                    connection.Close();
                }                
                return lst;
            }
            finally
            {

            }
        }
        private string SetConnectionString(IEnumerable<ConnectionString> iConnectionModel)
        {
            StringBuilder connectionBuilder = new StringBuilder();
            foreach (ConnectionString objConnectionModel in iConnectionModel)
            {
                connectionBuilder.Append("data source=" + objConnectionModel.SqlIPAddress.ToString().Trim());
                connectionBuilder.Append(";Initial Catalog=" + objConnectionModel.DatabaseName.ToString().Trim());
                connectionBuilder.Append(";User Id=" + objConnectionModel.SqlLoginId.ToString().Trim());
                connectionBuilder.Append(";Password=" + objConnectionModel.SqlPassword.ToString().Trim());
            }

            return connectionBuilder.ToString();
        }

        private string GetCompanyConnectionString(string companyCode)
        {
            IEnumerable<ConnectionString> connectionString = GetConnectionString(companyCode);
            return SetConnectionString(connectionString);
        }

        #endregion Private Methods

        public void AddParamToSqlCommand(SqlCommand cmd, string paramName, ParameterDirection paramDirection, SqlDbType dbType, int size, object paramValue)
        {
            try
            {
                SqlParameter parameter = new SqlParameter();
                parameter.ParameterName = paramName;
                parameter.Direction = paramDirection;
                parameter.SqlDbType = dbType;
                parameter.Value = paramValue;
                parameter.Size = size;
                cmd.Parameters.Add(parameter);
            }
            catch (Exception)
            {
                // ErrorLog.LogError(ex, "AddParamToSqlCommand()");
                // bool blError = insertLogTable(HttpContext.Current.Session["Comp_Code"].ToString(), HttpContext.Current.Session["Depot_Code"].ToString(), "QueryBuilder", "AddParamToSqlCommand()", "", ex, "Application");
            }
        }

        public void AddParamToSqlCommandWithTypeName(SqlCommand cmd, string paramName, ParameterDirection paramDirection, SqlDbType dbType, object paramValue, string typeName)
        {
            try
            {
                SqlParameter parameter = new SqlParameter();
                parameter.ParameterName = paramName;
                parameter.Direction = paramDirection;
                parameter.SqlDbType = dbType;
                parameter.Value = paramValue;
                parameter.TypeName = typeName;
                cmd.Parameters.Add(parameter);
            }
            catch (Exception)
            {
                // ErrorLog.LogError(ex, "AddParamToSqlCommand()");
                // bool blError = insertLogTable(HttpContext.Current.Session["Comp_Code"].ToString(), HttpContext.Current.Session["Depot_Code"].ToString(), "QueryBuilder", "AddParamToSqlCommand()", "", ex, "Application");
            }
        }




        public void ExecuteNonQuery(SqlCommand sqlCmd, string companyCode)
        {
            try
            {
                _conn = new SqlConnection();
                _conn.ConnectionString = GetCompanyConnectionString(companyCode);
                _conn.Open();
                sqlCmd.Connection = _conn;
                sqlCmd.ExecuteNonQuery();

            }
            finally
            {
                _conn.Close();
            }
        }
        public void ExecuteNonQueryHRMS(SqlCommand sqlCmd, string companyCode)
        {
            try
            {
                _conn = new SqlConnection();
                _conn.ConnectionString = GetHRMSConnectionString();
                _conn.Open();
                sqlCmd.Connection = _conn;
                sqlCmd.ExecuteNonQuery();

            }
            finally
            {
                _conn.Close();
            }
        }



        //Returns Dataset for the resultant SQL string

        public DataSet ExecuteDataSet(String strSQL)
        {
            SqlCommand sqlCmd = null;
            try
            {
                //  SqlCommand sqlCmd;
                SqlDataAdapter sqlDAP;
                DataSet ds;

                sqlCmd = new SqlCommand();
                sqlCmd.Connection = _conn;
                sqlCmd.CommandTimeout = 400;
                sqlCmd.CommandText = strSQL;

                ds = new DataSet();
                sqlDAP = new SqlDataAdapter(sqlCmd);

                sqlDAP.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (sqlCmd.Connection.State == ConnectionState.Open)
                    sqlCmd.Connection.Close();
            }
        }
        //Returns Dataset for the resultant SQL Command
        public DataSet ExecuteDataSet(SqlCommand sqlCmd)
        {
            SqlDataAdapter sqlDAP;
            DataSet ds;

            sqlCmd.Connection = new SqlConnection(GetGlobalConnectionString());

            ds = new DataSet();
            sqlDAP = new SqlDataAdapter(sqlCmd);
            sqlDAP.Fill(ds);
            return ds;
        }

        //Returns Dataset for the resultant SQL Command
        public DataSet ExecuteDataSet(SqlCommand sqlCmd, string companyCode)
        {
            SqlDataAdapter sqlDAP;
            DataSet ds;
            _conn = new SqlConnection();
            _conn.ConnectionString = GetCompanyConnectionString(companyCode);
            _conn.Open();
            sqlCmd.Connection = _conn;

            ds = new DataSet();
            sqlDAP = new SqlDataAdapter(sqlCmd);
            sqlDAP.Fill(ds);
            return ds;
        }

        public TypeCode GetOutPutParameterType(object value, TypeCode checkingType)
        {

            if (value != null)
            {
                if (checkingType == TypeCode.Int32)
                {
                    int IntResult = -1;
                    if (Int32.TryParse(value.ToString(), out IntResult))
                    {
                        return TypeCode.Int32;
                    }
                }
                if (checkingType == TypeCode.Int64)
                {
                    long longResult = -1;
                    if (Int64.TryParse(value.ToString(), out longResult))
                    {
                        return TypeCode.Int64;
                    }
                }
            }
            return TypeCode.String;
        }

    }

    public class ConnectionString
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string SubDomain { get; set; }
        public string SqlIPAddress { get; set; }
        public string SqlLoginId { get; set; }
        public string SqlPassword { get; set; }
        public string DatabaseName { get; set; }
        public string GeoLocationSupport { get; set; }
        public string CompanyCode { get; set; }
        public string CommonPassword { get; set; }
    }

    public class CompanyModel
    {
        public int Company_Id { get; set; }
        public string Company_Code { get; set; }
        public string Company_Name { get; set; }
    }
}


