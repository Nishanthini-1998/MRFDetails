using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class UpdateDetailsDB
    {
        //declare connection string
        string cs = ConfigurationManager.ConnectionStrings["SqlConn"].ConnectionString;

        //Return All list 
        public List<MRFMODEL> ListAll()
        {
            List<MRFMODEL> objmrfmodel = new List<MRFMODEL>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select_mrfdetails", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    objmrfmodel.Add(new MRFMODEL
                    {
                        ID = Convert.ToInt32(rdr["ID"]),
                        PositionName = Convert.ToString(rdr["PositionName"]),
                        CreatedBy = Convert.ToString(rdr["CreatedBy"]),
                        CreatedDate = Convert.ToDateTime(rdr["CreatedDate"]),
                        Filledbefore = Convert.ToDateTime(rdr["Filledbefore"]),
                      //  VacancyforID = Convert.ToInt32(rdr["VacancyforID"]),
                        VacancytypeID = Convert.ToInt32(rdr["VacancytypeID"]),
                        Territory = Convert.ToString(rdr["Territory"]),
                        DivisionName = Convert.ToString(rdr["Division"]),
                        MinYear = Convert.ToInt32(rdr["MinYear"]),
                        MaxYear = Convert.ToInt32(rdr["MaxYear"]),
                        Minctc = Convert.ToInt32(rdr["Minctc"]),
                        Maxctc = Convert.ToInt32(rdr["Maxctc"]),
                        AdditionalRequirement = Convert.ToString(rdr["AdditionalRequirement"]),



                    });
                }
                return objmrfmodel;
            }
        }

    }
}