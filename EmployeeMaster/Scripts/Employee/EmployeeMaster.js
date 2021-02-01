var mode = 0;
var emplst = '';
var lstincative = '';
var emp = {
    defaults: {
        Company_Id: "",
        User_Id: "",
        Division_Id: "",
    },
    init: function () {
        emp.fngetEmployeesInactive();
        emp.fngetEmployees();
        
    },

    fnsaveemp: function () {
        debugger;
        var flag = emp.fnvalidate();
        if (flag) {
            var obj = {
                Company_Id: emp.defaults.Company_Id,
                Employee_Name: $("#txtemp").val(),
                Employee_Code: $("#txtempno").val(),
                Region_Name: $("#txtregion").val(),
                Email_Id: $("#txtmail").val(),
                Password: $("#txtpwd").val(),
                User_Type_Id: $("#txtut_hidden").val(),
                Created_By: emp.defaults.User_Id,
                Employee_Id: $("#hdnempid").val()
            }
            if (mode == 0)
                CoreREST.requestInvoke("AKRA/V1/Employee", '', obj, "POST", emp.fnsaveempsuccesscallback, emp.fnfailurecallback, null);
            else
                CoreREST.requestInvoke("AKRA/V1/UpdateEmployee", '', obj, "POST", emp.fnsaveempsuccesscallback, emp.fnfailurecallback, null);
        }
    },
    fnsaveempsuccesscallback: function () {
        swal("", "Employee Saved successfully", "success");
        $(".swal-button--confirm").click(function () {
            $("#txtemp").val('');
            $("#txtempno").val('');
            $("#txtut").val('');
            $("#txtregion").val('');
            $("#txtmail").val('');
            $("#txtpwd").val('');
            emp.fngetEmployees();
            emp.fngetEmployeesInactive();
        });
    },

    fngetEmployees: function () {
        var p = emp.defaults.Company_Id;
        CoreREST.requestInvoke("AKRA/V1/GetEmployees", p, null, "GET", emp.fnbindemployeesuccesscallback, emp.fnfailurecallback, null);
    },
    fnbindemployeesuccesscallback: function (response) {
        $('#Grid').html("");
        emplst = response;

        var data = response;
        var grid = new ej.grids.Grid({
            dataSource: data,
            queryCellInfo: emp.queryCellInfo,
            allowExcelExport: true,
            showColumnChooser: true,
            allowCellMerging: true,
            allowScrolling: true,
            allowPaging: true,
            allowSorting: true,
            allowGrouping: true,
            allowFiltering: true,
            allowResizing: true,
            filterSettings: { type: 'Menu' },
            height: 400,
            toolbar: ['ColumnChooser', 'ExcelExport', 'Print', 'Search'],
            columns: [
                { headerText: 'Edit' },
               //  { headerText: 'Delete' },
                  { headerText: 'Change Status' },
                { field: 'Employee_Name', headerText: 'Employee Name' },
                { field: 'Employee_Code', headerText: 'Employee Number' },
                { field: 'User_Type_Name', headerText: 'Designation' },
                { field: 'Region_Name', headerText: 'Region Name' },
                { field: 'Email_Id', headerText: 'Email' },
            ],
            pageSettings: { pageCount: 10, pageSizes: true },
        });
        grid.appendTo('#Grid');
        grid.toolbarClick = function (args) {
            if (args.item.id === 'Grid_excelexport') {
                grid.excelExport();
            }

        };
    },
    queryCellInfo: function (args) {
        if (args.column.headerText == "Edit") {
            debugger;
            args.cell.style.cursor = "pointer";
            args.cell.style.color = "blue";
            args.cell.style.textDecoration = "underline";
            args.cell.innerHTML = "<a onclick='emp.fnEdit(" + args + ")'>Edit</a>"
            $(args.cell).bind("click", function () {
                debugger;
                emp.fnEdit(args);
            })
        }
        if (args.column.headerText == "Delete") {
            debugger;
            args.cell.style.cursor = "pointer";
            args.cell.style.color = "blue";
            args.cell.style.textDecoration = "underline";
            args.cell.innerHTML = "<a onclick='emp.fnDelete(" + args + ")'>Delete</a>"
            $(args.cell).bind("click", function () {
                debugger;
                emp.fnDelete(args);
            })
        }
        if (args.column.headerText == "Change Status") {
            debugger;
            args.cell.style.cursor = "pointer";
            args.cell.style.color = "blue";
            args.cell.style.textDecoration = "underline";
            args.cell.innerHTML = "<a onclick='emp.fnChangeStatus1(" + args + ")'>Change Status</a>"
            $(args.cell).bind("click", function () {
                debugger;
                emp.fnChangeStatus1(args);
            })
        }
    },
    fnChangeStatus1: function (resp) {
        mode = 2;
        debugger;
        swal("Are you sure. Do you want to change status?", {
            buttons: ["Yes", "No"]
        });
        $(".swal-button--cancel").click(function () {
            emp.fnChangeStatus(resp);
        });
    },
    fnChangeStatus: function (resp) {
        mode = 2;
        debugger;
        var p = emp.defaults.Company_Id + '/' + resp.data.Employee_Id + '/' + resp.data.Record_Status;
        CoreREST.requestInvoke("AKRA/V1/ChangeEmployeeStatus", p, null, "POST", emp.fnchangesuccesscallback, emp.fnfailurecallback, null);
    },
    fnchangesuccesscallback: function (response) {
        debugger;
        swal("", "Employee Status Changed Successfully", "success");
        $(".swal-button").click(function () {
            emp.fngetEmployeesInactive();
            emp.fngetEmployees();
        });
       
    },
    fngetEmployeesInactive: function () {
        var p = emp.defaults.Company_Id;
        CoreREST.requestInvoke("AKRA/V1/GetEmployeesInactive", p, null, "GET", emp.fnbindemployeeinactivesuccesscallback, emp.fnfailurecallback, null);
    },
    fnbindemployeeinactivesuccesscallback: function (response) {
        debugger;
        $('#Grid1').html("");
        lstincative = response;

        var data = response;
        var grid = new ej.grids.Grid({
            dataSource: data,
            queryCellInfo: emp.queryCellInfo,
            allowExcelExport: true,
            showColumnChooser: true,
            allowCellMerging: true,
            allowScrolling: true,
            allowPaging: true,
            allowSorting: true,
            allowGrouping: true,
            allowFiltering: true,
            allowResizing: true,
            filterSettings: { type: 'Menu' },
            height: 400,
            toolbar: ['ColumnChooser', 'ExcelExport', 'Print', 'Search'],
            columns: [
                { headerText: 'Change Status' },
                { field: 'Employee_Name', headerText: 'Employee Name' },
                { field: 'Employee_Code', headerText: 'Employee Number' },
                { field: 'User_Type_Name', headerText: 'Designation' },
                { field: 'Region_Name', headerText: 'Region Name' },
                { field: 'Email_Id', headerText: 'Email' },
            ],
            pageSettings: { pageCount: 10, pageSizes: true },
        });
        grid.appendTo('#Grid1');
        grid.toolbarClick = function (args) {
            if (args.item.id === 'Grid_excelexport') {
                grid.excelExport();
            }

        };
    },
    fnEdit: function (resp) {
        $("#txtemp").val(resp.data.Employee_Name);
        $("#txtempno").val(resp.data.Employee_Code);
        $("#txtregion").val(resp.data.Region_Name);
        $("#txtmail").val(resp.data.Email_Id);
        $("#txtpwd").val(resp.data.Password);
        $("#txtut").val(resp.data.User_Type_Name);
        $("#hdnempid").val(resp.data.Employee_Id);
        mode = 1;
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    },
    fnDelete: function (resp) {
        swal({
            title: "",
            text: "Are you sure, do you want to delete the employee " + resp.data.Employee_Name,
            icon: "warning",
            button: "Proceed",
        }).then(() => {
            var p = resp.data.Employee_Id + '/' + emp.defaults.User_Id;
            CoreREST.requestInvoke("AKRA/V1/DeleteEmployees", p, null, "POST", emp.fnsuccesscallback, emp.fnfailurecallback, null);
        });
    },
    fnsuccesscallback: function (response) {
        if (response == 1) {
            swal("", "Selected Employee has been deleted", "info");
            emp.fngetEmployees();
        }
        else {
            swal("", "Selected Employee has one or more reportees. Kindly map the reportees to other user and try deleting");
            return false;
        }
    },
   
   
    fnvalidate: function () {
        debugger;
        var email = emp.validateEmail($("#txtmail").val());
        
        var disjson = $.grep(emplst, function (e, v) {
            return e.Employee_Code == $("#txtempno").val() && e.Employee_Id != $("#hdnempid").val();
        });

        var disjsonmail = $.grep(emplst, function (e, v) {
            return e.Email_Id == $("#txtmail").val() && e.Employee_Id != $("#hdnempid").val()
        });

        var disemp = $.grep(emplst, function (e, v) {
            return e.Email_Id == $("#txtmail").val() && e.Employee_Code == $("#txtempno").val() && e.Employee_Id != $("#hdnempid").val();
        });

        if (disjson.length > 0) {
            swal("", "Employee Number already exists", "info");
            return false;
        }

        if (disjsonmail.length > 0) {
            swal("", "Email already exists", "info");
            return false;
        }

        if (disemp.length > 0) {
            swal("", "Employee already exists", "info");
            return false;
        }

        if ($("#txtemp").val() == "") {
            swal("", "Please enter Employee Name", "info");
            return false;
        }
        else if ($("#txtempno").val() == "") {
            swal("", "Please enter Employee Number", "info");
            return false;
        }
        else if ($("#txtregion").val() == "") {
            swal("", "Please enter Region Name", "info");
            return false;
        }
        else if ($("#txtmail").val() == "") {
            swal("", "Please enter Email", "info");
            return false;
        }
        else if ($("#txtpwd").val() == "") {
            swal("", "Please enter Password", "info");
            return false;
        }
        else if ($("#txtut_hidden").val() == "") {
            swal("", "Please choose Designation", "info");
            return false;
        }
        else if (!(email)) {
            swal("", "Please enter valid email address", "info");
            return false;
        }
        else {
            return true;
        }
    },

    validateEmail: function ($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    },

    fncancel: function () {
        mode = 0;
        $("#hdnempid").val("");
    },

    fnfailurecallback: function () {
        swal("", "Please try after sometime", "info");
        return false;
    }
}