﻿var excelReportMenu = "";
var adHocReportMenu = "";
function fnBindNewReportMenu(userTypeCode) {
    debugger;
    var parameters = [];
    var userTypeCode = {};
    userTypeCode.name = "userTypeCode";
    userTypeCode.value = userTypeCode;

    parameters.push(userTypeCode);

    HDAjax.requestInvoke("Login", "GetReportMenu", null, "GET", fnMenuSuccessCallBack, failureCallback);
}

function fnBindExcelApiMenu(userTypeCode) {
    debugger;
    var parameters = [];
    var userTypeCode = {};
    userTypeCode.name = "userTypeCode";
    userTypeCode.value = userTypeCode;

    parameters.push(userTypeCode);

    HDAjax.requestInvoke("Login", "GetExcelReportMenu", null, "GET", fnExcelMenuSuccessCallBack, fnExcelfailureCallback);
}

function fnExcelMenuSuccessCallBack(response) {
    debugger;
    var jsMenu = eval('(' + response + ')');
    excelReportMenu = jsMenu;
    if (!(jsMenu.Tables === undefined) && jsMenu.Tables.length > 0 && jsMenu.Tables[0].Rows.length > 0) {
        var subMenu = "", detailMenu = "";

        // For Side Menu
        // detailMenu += "<li id='ActivityReports' class='levelOnexlapi' style='width: 185px;text-align: center;font-size:12px'><a href='#'>Activity</a></li>";
        // subMenu = "<ul>";
        //subMenu += "<li class='levelOnexlapi' style='width:185px;text-align:left;font-size:12px;'><a href='#' style='text-align:center;'><span class='fa fa-angle-up' aria-hidden='true' onclick='fnToggleCategory()'></span></a></li>";
        for (var i = 0; i < jsMenu.Tables[0].Rows.length; i++) {
            //subMenu += "<li onclick='fnFocusDescriptionDiv(" + i + ")'><div class='parentMenu'>" + jsMenu.Tables[0].Rows[i].API_Category_Name + "</div>";
            subMenu += "<li id='" + jsMenu.Tables[0].Rows[i].API_Category_Code + "' class='levelOnexlapi' style='width: 185px;text-align: left;font-size:12px'><a href='#'>" + jsMenu.Tables[0].Rows[i].API_Category_Name + "</a></li>";

            //var childCount = "";
            //childCount = $.grep(jsMenu, function (v) {
            //    return v.API_Category_Code == jsMenu.Tables[0].Rows[i].API_Category_Code
            //});

            ////var childCount = jsonPath(jsMenu, "$.Tables[1].Rows[?(@.API_Category_Code=='" + jsMenu.Tables[0].Rows[i].API_Category_Code + "')]");
            //if (childCount != false && childCount !== undefined) {
            //   // subMenu += "<div class='childCnt' >" + childCount.length + "</div><div style='clear:both;'></div></li>";
            //}
            //else {
            //  //  subMenu += "<div class='childCnt' >0</div><div style='clear:both;'></div></li>";
            //}
        }
        //subMenu += "<li class='levelOnexlapi' style='width:185px;text-align:left;font-size:12px;'><a href='#' style='text-align:center;'><span class='fa fa-angle-down' aria-hidden='true' onclick='fnToggleCategory()'></span></a></li>";
        //subMenu += "</ul>";

        $("#hdExcelrptmnulist").html(subMenu);


        // for description
        var alterRow = "";
        var method = "";
        var limethod = "";
        var detailMenu = "";
        for (var j = 0; j < jsMenu.Tables[0].Rows.length; j++) {

            var childMenu = "";
            childMenu = $.grep(jsMenu.Tables[1].Rows, function (v) {
                return v.API_Category_Code == jsMenu.Tables[0].Rows[j].API_Category_Code
            });

            console.log(childMenu)
            //var childMenu = jsonPath(jsMenu, "$.Tables[1].Rows[?(@.API_Category_Code=='" + jsMenu.Tables[0].Rows[j].API_Category_Code + "')]");

            if (childMenu != false && childMenu !== undefined && childMenu.length > 0) {

                for (var l = 0; l < childMenu.length; l++) {
                    if (l % 2 == 0) {
                        alterRow = "class='liLeft'";
                    }
                    else {
                        alterRow = "class='liRight'";
                    }
                    var liThis = $('<div>' + childMenu[l].Menu_Text + '</div>');
                    //Dash
                    detailMenu += "<li class=''  onclick = 'fnGetExcelApi(\"" + childMenu[l].API_Id + "\",\"" + childMenu[l].ServiceId + "\",\"" + childMenu[l].ServiceName + "\");'><a href='#' style='text-align:left !important'>" + childMenu[l].ServiceName + "</a></li>";
                }
            }
            // $("#hdExcelrptmnulist").append(detailMenu);

            // setting width
            $("#dvSideMenu").height($("#dvDesc").height())
        }

        $('.levelOnexlapi').mouseenter(function () {
            var id = this.id;
            fnBindLevelOnexlSubMenus(id);
        });

    }
    $('.ExcelApireport_click').unbind("click").bind("click", function () {
        debugger;
        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnNavigatExcelAPI(reportName);
    });

    //$('.excelReportClick').unbind("click").bind("click", function () {
    //    debugger;
    //    var reportName = $(this).attr('id');
    //    reportName = reportName.replace(/\s/g, '');
    //    fnShowUI(reportName);
    //});

}

function fnToggleCategory() { }
function fnAdHOCReports() {
    HDAjax.requestInvoke("Login", "GetAdHocReportMenu", null, "GET", fnAdHocReportMenuSuccessCallBack, fnAdHocReportfailureCallback);
}
function fnAdHocReportMenuSuccessCallBack(response) {
    debugger;
    var jsMenu = eval('(' + response + ')');
    adHocReportMenu = jsMenu;
    if (!(jsMenu.Tables === undefined) && jsMenu.Tables.length > 0 && jsMenu.Tables[0].Rows.length > 0) {
        var subMenu = "", detailMenu = "";
        for (var i = 0; i < jsMenu.Tables[0].Rows.length; i++) {

            subMenu += "<li id='A" + jsMenu.Tables[0].Rows[i].API_Category_Code + "' class='levelOneAdHocapi' style='width: 185px;text-align: left;font-size:12px'><a href='#'>" + jsMenu.Tables[0].Rows[i].API_Category_Name + "</a></li>";

        }

        $("#hdAdHocRptmnulist").html(subMenu);

        $('.levelOneAdHocapi').mouseenter(function () {
            var id = this.id;
            fnBindLevelOneAdHocSubMenus(id);
        });

    }
}
function fnAdHocReportfailureCallback() {
    // fnBootBoxAlert();
}
function fnBindSettings() {
    var settingMenulist = "";
    debugger;
    settingMenulist += "<li style='width: 190px;text-align: center;font-size:12px'><a href='#' id='ColorCodes' class='setting_Click' style='text-align:left !important'>Configuration</a></li>";
    settingMenulist += "<li style='width: 190px;text-align: center;font-size:12px'><a href='#' id='ExcelAPIConfiquration'  class='setting_Click' style='text-align:left !important'>Excel API Configuration</a></li>";
    settingMenulist += "<li style='width: 190px;text-align: center;font-size:12px'><a href='#' id='MenuConfiguration'  class='setting_Click' style='text-align:left !important'>Transaction Report Configuration</a></li>";
    settingMenulist += "<li style='width: 190px;text-align: center;font-size:12px'><a href='#' id='syncfusion'  class='syncfusion_Click' style='text-align:left !important'>Syncfusion Dashboard</a></li>";
    settingMenulist += "<li style='width: 190px;text-align: center;font-size:12px;display:inline-block;'><a href='#' id='DashboardConfiguration' style='text-align:left !important'>Dashboard Configuration<span class='badge badge-dark' style='padding:4px;margin-left:4px;'>New</span></a></li>";

    $("#hdSettingsmnulist").append(settingMenulist);
    //var html = '<li><a href="#" style="font-size: 15px;" id="ColorCodes"  class="setting_Click">Settings</a></li>';
    //$('#ulMain').append(html);

    $('.setting_Click').unbind("click").bind("click", function () {
        debugger;
        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateSettings(reportName);
    });
    $('#DashboardConfiguration').on('click', function (e) {
        debugger;
        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateSettings(reportName);
    });
    $(".syncfusion_Click").click(function () {
        HDAjax.requestInvoke("DashBoardV2", "GetPrivilegeForCurrentUserType", null, "GET", fnSyncfusionMenuSuccessCallBack, fnSyncfusionMenufailureCallback);      
    });
}
function fnSyncfusionMenuSuccessCallBack(response) {
    debugger;
    if (response != null && response.length > 0) {
        var mName = "";
        if (response[0].Privilege_Code == "PRC000000") {
            mName = 'DashBoard/AdminDashboardSyn';
        }
        if (response[0].Privilege_Code == "PRC000001") {
            mName = 'DashboardV2/SalesDashboardSyn';
        }
        if (response[0].Privilege_Code == "PRC000002") {
            mName = 'DashboardV2/DashboardComplianceSyn';
        }
        if (response[0].Privilege_Code == "PRC000003") {
            mName = 'DashboardV2/MiscSynfussion';
        }
        if (response[0].Privilege_Code == "PRC000005") {
            mName = 'DashBoard/DashboardEDetailing';
        }
        var popup = window.open('../../' + mName,
           'height=1024,width=768,toolbar=0,directories=0,status=0,location=0,addressbar=0,titlebar=0');
        setTimeout(function () {
            if (!popup || popup.outerHeight === 0) {
                alert("Popup Blocker is enabled! ");
            } else {
                //Popup Blocker Is Disabled
                //window.open('','_self');
                //window.close();
            }
        }, 25);
    }
    else {
        var popup = window.open('../../DashBoard/AdminDashboardSyn',
          'height=1024,width=768,toolbar=0,directories=0,status=0,location=0,addressbar=0,titlebar=0');
        setTimeout(function () {
            if (!popup || popup.outerHeight === 0) {
                alert("Popup Blocker is enabled! ");
            } else {
                //Popup Blocker Is Disabled
                //window.open('','_self');
                //window.close();
            }
        }, 25);
    }
}
function fnSyncfusionMenufailureCallback() {

}
function fnBindLevelOnexlSubMenus(id) {
    var childMenuObj = "";
    childMenuObj = $.grep(excelReportMenu.Tables[1].Rows, function (v) {
        return v.API_Category_Code == id
    });
    console.log(childMenuObj)
    var menu = "";
    $('#ul' + id).remove();
    menu += "<ul id='ul" + id + "'>";
    $('#' + id).append(menu);
    var ch = 0;
    var menu1 = "";
    for (ch = 0; ch < childMenuObj.length; ch++) {
        menu1 += "<li class='ExcelApireport_click' onclick = 'fnGetExcelApi(\"" + childMenuObj[ch].API_Id + "\",\"" + childMenuObj[ch].ServiceId + "\",\"" + childMenuObj[ch].ServiceName + "\",\"" + childMenuObj[ch].Is_Syncfusion + "\",\"" + childMenuObj[ch].Is_Pivotable + "\");');'><a href='#' style='font-size:12px;text-align:left !important'>" + childMenuObj[ch].ServiceName + "</a> </li>";
    }

    menu1 += "</ul>";
    //if (subMenuName == "SalesReports") {
    //    var menu1 = "";
    //    menu1 += "<li><a href='#'  id='PrimaryProgression' class='report_MonthlyReportclick' style='font-size:12px'>Sales Progression</a></li>";
    //    menu1 += "<li><a href='#'  id='SecondaryProgression' class='report_MonthlyReportclick' style='font-size:12px'>SecondaryProgression</a></li>";
    //    menu1 += "<li><a href='#'  id='SecondarySales' class='report_SQLclick' style='font-size:12px'>Secondary Sales</a></li>";
    //    menu1 += "</ul>";
    //}
    //else if (subMenuName == "ActivityReports") {
    //    var menu1 = "";
    //    menu1 += "<li><a href='#'  id='TPVsActualReport' class='report_MonthlyReportclick' style='font-size:12px' >Planned Vs Actual Summary</a></li>";
    //    menu1 += "<li><a href='#' id='DCRAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px'>Activity Summary</a></li>";
    //    menu1 += "<li><a href='#' id='NewMonthlyVisitAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px' >Monthly Visit Analysis Report</a></li>";
    //    menu1 += "<li><a href='#' id='SelfAndTeamWorkAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px' >Self And Team Work Analysis Report</a></li>";
    //}

    $("#ul" + id).html('');
    $("#ul" + id).append(menu1);

}

function fnBindLevelOneAdHocSubMenus(id) {
    var childMenuObj = "";
    childMenuObj = $.grep(adHocReportMenu.Tables[1].Rows, function (v) {
        return v.API_Category_Code == id.substring(1, id.length);
    });
    console.log(childMenuObj)
    $("#hdAdHocRptmnulist #1 a")
    var menu = "";
    $('#hdAdHocRptmnulist #ul' + id).remove();
    menu += "<ul id='ul" + id + "'>";
    $('#hdAdHocRptmnulist #' + id).append(menu);
    var ch = 0;
    var menu1 = "";
    for (ch = 0; ch < childMenuObj.length; ch++) {
        //onclick = 'fnGetExcelApi(\"" + childMenuObj[ch].API_ID + "\",\"" + childMenuObj[ch].ServiceId + "\",\"" + childMenuObj[ch].ServiceName + "\");';
        menu1 += "<li class='ExcelApireport_click' onclick='fnGetExcelApi(\"" + childMenuObj[ch].API_Id + "\",\"" + childMenuObj[ch].ServiceId + "\",\"" + childMenuObj[ch].ServiceName + "\",\"" + childMenuObj[ch].Is_Syncfusion + "\",\"" + childMenuObj[ch].Is_Pivotable + "\");');'><a href='#' style='font-size:12px;text-align:left !important'>" + childMenuObj[ch].ServiceName + "</a> </li>";
    }
    menu1 += "</ul>";

    $("#hdAdHocRptmnulist #ul" + id).html('');
    $("#hdAdHocRptmnulist #ul" + id).append(menu1);

}
function fnExcelfailureCallback(response) {
    ////alert('error');
    fnBootBoxAlert();
}

function fnMenuSuccessCallBack(response) {
    debugger;

    var jsMenu = response;
    var detailMenu = "";

    detailMenu += "<li id='SalesReports' class='levelOne' style='width: 185px;text-align: center;font-size:12px'><a href='#' style='text-align:left !important'>Sales</a></li>";
    detailMenu += "<li id='ActivityReports' class='levelOne' style='width: 185px;text-align: center;font-size:12px'><a href='#' style='text-align:left !important'>Activity</a></li>";
    detailMenu += "<li id='Master' class='levelOne' style='width: 185px;text-align: center;font-size:12px'><a href='#' style='text-align:left !important'>Master</a></li>";
    $("#hdrptmnulist").append(detailMenu);

    $('.levelOne').mouseenter(function () {
        var id = this.id;
        fnBindLevelOneSubMenus(id);
    });



    //if (response.length > 0) {
    //    var subMenu = "", detailMenu = "";
    //    var jsonParentStr = '[{"Menu_Text":"Administration","Menu_ID":"M"},{"Menu_Text":"Compliance","Menu_ID":"C"},{"Menu_Text":"Field Analysis","Menu_ID":"A"},{"Menu_Text":"Marketing Analysis","Menu_ID":"R"}]';
    //    var jsonParent = eval(jsonParentStr);

    //    // For Side Menu
    //    subMenu = "<ul>";
    //    var childCount = "";

    //    subMenu += "</ul>";

    //    //  $("#dvSideMenuContent").html(subMenu);

    //    // for description
    //    var alterRow = "";
    //    var method = "";
    //    var limethod = "";
    //    var childMenu = "";
    //    var lastSubmittedReport = [];
    //    var comprehensiveAnalysisReport = [];
    //    var doctorChemistMet = [];

    //    detailMenu += "<li id='SalesReports' class='levelOne' style='width: 185px;text-align: center;font-size:12px'><a href='#' style='text-align:left !important'>Sales</a></li>";
    //    detailMenu += "<li id='ActivityReports' class='levelOne' style='width: 185px;text-align: center;font-size:12px'><a href='#' style='text-align:left !important'>Activity</a></li>";



    //    $("#hdrptmnulist").append(detailMenu);

    //    $('.report_click').unbind("click").bind("click", function () {
    //        var reportName = $(this).attr('id');
    //        reportName = reportName.replace(/\s/g, '');
    //        fnnavigateReport(reportName);
    //    });

    //    $('.report_SQLclick').unbind("click").bind("click", function () {

    //        var reportName = $(this).attr('id');
    //        reportName = reportName.replace(/\s/g, '');
    //        fnBindSubMenus(reportName);
    //    });

    //    $('.report_MonthlyReportclick').unbind("click").bind("click", function () {
    //        debugger;
    //        var reportName = $(this).attr('id');
    //        reportName = reportName.replace(/\s/g, '');
    //        fnnavigateWallaceReport(reportName);
    //    });

    //    $('.ExcelApireport_click').unbind("click").bind("click", function () {
    //        debugger;
    //        var reportName = $(this).attr('id');
    //        reportName = reportName.replace(/\s/g, '');
    //        fnGetExcelApi(reportName);
    //    });

    //    $('.levelOne').mouseenter(function () {
    //        var id = this.id;
    //        fnBindLevelOneSubMenus(id);
    //    });

    //}
}

function fnBindLevelOneSubMenus(subMenuName) {

    var menu = "";
    $('#ul' + subMenuName).remove();
    menu += "<ul id='ul" + subMenuName + "'>";
    $('#' + subMenuName).append(menu);
    if (subMenuName == "SalesReports") {
        var menu1 = "";
        menu1 += "<li><a href='#'  id='RegionSalesAnalysis' class='report_SQLclick' style='font-size:12px;text-align:left !important'>Sales Progression (Region)</a></li>";
        menu1 += "<li><a href='#'  id='PrimaryProgression' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important'>Sales Progression (Product)</a></li>";
        //menu1 += "<li><a href='#'  id='SecondaryProgression' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important'>SecondaryProgression</a></li>";
        menu1 += "<li><a href='#'  id='SecondarySales' class='report_SQLclick' style='font-size:12px;text-align:left !important'>Secondary Sales</a></li>";

        menu1 += "</ul>";
    }
    else if (subMenuName == "ActivityReports") {
        var menu1 = "";
        menu1 += "<li><a href='#'  id='TPVsActualReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important' >Planned Vs Actual Summary</a></li>";
        menu1 += "<li><a href='#' id='DCRAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important'>Activity Summary <span class='badge badge-dark' style='padding:4px;margin-left:4px;'>Updated</span></a></li>";
        menu1 += "<li><a href='#' id='NewMonthlyVisitAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important' >Monthly Visit Analysis Report</a></li>";
        //    menu1 += "<li><a href='#' id='NewDocotorMasterCompositionReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important' >Doctor Master Composition Report</a></li>";
        menu1 += "<li><a href='#' id='SelfAndTeamWorkAnalysisReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important' >Self And Team Work Analysis Report</a></li>";
    }
    else if (subMenuName == "Master") {
        var menu1 = "";
        menu1 += "<li><a href='#' id='NewDocotorMasterCompositionReport' class='report_MonthlyReportclick' style='font-size:12px;text-align:left !important' >Doctor Master Composition Report</a></li>";
        //menu1 += "<li><a href='#'  id='ExpenseAnalysisGroupWiseReport' class='report_NGReportclick' style='font-size:12px;text-align:left !important' >Expense Analysis Group Wise Report</a></li>";
        //menu1 += "<li><a href='#'  id='SFCReport' class='report_SQLclick' style='font-size:12px;text-align:left !important' >SFC Report</a></li>";
    }

    $("#ul" + subMenuName).html('');
    $("#ul" + subMenuName).append(menu1);
    $('.report_MonthlyReportclick').unbind("click").bind("click", function () {

        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateWallaceReport(reportName);
    });
    $('.report_click').unbind("click").bind("click", function () {
        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateReport(reportName);
    });
    $('.report_SQLclick').unbind("click").bind("click", function () {

        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateSQLReport(reportName);
    });
    $('.report_NGReportclick').unbind("click").bind("click", function () {

        var reportName = $(this).attr('id');
        reportName = reportName.replace(/\s/g, '');
        fnnavigateReport(reportName);
    });

}

function fnBindLevelTwoSubMenus(parentName) {
    //alert('S');
    fnBootBoxAlert();
}

function fnNavigatExcelAPI(reportName) {
    var param = {};
    param.name = "reportName";
    param.value = reportName;
    var params = [];
    params.push(param);
    HDAjax.requestInvoke("ExcelApi", "GetAPIUI", params, "POST", fnUserPerDayReport, failureCallback);
}

function fnnavigateSQLReport(reportName) {
    var param = {};
    param.name = "reportName";
    param.value = reportName;
    var params = [];
    params.push(param);
    HDAjax.requestInvoke("SQLReports", "ReportNavigation", params, "POST", fnUserPerDayReport, failureCallback);
}

function fnnavigateWallaceReport(reportName) {
    var param = {};
    param.name = "reportName";
    param.value = reportName;
    var params = [];
    params.push(param);
    HDAjax.requestInvoke("MonthlyReports", "ReportNavigation", params, "POST", fnUserPerDayReport, failureCallback);
}

function fnnavigateSettings(reportName) {
    var param = {};
    param.name = "ScreenName";
    param.value = reportName;
    var params = [];
    params.push(param);
    HDAjax.requestInvoke("Settings", "ScreenNavigation", params, "POST", fnUserPerDayReport, failureCallback);
}


function fnnavigateReport(reportName) {
    var param = {};
    param.name = "reportName";
    param.value = reportName;
    var params = [];
    params.push(param);
    HDAjax.requestInvoke("NGReports", "ReportNavigation", params, "POST", fnUserPerDayReport, failureCallback);
}

function fnUserPerDayReport(response) {
    // $('#render').html(response);
    window.location.href = response;
}
function fnFocusDescriptionDiv(Cnt) {
    $(window).scrollTop($('#dv_' + Cnt).offset().top, 500);
}

function failureCallback() {
    ////alert('error');
    fnBootBoxAlert();
}


function fnGetExcelApi(apiId, sericeID, serviceName, SF, IsPivotable) {
    debugger;
    window.location.href = "/ExcelAPI/ExcelApi?reportName=reportname&apiId=" + apiId + "&ServiceId=" + sericeID + "&serviceName=" + serviceName + "&SF=" + SF + "&IsPivotable=" + IsPivotable;
    $("#dvURL").hide();
    $("#hdnAPIId").val(apiId);
    $("#hdnServiceId").val(sericeID);
    $("#dvSerName").html(serviceName);
    dataArr = new Array();
    csvArr = new Array();
}
function fntranscation() {
    debugger;
    HDAjax.requestInvoke("Login", "GetTranscationReportMenu", null, "GET", fnTranscationSuccessCallBack, fnTranscationfailureCallback);
}
function fnTranscationSuccessCallBack(response) {
    debugger;
    var menu1 = "";
    for (var i = 0; i < response.length; i++) {
        //menu1 += '<li><a href="#"  id="' + response[i].Menu_Code + '" class="report_levelOne" style="font-size:12px;text-align:left !important">sales</a></li>';
        menu1 += '<li id="T' + response[i].Menu_Code + '" class="report_levelOne" style="width: 185px;text-align: center;font-size:12px" ><a href="#" style="font-size:12px;text-align:left !important">' + response[i].Menu_Name + '</a></li>';
    }
    $("#hdrptrans").append(menu1);

    $('.report_levelOne').mouseenter(function () {
        var id = this.id;
        fnBindLevelOneSubMenusCategory(id);
    });
}
function fnTranscationfailureCallback(response) {
    //fnBootBoxAlert();
}
function fnBindLevelOneSubMenusCategory(subMenuName) {
    debugger;
    $.ajax(
{
    type: "GET",
    url: '../../Login/GetTranscationReportSubMenu',
    data: "Menu_Code=" + subMenuName.substring(1, subMenuName.length),
    success: function (response) {
        debugger;
        var menu = "";
        $('#ul' + subMenuName).remove();
        menu += "<ul id='ul" + subMenuName + "'>";
        $('#' + subMenuName).append(menu);

        var menu1 = "";
        for (var i = 0; i < response.length; i++) {
            var id = response[i].Method + '~' + response[i].Category_Name + '~' + response[i].Category_Code;
            menu1 += "<li style='width: 185px;text-align: center;font-size:12px'><a href='#'  id='" + id + "' class='report_TransactionClick' style='font-size:12px;text-align:left !important'>" + response[i].Category_Name + "</a></li>";
        }
        menu1 += "</ul>";


        $("#ul" + subMenuName).html('');
        $("#ul" + subMenuName).append(menu1);
        $('.report_TransactionClick').unbind("click").bind("click", function () {
            debugger;
            var reportName = $(this).attr('id').split('~')[0];
            var heading = $(this).attr('id').split('~')[1];
            var menuCode = $(this).attr('id').split('~')[2];
            reportName = reportName.replace(/\s/g, '');
            fnnavigateTransReport(reportName, heading, menuCode);
        });
    },
    error: function () {
        //fnBootBoxAlert();
    }
});


}
function fnnavigateTransReport(reportName, heading, code) {
    debugger;
    $.ajax(
 {
     type: "GET",
     url: '../../TransactionReports/ReportNavigation',
     data: "reportName=" + reportName + '&heading=' + heading + '&code=' + code,
     success: function (response) {
         debugger;
         window.location.href = response;
     },
     error: function () {
         //fnBootBoxAlert();
     }
 });
}
