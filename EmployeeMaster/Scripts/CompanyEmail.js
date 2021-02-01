var welcomeEmailId = "";
var docResubmission = "";
var hrmsCCmail = "";
var Mail_Sender_Mail = "";
var TemplateUrl = "";


function fngetCompanyEmail() {
    debugger;
    var action = groupId;
    CoreREST.requestInvoke("/MPRFApi/V1/GetCompanyEmail", action, null, "GET", fnBindEmailSucesscallback, fnBindEmailFailurecallback, null);

}
function fnBindEmailSucesscallback(response) {
    if (response != null) {
        var returnWelcomEmail = $.grep(response.list, function (element, index) {
            return element.EMIL_PURPOSE == 'WELCOME_EMAIL_ID';
        });
        if (returnWelcomEmail.length > 0) {
            welcomeEmailId = returnWelcomEmail[0].HRMS_EMAIL_ID;
        }
        else {
            welcomeEmailId = "no_reply@swaas.net";
        }
        var returnWelcomEmail = $.grep(response.list, function (element, index) {
            return element.EMIL_PURPOSE == 'DOC_RESUBMISSION';
        });
        if (returnWelcomEmail.length > 0) {
            docResubmission = returnWelcomEmail[0].HRMS_EMAIL_ID;
        }
        else {
            docResubmission = "no_reply@swaas.net";
        }

        var returnWelcomEmail = $.grep(response.list, function (element, index) {
            return element.EMIL_PURPOSE == 'CC_MAIL';
        });
        if (returnWelcomEmail.length > 0) {
            hrmsCCmail = returnWelcomEmail[0].HRMS_EMAIL_ID;
        }
        else {
            hrmsCCmail = "no_reply@swaas.net";
        }

        var returnWelcomEmail = $.grep(response.list, function (element, index) {
            return element.EMIL_PURPOSE == 'MAIL_SENDER_NAME';
        });
        if (returnWelcomEmail.length > 0) {
            Mail_Sender_Mail = returnWelcomEmail[0].HRMS_EMAIL_ID;
        }
        else {
            Mail_Sender_Mail = "no_reply";
        }
    }
    else {
        welcomeEmailId = "no_reply@swaas.net";
        docResubmission = "no_reply@swaas.net";
        hrmsCCmail = "no_reply@swaas.net";
        Mail_Sender_Mail = "no_reply";
    }
    TemplateUrl = 'https://hdnotifications.co.in/hd/index.php';
}
function fnBindEmailFailurecallback() {

}
