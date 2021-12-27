using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class MRFMODEL
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string PositionName { get; set; }
        public int CreatedByID { get; set; }
        public String CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime Filledbefore { get; set; }
        public string Vacancyfor { get; set; }
        public int VacancyforID { get; set; }
        public string Vacancytype { get; set; }
        public int VacancytypeID { get; set; }
        public string Territory { get; set; }
        public string DivisionName { get; set; }
        public int MinYear { get; set; }
        public int MaxYear { get; set; }
        public int Minctc { get; set; }
        public int Maxctc { get; set; }
        public string AdditionalRequirement { get; set; }
       
    }
}