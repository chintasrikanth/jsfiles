$(document).ready(function () {
    GetReferenceNoList();
    $("#ddlReferenceNo").change(function () {
        $("#ddlAccountNo").prop("selectedIndex", 0);
        if ($("#ddlReferenceNo option:selected").index() > 0)
                 GetAccountNoList($("#ddlReferenceNo option:selected").val());
    });

    $("#ddlAccountNo").change(function () {
        
        if ($("#ddlAccountNo option:selected").index() > 0) {
            GetOrdersList($("#ddlAccountNo option:selected").text());
            GetTransList($("#ddlAccountNo option:selected").text(), '0');
        }
        });


    $("#ddlTypeOfMapping").prop("selectedIndex", 0);


});
function GetReferenceNoList() {

    try {

        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "../Masters/ClientDocumentUpload.aspx/GetReferenceNoList",
            data: "{DocType : '0'}",
            dataType: "json",
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);

                $('#ddlReferenceNo').empty().append($("<option></option>").val('0').html('Select one'));
                $.each(tdata, function () {
                    $('#ddlReferenceNo').append($("<option></option>").val(this['Key']).html(this['Value']));
                });

            }
        })
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function GetAccountNoList(ClientID) {

    try {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "../Masters/ClientDocumentUpload.aspx/GetAccountNoList",
            data: "{ClientID : '" + ClientID + "',DocType : '0'}",
            dataType: "json",
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                $('#ddlAccountNo').empty().append($("<option value=0>Select one</option>"));
                if (tdata.length > 0) {
                    $.each(tdata, function () {
                        $('#ddlAccountNo').append($("<option></option>").val(this['Key']).html(this['Value']));

                    });
                }
            }
        })
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function FillOrdersGrid(data) {
    try {
        result = jQuery.parseJSON(data.d);
        if (result == null) {
            ClearGridData('grdOrdersList', 8);
            return;
        }
        if (result.length <= 0) {
            ClearGridData('grdOrdersList', 8);
            return;
        }
        else {
            removeGridRow('grdOrdersList');
            var tdata = jQuery.parseJSON(data.d);
            if (tdata.length > 0) {
                $.each(tdata, function (index, data) {
                    $('#grdOrdersList').append("<tr><td>"
                        + "<input type='checkbox' id='grdOrdersListcb_" + data.IHNO + "' value='" + data.SCHID + "'  onclick='OrdersSelect(this);'/></td>"
                                      + data.IHNO + "</td><td>" + data.IHNO + "</td><td>"
                                                 + data.ACNO + "</td><td>"
                                                 + data.CMID + "</td><td>"
                                                 + data.SchDesc + "</td><td>"
                                                  + data.UNITS + "</td><td>"
                                                   + data.AMOUNT + "</td><td>"
                                                 + data.BRKAMT + "</td><td style='display:none;'>"
                                                  + data.TRTYPE + "</td>"
                                                  + "</tr>");

                });


            }
        }
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function FillTransGrid(data) {
    try {
        result = jQuery.parseJSON(data.d);
        if (result == null) {
            ClearGridData('grdTransList', 11);
            return;
        }
        if (result.length <= 0) {
            ClearGridData('grdTransList', 11);
            return;
        }
        else {
            removeGridRow('grdTransList');
            var tdata = jQuery.parseJSON(data.d);
            if (tdata.length > 0) {
                var i = 0;
                $.each(tdata, function (index, data) {
                    i +=  1;
                    
                    
                  $('#grdTransList').append("<tr><td>"
                        + "<input type='checkbox' id='grdTransListcb_" + i + "' value='" + data.FMCODE + "'  onclick='TransSelect(this);'/></td><td>"
                                      + data.FMCODE + "</td><td>" + data.TD_FUND + "</td><td>" + data.TD_TRNO + "</td><td>"
                                                 + data.TD_TRTYPE + "</td><td>"
                                                 + data.INVNAME + "</td><td>"
                                                 + data.PAN1 + "</td><td>"
                                                 + data.TD_UNITS + "</td><td id='grdTransListAmt_" + i + "'>"
                                                 + data.TD_AMT + "</td><td>"
                                                 + data.TRDT + "</td><td><input type='textbox' id='txt_amount_" + i + "' /></td><td style='display:none;'>"
                                                 + RemmoveUndifined(data.IHNO) + "</td>"
                                               + "</tr>");
                  if (RemmoveUndifined(data.IHNO) != '') {
                      $('#txt_amount_' + i).attr('disabled', 'disabled');

                  }
                });

               
            }
        }
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function TransSelect(id) {
    if ($(id).is(':checked')) {
        // $("span.multiGroup input").attr('checked', false);
       // $('input[type="checkbox"][id*=grdTransListcb_]').not(this).prop("checked", false);
        //$(id).prop("checked", true);


        //var ids = $("#grdTransList tr:has(input:checked)").map(function () {
        //    var $tr = $(this);
        //    // var id = $tr.find("td:last").text();
        //    //hdnMapTransIDList
        //    var id = $tr.find("td:eq(2)").text();
        //    return id;
        //}).toArray();

       // alert(ids.join(", "));


      //  var AccNo = $(id).parent().parent().children().get(3).innerHTML;
       // var SchID = $(id).val();
       // GetTransList(AccNo, SchID);

    }
}
function removeGridRow(CtrlId) {
    try {
        var index = 0;
        $("#" + CtrlId + " tbody tr").each(function () {
            if (index > 0) {
                this.parentNode.removeChild(this);
            }
            index = index + 1;
        });
        return;
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function ClearGridData(CtrlId,colSpan) {
    removeGridRow(CtrlId);
    $("#" + CtrlId).append("<tr id=trid>"
           + "<td style='text-align:center;font-weight:bold;' colspan='" + colSpan + "'>No data found</td>"
           + "</tr>");
}

function CheckTransMapIsValid() {
    var isValid = true;
    var transIDs = $("#grdTransList tr:has(input:checked)").map(function () {
        var $tr = $(this);
        // var id = $tr.find("td:last").text();
        //
        var id = $tr.find("td:eq(3)").text();
        //$tr.find("td:eq(8)")[0].id
        //var trd = $tr.find("td:eq(7)").autoNumeric('init', {aSep: '.', aDec: ','});;
          $tr.find("td:eq(8)").autoNumeric('init', { aSep: '.', aDec: ',' });
        return id;
    }).toArray();

  //  isValid = false;
    if (transIDs.join(", ") == '') {
        alert("Please select Transactions");
        isValid = false;
    }
   
    var FMCodeIDs = $("#grdTransList tr:has(input:checked)").map(function () {
        var $tr = $(this);
        // var id = $tr.find("td:last").text();
        //
        var id = $tr.find("td:eq(1)").text();
        return id;
    }).toArray();

    var OrderIDs = $("#grdOrdersList tr:has(input:checked)").map(function () {
        var $tr = $(this);
       var id = $tr.find("td:eq(1)").text();
        return id;
    }).toArray();

    if (isValid) {

       $("#hdnMapTransIDList").val(transIDs.join(", "));
       $("#hdnOrderNo").val(((OrderIDs.join(", ") == '') ? 0 : OrderIDs.join(", ")));
       $("#hdnFMCODEIDList").val(((FMCodeIDs.join(", ") == '') ? 0 : FMCodeIDs.join(", ")));
       $("#hdnClientID").val($("#ddlReferenceNo option:selected").val());
       $("#hdnAccountNo").val($("#ddlAccountNo option:selected").text());
       var JsonTrans = GenerateJoshnForMainGrid('grdTransList', 'grdTransListcb_', 'MFTransactionMapping')
       UpdateTrans(JsonTrans);
       }

    return isValid;
}

function UpdateTrans(Childata) {

    try {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "../DataPorting/MFTransactionMapping.aspx/UpdatTransList",
            data: "{Translist : '" + Childata + "'}",
            dataType: "json",
            success: function (data) {
                
            }
        })
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function GenerateJoshnForMainGrid(grdname, hdnname, tblname) {
    var alldata = '{"' + tblname + '":[';
    var gv = $('#' + grdname);
    var SlNo = $('#' + grdname).children().find('tr').length;
    for (var i = 1; i < SlNo; i++) {
        var gv_row = gv.children().find('tr:not(:first)').get(i - 1).getElementsByTagName('td');
        if ($('#' + hdnname + i).prop('checked') == true) {            
            alldata = alldata + '{"OrderNo":"' + gv_row[3].innerHTML + '", "Charge":"' + $('#txt_amount_' + i).val() + '","RegID":"' + $('#ddlRegId').val() + '","AccountNo":"' + $('#ddlAccountNo option:selected').text() + '"},';
        }
    }
    alldata = alldata.substring(0, alldata.length - 1);
    alldata = alldata + ']}';
    return alldata;
}
function ChangeMapType(Ctrl) {
   
    $('#FileUpload').hide();
    $('#ManualPorting').hide();
    $('#AutoPorting').hide();

    switch ($('#' + Ctrl.id).val()) {
        case "File Upload":
            $('#FileUpload').show();
            break;
        case "Manual Porting":
            $('#ManualPorting').show();
            break;
        case "Auto Porting":
            $('#AutoPorting').show();
            break;
        
    }


}