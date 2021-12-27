using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class UserDetails
    {
        string cs = ConfigurationManager.ConnectionStrings["SqlConn"].ConnectionString;

        //Return All list 
        public List<UserDetailsModel> ListAll()
        {
            List<UserDetailsModel> objmrfmodel = new List<UserDetailsModel>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select_mrfdetails", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    objmrfmodel.Add(new UserDetailsModel

                   {
                        ID = Convert.ToInt32(rdr["ID"]),
                        UserID= Convert.ToString(rdr["UserID"]),
                        PositionName = Convert.ToString(rdr["PositionName"]),
                        Vacancyfor = Convert.ToString(rdr["Vacancyfor"]),
                        Territory = Convert.ToString(rdr["Territory"]),
                        

                    });
                }
                return objmrfmodel;
            }
        }
        
        public int Update(UserDetailsModel mrf)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("updatedetails", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ID", mrf.ID);
                com.Parameters.AddWithValue("@PositionName", mrf.PositionName);
                com.Parameters.AddWithValue("@UserID", mrf.CreatedBy);
                com.Parameters.AddWithValue("@CreatedBy", mrf.CreatedBy);
                com.Parameters.AddWithValue("@CreatedDate", mrf.CreatedDate);
                com.Parameters.AddWithValue("@CreatedByID", mrf.CreatedByID);
                com.Parameters.AddWithValue("@Filledbefore", mrf.Filledbefore);
                com.Parameters.AddWithValue("@VacancyforID", mrf.VacancyforID);
                com.Parameters.AddWithValue("@Vacancyfor", mrf.Vacancyfor);
                com.Parameters.AddWithValue("@VacancytypeID", mrf.VacancytypeID);
                com.Parameters.AddWithValue("@Vacancytype", mrf.VacancytypeID);
                com.Parameters.AddWithValue("@Territory", mrf.Territory);
                com.Parameters.AddWithValue("@Division", mrf.Division);
                com.Parameters.AddWithValue("@MinYear", mrf.MinYear);
                com.Parameters.AddWithValue("@MaxYear", mrf.MaxYear);
                com.Parameters.AddWithValue("@Minctc", mrf.Minctc);
                com.Parameters.AddWithValue("@Maxctc", mrf.Maxctc);
                com.Parameters.AddWithValue("@AdditionalRequirements", mrf.AdditionalRequirements);

                i = com.ExecuteNonQuery();
            }
            return i;
        }

       
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteDetails", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }


}