using System;
using System.Collections.Generic;
using System.Configuration;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class UserDB
    {
            string cs = ConfigurationManager.ConnectionStrings["SqlConn"].ConnectionString;

            public int GetMyMRF(string UserID, string UserPassword)
            {
                try
                {
                    int i;
                    using (SqlConnection con = new SqlConnection(cs))
                    {
                        con.Open();
                        SqlCommand com = new SqlCommand("User", con);
                        com.CommandType = CommandType.StoredProcedure;

                        com.Parameters.AddWithValue("@UserID", UserID);
                        com.Parameters.AddWithValue("@UserPassword", UserPassword);
                        i = (Int32)com.ExecuteScalar();

                        return i;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }
    }

