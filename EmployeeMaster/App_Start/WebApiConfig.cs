using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace EmployeeMaster
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
             name: "Employee",
             routeTemplate: "Emp/V1/Employee",
             defaults: new { controller = "EmployeeAPI", action = "Employee" }
           );
            config.Routes.MapHttpRoute(
              name: "GetEmployees",
              routeTemplate: "Emp/V1/GetEmployees/{Company_Id}",
              defaults: new { controller = "EmployeeAPI", action = "GetEmployees" }
            );
            config.Routes.MapHttpRoute(
             name: " GetEmployeesInactive",
             routeTemplate: "Emp/V1/GetEmployeesInactive/{Company_Id}",
             defaults: new { controller = "EmployeeAPI", action = "GetEmployeesInactive" }
           );
            config.Routes.MapHttpRoute(
             name: "GetUserWithEmp",
             routeTemplate: "Emp/V1/GetUserWithEmp/{Company_Id}/{User_Access_Type_Id}",
             defaults: new { controller = "EmployeeAPI", action = "GetUserWithEmp" }
           );
            config.Routes.MapHttpRoute(
              name: "UpdateEmployee",
              routeTemplate: "Emp/V1/UpdateEmployee",
              defaults: new { controller = "EmployeeAPI", action = "UpdateEmployee" }
            );
            config.Routes.MapHttpRoute(
                name: "DeleteEmployees",
                routeTemplate: "Emp/V1/DeleteEmployees/{User_Id}/{LogUser}",
                defaults: new { controller = "EmployeeAPI", action = "DeleteEmployees" }
            );
        }
    }
}
