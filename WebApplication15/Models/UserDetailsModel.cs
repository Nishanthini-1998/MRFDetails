using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication15.Models
{
    public class UserDetailsModel
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string PositionName { get; set; }
        public string Territory { get; set; }
        public string Vacancyfor { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedByID { get; set; }
        public string VacancyforID { get; set; }
        public string Vacancytype { get; set; }
        public string VacancytypeID { get; set; }
        public string Filledbefore { get; set; }
        public string Division { get; set; }
        public string MinYear { get; set; }
        public string MaxYear { get; set; }
        public string Minctc { get; set; }
        public string Maxctc { get; set; }
        public string AdditionalRequirements { get; set; }
    }
}