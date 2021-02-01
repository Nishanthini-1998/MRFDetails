function GetNumber2(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'ONE';
    words[2] = 'TWO';
    words[3] = 'THREE';
    words[4] = 'FOUR';
    words[5] = 'FIVE';
    words[6] = 'SIX';
    words[7] = 'SEVEN';
    words[8] = 'EIGHT';
    words[9] = 'NINE';
    words[10] = 'TEN';
    words[11] = 'ELEVEN';
    words[12] = 'TWELVE';
    words[13] = 'THIRTEEN';
    words[14] = 'FOURTEEN';
    words[15] = 'FIFTEEN';
    words[16] = 'SIXTEEN';
    words[17] = 'SEVENTEEN';
    words[18] = 'EIGHTEEN';
    words[19] = 'NINETEEN';
    words[20] = 'TWENTY';
    words[30] = 'THIRTY';
    words[40] = 'FORTY';
    words[50] = 'FIFTY';
    words[60] = 'SIXTY';
    words[70] = 'SEVENTY';
    words[80] = 'EIGHTY';
    words[90] = 'NINETY';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "CRORES ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "LAKHS ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "THOUSAND ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "HUNDRED AND ";
            } else if (i == 6 && value != 0) {
                words_string += "HUNDRED ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


//function GetNumber2(value) {
//    var gf = ""
//    var gg = ""
//    var gh = ""
//    var gi = ""
//    var gj = ""
//    var gk = ""
//    var sNumber = value;
//    sNumber = stripBad(sNumber);
//    sNumber = parseInt(sNumber, 10);
//    var sNum2 = String(sNumber);

//    var j = sNum2.length
//    var hNum2 = sNum2.substring((j - 3), ((j - 3) + 3))

//    if (hNum2 > 0) {
//        gf = hto(hNum2) + ""
//    }

//    var tNum2 = sNum2.substring((j - 5), (j - 5) + 2)
//    if (tNum2 > 0) {
//        gg = hto(tNum2) + " THOUSAND "
//    }

//    var mNum2 = sNum2.substring((j - 7), (j - 7) + 2)
//    if (mNum2 > 0) {
//        gh = hto(mNum2) + " LAKHS "
//    }

//    var bNum2 = sNum2.substring((j - 9), (j - 9) + 2)
//    if (bNum2 > 0) {
//        gi = hto(bNum2) + " BILLION "
//    }

//    var trNum2 = sNum2.substring((j - 11), (j - 11) + 2)
//    if (trNum2 > 0) {
//        gj = hto(trNum2) + " BRILLION "
//    }
//    var trrNum2 = sNum2.substring((j - 13), (j - 13) + 2)
//    if (trrNum2 > 0) {
//        gk = hto(trrNum2) + " TRILLION "
//    }

//    if (sNumber < 1) {
//        gf = "ZERO"
//    }

//    if (j > 15) {
//        gj = " Your number is too big for me to spell";
//        gi = "";
//        gh = "";
//        gg = "";
//        gf = "";
//        gk = "";
//    }

//    return " " + gk + gj + gi + gh + gg + gf
//}
//function stripBad(string) {
//    for (var i = 0, output = '', valid = "0123456789."; i < string.length; i++)
//        if (valid.indexOf(string.charAt(i)) != -1)
//            output += string.charAt(i)
//    return output;
//}
//function hto(ff) {
//    var sNum3 = ""
//    var p1 = ""
//    var p2 = ""
//    var p3 = ""

//    var hy = ""
//    var n1 = new Array
//    ('', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX',
//    'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE',
//    'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN',
//    'EIGHTEEN', 'NINETEEN')

//    var n2 = new Array('', '', 'TWENTY', 'THIRTY', 'FORTY',
//    'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY')


//    sNum3 = ff
//    var j = sNum3.length
//    var h3 = sNum3.substring((j - 3), (j - 3) + 1)
//    if (h3 > 0) {
//        p3 = n1[h3] + " HUNDRED "
//    }
//    else { p3 = "" }

//    var t2 = parseInt(sNum3.substring((j - 2), (j - 2) + 1), 10)
//    var u1 = parseInt(sNum3.substring((j - 1), (j - 1) + 1), 10)
//    var tu21 = parseInt(sNum3.substring((j - 2), (j - 2) + 2), 10)

//    if (tu21 == 0) {
//        p1 = "";
//        p2 = "";
//    }

//    else if ((t2 < 1) && (u1 > 0)) {
//        p2 = "";
//        p1 = n1[u1]
//    }

//    else if (tu21 < 20) {
//        p2 = "";
//        p1 = n1[tu21]
//    }

//    else if ((t2 > 1) && (u1 == 0)) {
//        p2 = n2[t2]
//        p1 = ""
//    }

//    else {
//        p2 = n2[t2] + "-"
//        p1 = n1[u1]
//    }

//    ff = p3 + p2 + p1

//    return ff;
//}