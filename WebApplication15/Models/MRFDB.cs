using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class MRFDB
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
                            UserID = Convert.ToString(rdr["UserID"]),
                            ID = Convert.ToInt32(rdr["ID"]),
                            PositionName = Convert.ToString(rdr["PositionName"]),
                            CreatedBy = Convert.ToString(rdr["CreatedBy"]),
                            CreatedDate = Convert.ToDateTime(rdr["CreatedDate"]),
                            Filledbefore = Convert.ToDateTime(rdr["Filledbefore"]),
                            Vacancyfor = Convert.ToString(rdr["Vacancyfor"]),
                            Vacancytype = Convert.ToString(rdr["Vacancytype"]),
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


            //Method for Adding an MRFModel
            public int Add(MRFMODEL mrf)
            {
                try
                {
                    int i;
                    using (SqlConnection con = new SqlConnection(cs))
                    {
                        con.Open();
                        SqlCommand com = new SqlCommand("AddDetails", con);
                        com.CommandType = CommandType.StoredProcedure;

                        com.Parameters.AddWithValue("@PositionName", mrf.PositionName);
                        com.Parameters.AddWithValue("@UserID", mrf.CreatedBy);
                        com.Parameters.AddWithValue("@CreatedBy", mrf.CreatedBy);
                        com.Parameters.AddWithValue("@CreatedDate", mrf.CreatedDate);
                        com.Parameters.AddWithValue("@CreatedByID", mrf.CreatedByID);
                        com.Parameters.AddWithValue("@Filledbefore", mrf.Filledbefore);
                        com.Parameters.AddWithValue("@VacancyforID", mrf.VacancyforID);
                        com.Parameters.AddWithValue("@Vacancyfor", mrf.VacancyforID);
                        com.Parameters.AddWithValue("@VacancytypeID", mrf.VacancytypeID);
                        com.Parameters.AddWithValue("@Vacancytype", mrf.VacancytypeID);
                        com.Parameters.AddWithValue("@Territory", mrf.Territory);
                        com.Parameters.AddWithValue("@Division", mrf.DivisionName);
                        com.Parameters.AddWithValue("@MinYear", mrf.MinYear);
                        com.Parameters.AddWithValue("@MaxYear", mrf.MaxYear);
                        com.Parameters.AddWithValue("@Minctc", mrf.Minctc);
                        com.Parameters.AddWithValue("@Maxctc", mrf.Maxctc);
                        com.Parameters.AddWithValue("@AdditionalRequirements", mrf.AdditionalRequirement);

                        i = com.ExecuteNonQuery();
                    }
                    return i;
                }


                catch (Exception ex)
                {
                    throw ex;
                }
            }

           
            public int GetValidUser(string UserID, string UserPassword)
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




