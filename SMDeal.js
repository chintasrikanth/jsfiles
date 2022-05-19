
var txtglaccount = '';
$(document).ready(function () {
    $('.grdTransList td input:text').addClass('heighttext');
    $("#form1").validate({
        showErrors: function (errorMap, errorList) {
            // Clean up any tooltips for valid elements
            $.each(this.validElements(), function (index, element) {
                var $element = $(element);

                $element.data("title", "") // Clear the title - there is no error associated anymore
                    .removeClass("error")
                    .tooltip("destroy");
            });
            // Create new tooltips for invalid elements
            $.each(errorList, function (index, error) {
                var $element = $(error.element);
                $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data("title", error.message)
                    .addClass("error")
                    .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
            });
        }
    });
    $('#TxtTransactionID').attr("readonly", true)
   // $('#txtAMCCode').attr("readonly", true)
    $('#Txt_SecurityDesc').attr("readonly", true)
    $('#Txt_SecCurrency').attr("readonly", true)

    $('#txtUnitPrice').val(0.0000);
    $("#txtUnitPrice").numeric({ allow: "0123456789." });
   // CalenderContolByYear($("#txtInstrDate"), "-100:+90");
});


function HiddenData() {
    try {

        $("#hdn_MarketCode").val($("#txtMarketCode").val());
        $("#hdn_EventType").val($("#txtEventType").val());
        $("#hdn_SecurityType").val($("#txtSecurityType").val());
        $("#hdn_SecurityCode").val($("#txtSecurityCode").val());

        $("#hdn_StockExchange").val($("#txtStockExchange").val());
        $("#hdn_Broker").val($("#txtBroker").val());
        $("#hdn_CounterPartyCode").val($("#txtCounterPartyCode").val());
        $("#hdn_InstrType").val($("#ddl_InstrumentType").val());

    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function empctcdata1() {

    HiddenData();
    var ScripName;
    var headerid;
    var id = $('#hdnfld_PkId').val();
    try {
        if ($('#hdnfld_VerNo').val() == "") {
            $('#hdnfld_VerNo').val('1');
        }
        if ($('#hdnfld_RecType').val() == "") {
            $('#hdnfld_RecType').val('N');
        }
        var SlNo = $('#grdEmpCtc').children().find('tr').length;
        if (SlNo <= 1)
        { return false; }
        if (id > 0) {
            headerid = id;
        }
        else {
            headerid = 0;
        }
        var ScripName = '{"SMDealFT":[';
       
        for (i = 1; i < SlNo; i++) {

            ScripName = ScripName   + '{"Fund_ID":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[1].innerText
                                    + '","Fund_Name":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[2].innerText
                                    + '","Custodian":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[3].innerText
                                    + '","Investment_Type":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[4].innerText
                                    + '","Quantity":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[5].innerText
                                    + '","Value_Date":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[6].innerText
                                    + '","Settlement_Date":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[7].innerText
                                    + '","Exchange_Rate":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[8].innerText
                                    + '","ACQ_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[9].innerText
                                    + '","ACQ_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[10].innerText
                                    + '","Comm_Amt_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[11].innerText
                                    + '","Comm_Amt_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[12].innerText
                                    + '","Service_Tax_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[13].innerText
                                    + '","Service_Tax_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[14].innerText
                                    + '","Stamp_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[15].innerText
                                    + '","Stamp_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[16].innerText
                                    + '","Clearing_Fees_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[17].innerText
                                    + '","Clearing_Fees_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[18].innerText
                                    + '","Custodian_Charges_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[19].innerText
                                    + '","Custodian_Charges_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[20].innerText
                                    + '","STT_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[21].innerText
                                    + '","STT_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[22].innerText
                                    + '","Gross_Int_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[23].innerText
                                    + '","Gross_Int_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[24].innerText
                                    + '","Premium_Disc_Amt_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[25].innerText
                                    + '","Premium_Disc_Amt_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[26].innerText
                                    + '","Net_Amount_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[27].innerText
                                    + '","Net_Amount_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[28].innerText
                                    + '","Bank_Account":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[29].innerText
                                    + '","Settlement_Amount_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[30].innerText
                                    + '","Settlement_Amount_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[31].innerText
                                    + '","Gain_Loss_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[32].innerText
                                    + '","Gain_Loss_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[33].innerText
                                    + '","Holding_Acq_Cost_LCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[34].innerText
                                    + '","Holding_Acq_Cost_FCY":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[35].innerText
                                    + '","Bank_Charges":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[36].innerText
                                    + '","Notes":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[37].innerText
                                  

                                    + '","VerNo":"' + $('#hdnfld_VerNo').val()
                                    + '","Record_Type":"' + $('#hdnfld_RecType').val()
                                  + '", "ID":"' + $('#grdEmpCtc tr').get(i).getElementsByTagName('td')[3].innerText + '"},';

        }
        ScripName = ScripName.substring(0, ScripName.length - 1);
        ScripName = ScripName + "]}";
        $('#hdnfldEmpctc').val(ScripName);
        var str = ScripName.split(':')[1];
        if (str.length <= 2) {
            $('#hdnfldEmpctc').val("");

        }


        return true;
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function HideChildFields(Ctrl) {
    try {

        $('#div_EmpCtc').slideUp('slow');
        $("#hdnFlag").val('N');
        ClearChildTextBoxes();
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
$(function () {

    $('#div_Fields').hide();
    $('#PageTitle').text('Secondary Market Deal');
    $('#subTitle').text('Wealth Tracking Aggregator - Fund Track - Secondary Market Deal');
});

function removeTableRow(CtrlId) {
    var index = 0;
    $("#" + CtrlId + " tbody tr").each(function () {
        if (index > 0) {
            this.parentNode.removeChild(this);
        }
        index = index + 1;
    });
    return;
}
window.history.forward(1);
function noBack() { window.history.forward(1); }


function New(Ctrl) {

    $('#div_Fields').slideDown('slow');
    $('#div_Grid').slideUp('slow');
  
    angular.element(document.getElementById('SMDealDIV')).scope().GetModel();
    
}
//var irow = 1;
//function BindGrid(Ctrl) {
// ClearTextBoxes();
// var scope = angular.element(document.getElementById('SMDealDIV')).scope();
//scope.GetModel();
// PageButtons(true, false, false);
//    var j = 0;

//    if ($("#hdnFlag").val() != "") {
//        j = $("#hdnEditID").val();
//        $('#trid_' + $("#hdnFlag").val()).remove();
//        $("#hdnFlag").val('');
//        $("#hdnEditID").val('');
//    }
//    try {
//        if (v1 == "" || v2 == "") return;
//        var sty_hide = " style='display:none;'", sty_links = " style = 'cursor:pointer;'";

//        $('#grdEmpCtc').append("<tr id='trid_" + irow + "'>"
//        + "<td style='display:none;'>" + irow + "</td>"
//        + "<td> <span id='Fund_ID" + irow + "'>" + $("#hdn_AccountNo").val() + "</span></td>"
//        + "<td><span id='Fund_Name" + irow + "'>" + $("#txtAccountName").val() + "</span></td>"
//        + "<td> <span id='Custodian" + irow + "'>" + $("#hdn_Custodian").val() + "</span></td>"
//        + "<td> <span id='Investment_Type" + irow + "'>" + $("#hdn_InvestmentType").val() + "</span></td>"
//        + "<td> <span id='Quantity" + irow + "'>" + $("#txtQty").val() + "</span></td>"
//        + "<td> <span id='Value_Date" + irow + "'>" + $("#txtValDate").val() + "</span></td>"
//        + "<td> <span id='Settlement_Date" + irow + "'>" + $("#txtSettlementdate").val() + "</span></td>"
//        + "<td> <span id='Exchange_Rate" + irow + "'>" + $("#txtExchangRate").val() + "</span></td>"
//        + "<td> <span id='ACQ_LCY" + irow + "'>" + $("#txtACQLCY").val() + "</span></td>"
//        + "<td> <span id='ACQ_FCY" + irow + "'>" + $("#txtACQFCY").val() + "</span></td>"
//        + "<td> <span id='Comm_Amt_LCY" + irow + "'>" + $("#txtBrokgAmtLCY").val() + "</span></td>"
//        + "<td> <span id='Comm_Amt_FCY" + irow + "'>" + $("#txtBrokgAmtFCY").val() + "</span></td>"
//        + "<td> <span id='Service_Tax_LCY" + irow + "'>" + $("#txtSerTaxLCY").val() + "</span></td>"
//        + "<td> <span id='Service_Tax_FCY" + irow + "'>" + $("#txtSerTaxFCY").val() + "</span></td>"
//        + "<td> <span id='Stamp_LCY" + irow + "'>" + $("#txtStampLCY").val() + "</span></td>"
//        + "<td> <span id='Stamp_FCY" + irow + "'>" + $("#txtStampFCY").val() + "</span></td>"
//        + "<td> <span id='Clearing_Fees_LCY" + irow + "'>" + $("#txtClearingFeesLCY").val() + "</span></td>"
//        + "<td> <span id='Clearing_Fees_FCY" + irow + "'>" + $("#txtClearingFeesFCY").val() + "</span></td>"
//        + "<td> <span id='Custodian_Charges_LCY" + irow + "'>" + $("#txtCustodianChrgsLCY").val() + "</span></td>"
//        + "<td> <span id='Custodian_Charges_FCY" + irow + "'>" + $("#txtCustodianChrgsFCY").val() + "</span></td>"
//        + "<td> <span id='STT_LCY" + irow + "'>" + $("#txtSTTLCY").val() + "</span></td>"
//        + "<td> <span id='STT_FCY" + irow + "'>" + $("#txtSTTFCY").val() + "</span></td>"
//        + "<td> <span id='Gross_Int_LCY" + irow + "'>" + $("#txtGIntLCY").val() + "</span></td>"
//        + "<td> <span id='Gross_Int_FCY" + irow + "'>" + $("#txtGIntFCY").val() + "</span></td>"
//        + "<td> <span id='Premium_Disc_Amt_LCY" + irow + "'>" + $("#txtPremDiscAmtLCY").val() + "</span></td>"
//        + "<td> <span id='Premium_Disc_Amt_FCY" + irow + "'>" + $("#txtPremDiscAmtFCY").val() + "</span></td>"
//        + "<td> <span id='Net_Amount_LCY" + irow + "'>" + $("#txtNetAmtLCY").val() + "</span></td>"
//        + "<td> <span id='Net_Amount_FCY" + irow + "'>" + $("#txtNetAmtFCY").val() + "</span></td>"
//        + "<td> <span id='Bank_Account" + irow + "'>" + $("#txtBankAccount").val() + "</span></td>"
//        + "<td> <span id='Settlement_Amount_LCY" + irow + "'>" + $("#txtSettAmtLCY").val() + "</span></td>"
//        + "<td> <span id='Settlement_Amount_FCY" + irow + "'>" + $("#txtSettAmtFCY").val() + "</span></td>"
//        + "<td> <span id='Gain_Loss_LCY" + irow + "'>" + $("#txtGLLCY").val() + "</span></td>"
//        + "<td> <span id='Holding_Acq_Cost_LCY" + irow + "'>" + $("#txtHoldACQLCY").val() + "</span></td>"
//        + "<td> <span id='Holding_Acq_Cost_FCY" + irow + "'>" + $("#txtHoldACQFCY").val() + "</span></td>"
//        + "<td> <span id='Bank_Charges" + irow + "'>" + $("#txtBankChrgs").val() + "</span></td>"
//        + "<td> <span id='Notes" + irow + "'>" + $("#txtRemarks").val() + "</span></td>"
        
//        + "<td" + sty_hide + "><span id='ID" + irow + "'>" + $("#txtID").val() + "</span></td>"

//        + "<td" + sty_hide + " id='tdGS_" + irow + "'><img src='" + $('#hdnEmpctcId').val() + "'/></td>"
//        + "<td><img onclick='return ChildEdit(this);'  src='../Images/edit.png' title='Edit' id='img_CE_" + irow + "'/>"
//        + "<td><img onclick='return ChildView(this);'  src='../Images/view1.jpg' title='Edit' id='img_CV_" + irow + "'/>"
//        + "<td><a" + sty_links + " id='Del_" + irow + "' onclick='DeleteChildRow(this);'><img id='img_Delete_" + irow + "' alt='Delete' title='Delete' src='../Images/delete.jpg' /></a></td>"

//        + "</tr>");
//        $("#grdEmpCtc td:nth-child(5),th:nth-child(5)").show();
//        $('#div_EmpCtc').slideUp('slow');

//        ClearChildTextBoxes();

//        irow++;
//    }
//    catch (e) {
//        ErrorLog(e);
//        alert(ErrorMsg());
//    }
//}
//function ChildEdit(Ctrl) {

//    try {
//        NewEmpCtc();
//        var i = $(Ctrl).parent().parent().children().get(0).innerHTML;

//        $("#hdnFlag").val(i);

//        Recal();

//        $("#hdnEmpctcId").val($(Ctrl).parent().parent().children().get(3).innerText);

//        $('#btnAdd').show();
//    } catch (e) {
//        ErrorLog(e); alert(ErrorMsg());
//    }
//}
//function Recal()
//{
//    $("#hdn_AccountNo").val($(Ctrl).parent().parent().children().get(1).innerText);
//    $("#txtAccountName").val($(Ctrl).parent().parent().children().get(2).innerText);
//    $("#txtCustodian").val($(Ctrl).parent().parent().children().get(3).innerText);
//    $("#hdn_InvestmentType").val($(Ctrl).parent().parent().children().get(4).innerText);
//    $("#txtQty").val($(Ctrl).parent().parent().children().get(5).innerText);
//    $("#txtValDate").val($(Ctrl).parent().parent().children().get(6).innerText);
//    $("#txtSettlementdate").val($(Ctrl).parent().parent().children().get(7).innerText);
//    $("#txtExchangRate").val($(Ctrl).parent().parent().children().get(8).innerText);
//    $("#txtACQLCY").val($(Ctrl).parent().parent().children().get(9).innerText);
//    $("#txtACQFCY").val($(Ctrl).parent().parent().children().get(10).innerText);
//    $("#txtBrokgAmtLCY").val($(Ctrl).parent().parent().children().get(11).innerText);
//    $("#txtBrokgAmtFCY").val($(Ctrl).parent().parent().children().get(12).innerText);
//    $("#txtSerTaxLCY").val($(Ctrl).parent().parent().children().get(13).innerText);
//    $("#txtSerTaxFCY").val($(Ctrl).parent().parent().children().get(14).innerText);
//    $("#txtStampLCY").val($(Ctrl).parent().parent().children().get(15).innerText);
//    $("#txtStampFCY").val($(Ctrl).parent().parent().children().get(16).innerText);
//    $("#txtClearingFeesLCY").val($(Ctrl).parent().parent().children().get(17).innerText);
//    $("#txtClearingFeesFCY").val($(Ctrl).parent().parent().children().get(18).innerText);
//    $("#txtCustodianChrgsLCY").val($(Ctrl).parent().parent().children().get(19).innerText);
//    $("#txtCustodianChrgsFCY").val($(Ctrl).parent().parent().children().get(20).innerText);
//    $("#txtSTTLCY").val($(Ctrl).parent().parent().children().get(21).innerText);
//    $("#txtSTTFCY").val($(Ctrl).parent().parent().children().get(22).innerText);
//    $("#txtGIntLCY").val($(Ctrl).parent().parent().children().get(23).innerText);
//    $("#txtGIntFCY").val($(Ctrl).parent().parent().children().get(24).innerText);
//    $("#txtPremDiscAmtLCY").val($(Ctrl).parent().parent().children().get(25).innerText);
//    $("#txtPremDiscAmtFCY").val($(Ctrl).parent().parent().children().get(26).innerText);
//    $("#txtNetAmtLCY").val($(Ctrl).parent().parent().children().get(27).innerText);
//    $("#txtNetAmtFCY").val($(Ctrl).parent().parent().children().get(28).innerText);
//    $("#txtBankAccount").val($(Ctrl).parent().parent().children().get(29).innerText);
//    $("#txtSettAmtLCY").val($(Ctrl).parent().parent().children().get(30).innerText);
//    $("#txtSettAmtFCY").val($(Ctrl).parent().parent().children().get(31).innerText);
//    $("#txtGLLCY").val($(Ctrl).parent().parent().children().get(32).innerText);
//    $("#txtGLFCY").val($(Ctrl).parent().parent().children().get(33).innerText);
//    $("#txtHoldACQLCY").val($(Ctrl).parent().parent().children().get(34).innerText);
//    $("#txtHoldACQFCY").val($(Ctrl).parent().parent().children().get(35).innerText);
//    $("#txtBankChrgs").val($(Ctrl).parent().parent().children().get(36).innerText);
//    $("#txtRemarks").val($(Ctrl).parent().parent().children().get(37).innerText);

//    $("#txtID").val($(Ctrl).parent().parent().children().get(38).innerText);
//}
//function ChildView(Ctrl) {

//    try {
//        NewEmpCtc();
//        var i = $(Ctrl).parent().parent().children().get(0).innerHTML;
       
//        Recal();
//        $('#btnAdd').hide();

//    } catch (e) {
//        ErrorLog(e); alert(ErrorMsg());
//    }
//}
function ClearChildTextBoxes() {
    // $("#Txt_Fromdate").datepicker('disable');
    $("#txtAccountNo").val('');
    $("#txtAccountName").val('');
    $("#txtCustodian").val('');
    $("#txtInvestmentType").val('');
   
    $('#txtQty').val(0.0);
    $('#txtExchangRate').val(1.0000);

    //$("#txtValDate").val('');
    $("#txtSettlementdate").val('');
    
    $("#txtACQLCY").val('');
    $("#txtACQFCY").val('');
    $("#txtBrokgAmtLCY").val('');
    $("#txtBrokgAmtFCY").val('');
    $("#txtSerTaxLCY").val('');
    $("#txtSerTaxFCY").val('');
    $("#txtStampLCY").val('');
    $("#txtStampFCY").val('');
    $("#txtClearingFeesLCY").val('');
    $("#txtClearingFeesFCY").val('');
    $("#txtCustodianChrgsLCY").val('');
    $("#txtCustodianChrgsFCY").val('');
    $("#txtSTTLCY").val('');
    $("#txtSTTFCY").val('');
    $("#txtGIntLCY").val('');
    $("#txtGIntFCY").val('');
    $("#txtPremDiscAmtLCY").val('');
    $("#txtPremDiscAmtFCY").val('');
    $("#txtNetAmtLCY").val('');
    $("#txtNetAmtFCY").val('');
    $("#txtBankAccount").val('');
    $("#txtSettAmtLCY").val('');
    $("#txtSettAmtFCY").val('');
    $("#txtGLLCY").val('');
    $("#txtGLFCY").val('');
    $("#txtHoldACQLCY").val('');
    $("#txtHoldACQFCY").val('');
    $("#txtBankChrgs").val('');
    $("#txtRemarks").val('');
    $("#txtID").val('0');

}
function DeleteChildRow(Ctrl) {
    try {
        var id = Ctrl.parentNode.parentElement.cells[0].innerHTML;
        $("#trid_" + id.replace(".", "")).remove();
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

//function FillChildDtls(tdata) {

//    if (tdata.length == null) {
//        ClearChildGrid();
//        removeTableRow('grdEmpCtc');
//        return;
//    }
//    if (tdata.length <= 0) {
//        ClearChildGrid();
//        return;
//    }
//    //var tdata = jQuery.parseJSON(data.d);
//    $("#grdEmpCtc td:nth-child(5),th:nth-child(5)").show();

//    if (tdata.length > 0) {
//        removeTableRow('grdEmpCtc');
//        var sty_hide = " style='display:none;'", sty_links = " style = 'cursor:pointer;'";
//        for (var j = 0; j < tdata.length; j++) {

//            var i = j + 1;
//            $("#grdEmpCtc td:nth-child(5),th:nth-child(5)").show();

//            $('#grdEmpCtc').append("<tr id='trid_" + i + "'>"
//        + "<td style='display:none;'>" + i + "</td>"

//        + "<td>" + tdata[j].Fund_ID + "</td>"
//        + "<td>" + tdata[j].Fund_Name + "</td>"
//         + "<td>" + tdata[j].Custodian + "</td>"
//        + "<td>" + tdata[j].Investment_Type + "</td>"
//         + "<td>" + tdata[j].Quantity + "</td>"
//        + "<td>" + tdata[j].Value_Date + "</td>"
//         + "<td>" + tdata[j].Exchange_Rate + "</td>"
//        + "<td>" + tdata[j].ACQ_LCY + "</td>"
//         + "<td>" + tdata[j].ACQ_FCY + "</td>"
//        + "<td>" + tdata[j].Settlement_Date + "</td>"
//         + "<td>" + tdata[j].Comm_Amt_LCY + "</td>"
//        + "<td>" + tdata[j].Comm_Amt_FCY + "</td>"
//         + "<td>" + tdata[j].Service_Tax_LCY + "</td>"
//        + "<td>" + tdata[j].Service_Tax_FCY + "</td>"
//         + "<td>" + tdata[j].Stamp_LCY + "</td>"
//        + "<td>" + tdata[j].Stamp_FCY + "</td>"
//         + "<td>" + tdata[j].Clearing_Fees_LCY + "</td>"
//        + "<td>" + tdata[j].Clearing_Fees_FCY + "</td>"
//         + "<td>" + tdata[j].Custodian_Charges_LCY + "</td>"
//        + "<td>" + tdata[j].Custodian_Charges_FCY + "</td>"
//         + "<td>" + tdata[j].STT_LCY + "</td>"
//        + "<td>" + tdata[j].STT_FCY + "</td>"
//         + "<td>" + tdata[j].Gross_Int_LCY + "</td>"
//        + "<td>" + tdata[j].Gross_Int_FCY + "</td>"
//         + "<td>" + tdata[j].Premium_Disc_Amt_LCY + "</td>"
//        + "<td>" + tdata[j].Premium_Disc_Amt_FCY + "</td>"
//         + "<td>" + tdata[j].Net_Amount_LCY + "</td>"
//        + "<td>" + tdata[j].Net_Amount_FCY + "</td>"
//         + "<td>" + tdata[j].Bank_Account + "</td>"
//        + "<td>" + tdata[j].Settlement_Amount_LCY + "</td>"
//         + "<td>" + tdata[j].Settlement_Amount_FCY + "</td>"
//          + "<td>" + tdata[j].Gain_Loss_LCY + "</td>"
//        + "<td>" + tdata[j].Gain_Loss_FCY + "</td>"
//         + "<td>" + tdata[j].Holding_Acq_Cost_LCY + "</td>"
//        + "<td>" + tdata[j].Holding_Acq_Cost_FCY + "</td>"
//        + "<td>" + tdata[j].Bank_Charges + "</td>"
//        + "<td>" + tdata[j].Notes + "</td>"

//          + "<td" + sty_hide + ">" + tdata[j].ID + "</td>"

//         + "<td" + sty_hide + "'>" + tdata[j].ID + "</td>"
//        + "<td><img onclick='return ChildEdit(this);'  src='../Images/edit.png' title='Edit' id='img_CE_" + i + "'/>"
//        + "<td><img onclick='return ChildView(this);'  src='../Images/view1.jpg' title='Edit' id='img_CV_" + i + "'/>"
//        + "<td><a" + sty_links + " id='Del_" + irow + "' onclick='DeleteChildRow(this);'><img id='img_Delete_" + i + "' alt='Delete' title='Delete' src='../Images/delete.jpg' /></a></td>"
//        + "<td" + sty_hide + " id='td_" + i + "'>" + i + "</td>"
//        + "</tr>");

//        }
//    }
//    else {
//        return;
//    }
//}
function NewEmpCtc(Ctrl) {

    $('#div_EmpCtc').slideDown('slow');
    GetCurrentWarkingDay();
    $("#txtQty").numeric({ allow: "0123456789." });
    $("#txtExchangRate").numeric({ allow: "0123456789." });
    CalenderContolByYear($("#txtValDate"), "-1:+0.1");
    CalenderContolByYear($("#txtSettlementdate"), "-100:+90");

    
    //$('#Txt_ValueDT').attr("readonly", true)

    //$('#txt_CustodianFCY').attr("readonly", true)
    //$('#Txt_AcqLcy').attr("readonly", true)
    //$('#Txt_AcqFcy').attr("readonly", true)
    //$('#Txt_NetAmtLCY').attr("readonly", true)
    //$('#Txt_NetAmtFCY').attr("readonly", true)
    //$('#Txt_SettlementAmtLCY').attr("readonly", true)
    //$('#Txt_SettlementAmtFCY').attr("readonly", true)
    //$('#Txt_GainLossLCY').attr("readonly", true)
    //$('#Txt_GainLossFCY').attr("readonly", true)
    //$('#Txt_HoldingACQCostLCY').attr("readonly", true)
    //$('#Txt_HoldingACQCostFCY').attr("readonly", true)

    //ClearFields();


    ClearChildTextBoxes();

}
function CalculateAll() {
    //debugger;

    var ExChangeRate

    if ($("#txtExchangRate").val() == '') ExChangeRate = CurrencyFormatted(0, 5); else ExChangeRate = CurrencyFormatted($("#txtExchangRate").val(), 5);
    $("#txtExchangRate").val(ExChangeRate);
    var ExQty
    if ($("#txtQty").val() == '') ExQty = CurrencyFormatted(0, 5); else ExQty = CurrencyFormatted($("#txtQty").val(), 5);
    $("#txtQty").val(ExQty);
    var ExRate
    if ($("#txtUnitPrice").val() == '') ExRate = CurrencyFormatted(0, 5); else ExRate = CurrencyFormatted($("#txtUnitPrice").val(), 5);
    $("#txtUnitPrice").val(ExRate);
    var CustLcy
    if ($("#txtCustodianChrgsLCY").val() == '') CustLcy = CurrencyFormatted(0, 4); else CustLcy = CurrencyFormatted($("#txtCustodianChrgsLCY").val(), 4);
    $("#txtCustodianChrgsLCY").val(CustLcy);
    var BNKCHRG
    if ($("#txtBankChrgs").val() == '') BNKCHRG = CurrencyFormatted(0, 4); else BNKCHRG = CurrencyFormatted($("#txtBankChrgs").val(), 4);
    $("#txtBankChrgs").val(BNKCHRG);
    var tot = 0;
    if ($('#RdbBuy').is(':checked')) {
        tot = (ExRate * ExQty) + parseFloat(CustLcy);
    }
    else {
        tot = (ExRate * ExQty) - parseFloat(CustLcy);
    }

    var totlcy = tot * ExChangeRate;

    //var tot = (ExRate * ExQty) +  parseFloat(CustLcy) ;
    $("#txtCustodianChrgsFCY").val(CustLcy);
    //For changing the Exchange Rate    
    $("#txtCustodianChrgsLCY").val(CommaFormatted(CurrencyFormatted(CustLcy * parseFloat(ExChangeRate), 4)));


    $("#txtACQLCY").val(CommaFormatted(CurrencyFormatted(tot, 4)));
    $("#txtACQFCY").val(CommaFormatted(CurrencyFormatted(totlcy, 4)));


    //$("#Txt_NetAmtFCY").val(CommaFormatted(CurrencyFormatted(tot, 4)));
    //$("#Txt_SettlementAmtFCY").val(CommaFormatted(CurrencyFormatted(tot, 4)));

    //$("#Txt_GainLossFCY").val(CommaFormatted(CurrencyFormatted(0, 4)));
    //$("#Txt_HoldingACQCostFCY").val(CommaFormatted(CurrencyFormatted(tot, 4)));
   
    //$("#Txt_NetAmtLCY").val(CommaFormatted(CurrencyFormatted(totlcy, 4)));
    //$("#Txt_SettlementAmtLCY").val(CommaFormatted(CurrencyFormatted(totlcy, 4)));
    //$("#Txt_GainLossLCY").val(CommaFormatted(CurrencyFormatted(0, 4)));
    //$("#Txt_HoldingACQCostLCY").val(CommaFormatted(CurrencyFormatted(totlcy, 4)));
   
}
function CurrencyFormatted(amount, decemimal) {
    var i = parseFloat(amount);
    var decval = '.0';
    var divd = '10';
    for (j = 1; j < parseInt(decemimal) ; j++) {
        decval = decval + '0';
        divd = divd + '0';
    }
    if (isNaN(i)) { i = decval; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var decam = parseFloat(decval + 5);
    i = parseInt((i + decam) * divd);
    i = i / divd;
    s = new String(i);
    if (s.indexOf('.') < 0) { s += decval; }
    if (s.indexOf('.') == (s.length - decemimal)) { s += '0'; }
    s = minus + s;
    return s;
}
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired  
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}
function GetCurrentWarkingDay() {
    //debugger;
    try {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../Masters/ManageAcc.aspx/GetValueDate",
            dataType: "json",
            async: false,
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                if (tdata != null) {
                    if (tdata.length > 0) {
                        $('#txtValDate').val(tdata[0].WorkingDate);
                       
                    }
                    else {
                        return;
                    }
                }
            },
            error: function (result) {
                alert('Current Date Not found');
            }
        });
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function ClearChildGrid() {
    removeTableRow('grdEmpCtc');
    $('#grdEmpCtc').append("<tr id=trid>"
           + "<td style='text-align:center;font-weight:bold;' colspan='10'>No data found</td>"
           + "</tr>");
}

function ClearGrid() {
    removeTableRow('gv_EmpMaster');
    $('#gv_EmpMaster').append("<tr id=trid>"
           + "<td style='text-align:center;font-weight:bold;' colspan='11'>No data found</td>"
           + "</tr>");
}
//Main function for Data Display at the Record Type wise
function FillGrid(data) {

    try {
        result = jQuery.parseJSON(data.d);
        if (result == null) {
            ClearGrid();
            return;
        }
        if (result.length <= 0) {
            ClearGrid();
            return;
        }
        else {
            removeTableRow('gv_EmpMaster');
            var tdata = jQuery.parseJSON(data.d);
            if (tdata.length > 0) {
                for (var i = 0; i < tdata.length; i++) {
                    var st = "";
                    if (tdata[i].Record_Type == 'N' || tdata[i].Record_Type == 'R' || $('#hdnfld_DMode').val() == 'H') {
                        st = "style='Display:none'";
                    }
                    var st1 = "";
                    if ($('#hdnfld_DMode').val() == 'H' || tdata[i].Record_Type == 'R') {
                        st1 = "style='Display:none'";
                    }
                    var versty = "style='Display:none'";
                    if ($('#hdnfld_DMode').val() == 'H') {
                        versty = '';
                        $("#gv_EmpMaster td:nth-child(7),#gv_EmpMaster th:nth-child(7)").show();

                    }
                    else {
                        $("#gv_EmpMaster td:nth-child(7),#gv_EmpMaster th:nth-child(7)").hide();
                    }
                    if ($('#hdnfld_DMode').val() == 'L') {
                        st1 = "style='Display:none'";
                       // versty = '';
                       // $("#gv_EmpMaster td:nth-child(6),#gv_EmpMaster th:nth-child(6)").hide();

                    }
                    else {
                       // $("#gv_EmpMaster td:nth-child(6),#gv_EmpMaster th:nth-child(6)").show();
                    }



                    $('#gv_EmpMaster').append("<tr><td >" + tdata[i].BatchTran_ID + "</td><td>"
                        + tdata[i].Security_Type + "</td><td>"
                        + tdata[i].Security_Code + "</td><td>"
                         + tdata[i].Event_Type + "</td><td>"
                         + tdata[i].NoOfChildRecords + "</td><td>"
                         
                        + tdata[i].Record_Type + "</td>"
                         + "<td " + versty + ">" + tdata[i].VerNo + "</td>"
                         + "<td><a " + st1 + " id='a_Edit_" + i + "' onclick='FnEditData(\"" + tdata[i].BatchTran_ID + "\",\"" + tdata[i].VerNo + "\",\"" + tdata[i].Record_Type + "\",\"U\");'><img id='img_Edit_" + i + "' alt='Edit' title='Edit' src='../Images/edit.png' /></a></td>"
                         + "<td><a " + st + " id='a_Reverse_" + i + "' onclick='FnEditData(\"" + tdata[i].BatchTran_ID + "\",\"" + tdata[i].VerNo + "\",\"" + tdata[i].Record_Type + "\",\"R\");'><img id='img_Reverse_" + i + "' alt='Reverse' title='Reverse' src='../Images/close.png' /></a></td>"
                         + "<td><a id='a_View_" + i + "' onclick='FnEditData(\"" + tdata[i].BatchTran_ID + "\",\"" + tdata[i].VerNo + "\",\"" + tdata[i].Record_Type + "\",\"V\");'><img id='img_View_" + i + "' alt='View' title='View' src='../Images/view1.jpg' /></a></td>"
                         + "<td style='display:none'>" + tdata[i].ID + "</td><td style='display:none'>" + tdata[i].VerNo + "</td>"
                         + "</tr>");
                }
            }
        }
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
    GetPagelevelAccess();
}

//function EditProd(id, version, Transaction_ID) {

//    try {
//        PageButtons();

//        $('#hdnfld_PkId').val(id)
//        $('#hdnfld_VerNo').val(version)
//        $('#hdnfld_RecType').val()
//        PageButtons(false, true, false);

//        var dmode = $('#hdnfld_DMode').val();

//        if (dmode.toLowerCase() == 'p')
//            $('#hdnfld_RecType').val('N');
//        else if (dmode.toLowerCase() == 'l')
//            $('#hdnfld_RecType').val('L');

//        ClearFields();
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "../FundTrackTrans/SMDeal.aspx/GetSMDealListBasedOnTransID",
//            async: false,
//            data: "{SortBy: '',SortByColumnName: '',Transaction_ID: '" + Transaction_ID + "',PageNumber: '1',PageSize: '10',Record_Type:'" + dmode + "',SearchVal : ''}",
//            dataType: "json",
//            success: function (data) {
//                var tdata = jQuery.parseJSON(data.d);
//                if (tdata.length > 0) {

//                    //   $("#ddl_ClientAcc option:contains(" + tdata[0].AccountIdentifier + ")").attr('selected', 'selected');
//                    $('#txt_TransactionID').val(tdata[0].Transaction_ID);
//                    $('#txtAMCCode').val(tdata[0].AMC_Code);
//                    $('#txtMarketCode').val(tdata[0].Market_Code);
//                    $('#hdn_MarketCode').val(tdata[0].Market_Code);
//                    $('#txtEventType').val(tdata[0].Event_Type);
//                    $('#hdn_EventType').val(tdata[0].Event_Type);
//                    $('#txtSecurityType').val(tdata[0].Security_Type);
//                    $('#hdn_SecurityType').val(tdata[0].Security_Type);
//                    $('#txtSecurityCode').val(tdata[0].Security_Code);
//                    $('#hdn_SecurityCode').val(tdata[0].Security_Code);

//                    $('#txtSecDesc').val(tdata[0].Security_Code);/////change
//                    $('#txtMatDate').val(tdata[0].Maturity_Date);
//                    $('#txtStockExchange').val(tdata[0].Stock_Exchange);
//                    $('#hdn_StockExchange').val(tdata[0].Stock_Exchange);
//                    $('#txtBroker').val(tdata[0].BrokerCode);
//                    $('#hdn_Broker').val(tdata[0].BrokerCode);
//                    $('#txtCounterPartyCode').val(tdata[0].Counter_Party_Code);
//                    $('#hdn_CounterPartyCode').val(tdata[0].Counter_Party_Code);
//                    $('#txtUnitPrice').val(tdata[0].Unit_Price);
//                    $('#txtYield').val(tdata[0].Yield);
//                    $('#txtSecCurrency').val(tdata[0].Security_Currency);

//                    $('#ddl_InstrumentType').val(tdata[0].Instrument_Type);
//                    $('#hdn_InstrType').val(tdata[0].Instrument_Type);
//                    $('#txtInstrNo').val(tdata[0].Instrument_No);
//                    $('#txtInstrDate').val(tdata[0].Instrument_Date);
//                    $('#txtSettlementRef').val(tdata[0].Settlement_Reference);

//                    if (tdata[0].ID != null)
//                        FillChildDtls(tdata);
//                }

//                else {
//                    return;
//                }

//            },
//            error: function (result) {
//                alert('Data not found.');
//            }

//        });
//        $('#div_Fields').slideDown('slow');
//        $('#div_Grid').slideUp('slow');
//        return false;
//    }
//    catch (e) {
//        ErrorLog(e);
//        alert(ErrorMsg());
//    }
//}
function GridButtons(Ctrl) {

    $('#div_Fields').slideDown('slow');
    $('#div_Grid').slideUp('slow');
    ClearFields();
    var tr = $(Ctrl).parent().parent().get(0).getElementsByTagName('td');

    switch (String($(Ctrl).children().get(0).alt).toLowerCase()) {
        case "edit":
            PageButtons(false, true, false);
            break;
        case "reverse":
            PageButtons(false, false, true);
            break;
        case "view":
            PageButtons();
            break;
    }
}


function ReverseData(id, version, Transaction_ID) {
    try {
        EditProd(id, version, Transaction_ID);
        PageButtons(false, false, true);
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function DisplayData(id, version, Transaction_ID) {
    try {
        EditProd(id, version, Transaction_ID);
        PageButtons(false, false, false);
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}

function HideFields(Ctrl) {
    ClearFields();
    //  ClearTextboxes();

    ClearERROR();
    $('#div_Grid').slideDown('slow');
    $('#div_Fields').slideUp('slow');

}
function PageButtons(Save, Update, Reverse) {
    //debugger;
    if (!Save || Save == false) $('#btn_Save').hide();
    else $('#btn_Save').show();

    if (!Update || Update == false) $('#btn_Update').hide();
    else $('#btn_Update').show();

    if (!Reverse || Reverse == false) $('#btn_Reverse').hide();
    else $('#btn_Reverse').show();
}


function ClearFields() {
    removeTableRow('grdEmpCtc');
}

//function ShowMarketCodeLookup() {
//    OpenDynamicModalPopup('Market_Code', 'Market_Type', 'Market_Code_Description', 'txtMarketCode', 'hdn_MarketCode', 'dummy1', '', '');
//    return false;
//}
function ShowEventTypeLookup() {
    var PID = '';
    //OpenDynamicModalPopup('Event_Type', 'Eventtype', 'Event_Name', 'txtEventType', 'hdn_EventType', 'FnEventTypeCallBack', '', PID, 0, 'Event Type');
    OpenDynamicModalPopup('Event_Type', 'V_SmdealEventType', 'Event_Name', 'txtEventType', 'hdn_EventType', 'FnEventTypeCallBack', '', PID, 0, 'Event Type');
    return false;
}
function FnEventTypeCallBack(obj)
{
   
    var scope = angular.element(document.getElementById('SMDealDIV')).scope();
    scope.$apply(function () {
        scope.model.EventTypeDesc = $('#txtEventType').val();
        scope.model.EventType = $('#hdn_EventType').val();
        scope.EvtType = obj[3];
        
    });


}
function ShowSecurityType() {
    var PID = '';
    OpenDynamicModalPopup('Security_Type', 'ScripType', 'Securitytype_Description', 'txtSecurityType', 'hdn_SecurityType', 'FnSecurityTypeCallBack', '', PID, 0, 'Security Type');
    return false;
}
function FnSecurityTypeCallBack(obj)
{
    //$('#txtSecurityType').val(obj[2]);
    //$('#hdn_SecurityType').val(obj[1]);

    var scope = angular.element(document.getElementById('SMDealDIV')).scope();
    scope.$apply(function () {
        scope.model.SecurityTypeDesc = $('#txtSecurityType').val();
        scope.model.SecurityType = $('#hdn_SecurityType').val();
    });
}

function ShowSecurityCode() {
    var SecurityType = angular.element(document.getElementById('SMDealDIV')).scope().model.SecurityType;
    
    if (SecurityType.length == 0) { alert('please select Security Type'); return false; }

 
    
    OpenDynamicModalPopup('ID', 'V_SecInfo', 'Security_Code', 'txtSecurityCode', 'hdn_SecurityCode', 'FnSecurityCodeCallBack', 'Security_Type', SecurityType, 0, 'Security Code');
    return false;
}
 
function FnSecurityCodeCallBack(obj) {
    $('#txtSecDesc').val(obj[1]);
    $('#txtSecCurrency').val(obj[3]);
    if (!(obj[8] == null || obj[8] == "undefined"))
        $('#txtMatDate').val(obj[8]);
    else
        $('#txtMatDate').val('');

    var scope = angular.element(document.getElementById('SMDealDIV')).scope();
    scope.$apply(function () {
        scope.model.SecurityCode = $('#txtSecurityCode').val();
        scope.model.SecurityDesc = $('#txtSecDesc').val();
        scope.model.SecurityCurrency = $('#txtSecCurrency').val();
        scope.model.MaturityDate = $('#txtMatDate').val();
        scope.SecCurrency = obj[11];

    });


}

function FnAccDtlsCallBack(obj) {
angular.element(document.getElementById('SMDealDIV')).scope().FnAccDtlsCB(obj);

}
function FnBankDtlsCallBack(obj) {
    angular.element(document.getElementById('SMDealDIV')).scope().FnBankDtlsCB(obj);
}
function FnEditData(MastTranID, VerNo, RecType, VMode) {
    angular.element(document.getElementById('SMDealDIV')).scope().FnEditData(MastTranID, VerNo, RecType, VMode);
}

function dummy2(obj) {

    var a = obj[3]
    var b = obj[2]

    $("#txtInvestorName").val(Name);
    $("#txtPAN").val(pan);
}


//function ShowCustodian()
//{ OpenDynamicModalPopup('ID', 'Custodian', 'Custodian_Code', 'txtCustodian', 'hdn_Custodian', 'dummy1'); return false; }

//function ShowInvestment() {
//    OpenDynamicModalPopup('ID', 'Investment_Type', 'Investment_Type', 'txtInvestmentType', 'hdn_InvestmentType', 'dummy1'); return false;
//}


function DDLData($http, $q) {
    var DynamicData = {
        MarketCodeList: fnGetDDLData('Market Code'),
        StockExchangeList: fnGetDDLData('Stock Exchange'),
        BrokerList: fnGetDDLData('Broker'),
        CounterPartyCodeList: fnGetDDLData('Counter Party Code'),
        CustodianList: fnGetDDLData('Custodian'),
        InvestmentTypeList: fnGetDDLData('Investment Type')
    };
    function getData(url, prm) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: url,
            data: prm,//JSON.stringify(prm),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            deferred.resolve({ success: true, data: JSON.parse(data.d) });
        }).catch(function (response) {
            deferred.resolve({ success: false, data: 'Error from server' });
            // do some basic stuff e.g. hide spinner
            // deferred.reject(error);
        });

        return deferred.promise;

    }
    //function fnDefaultDDLData(ddlVal) {
    //    if (angular.isUndefined(ddlVal) || ddlVal == null) return { success: false, data: { Key: '0', Value: 'Please Select' } };
    //    var data = {
    //        Param: ddlVal

    //    };
    //    return getData('../FundTrackTrans/SMDeal.aspx/GetDDLData', data);
    //}


    function fnGetDDLData(ddlType) {

        var data = {
            Param: ddlType

        };
        return getData('../FundTrackTrans/SMDeal.aspx/GetDDLData', data);
    }


    return {
        data: $q.all(DynamicData).then(function (results) { // $q.all also returns a promise
        
            //console.log('Results', results);
            return { // this will be the resolve value of the returned $q promise

                MarketCodeList: results.MarketCodeList,
                StockExchangeList: results.StockExchangeList,
                BrokerList: results.BrokerList,
                CounterPartyCodeList: results.CounterPartyCodeList,
                CustodianList: results.CustodianList,
                InvestmentTypeList: results.InvestmentTypeList

            };
        },
        function () {
            alert('an error occured');  // error
        })
    }


}
var appRoot = angular.module('SMDealApp', []);
appRoot.controller("SMDealCtrl", SMDealCtrl);
appRoot.factory("DDLData", DDLData);
appRoot.factory("EntityModel", EntityModel);
//appRoot.factory("DatabaseFty", DatabaseFty);
appRoot.directive("jqdatepicker", jqdatepicker);
appRoot.directive("jqsysdatepicker", jqsysdatepicker);
appRoot.directive("jqtodatepicker", jqtodatepicker);
appRoot.directive("forceReadonly", forceReadonly);
appRoot.directive('currencyInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/,/g, '')
                $element.val($filter('INR')(value, false))
               // $element.val($filter('number')(value, false))
            }

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/,/g, '');
            })

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                //  $element.val($filter('number')(ngModelCtrl.$viewValue, false))
                $element.val($filter('INR')(ngModelCtrl.$viewValue, false))  // this is for test
            }

            $element.bind('change', listener)
            $element.bind('keydown', function (event) {
                var key = event.keyCode
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
                    return
                $browser.defer(listener) // Have to do this or changes don't get picked up properly
            })

            $element.bind('paste cut', function () {
                $browser.defer(listener)
            })
        }

    }
});
//appRoot.directive("currencyInput", currencyInput);
//appRoot.directive("curformat", curformat);

appRoot.filter('INR', function () {
    return function (input) {
        if (!isNaN(input)) {
            var currencySymbol = '₹';
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

            if (result.length > 1) {
                output += "." + result[1];
            }

            // return currencySymbol + output;
            return output;
        }
    }
});

function CurrencyFormatted(amount, decemimal) {
    var i = parseFloat(amount);
    var decval = '.0';
    var divd = '10';
    for (j = 1; j < parseInt(decemimal) ; j++) {
        decval = decval + '0';
        divd = divd + '0';
    }
    if (isNaN(i)) { i = decval; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var decam = parseFloat(decval + 5);
    i = parseInt((i + decam) * divd);
    i = i / divd;
    s = new String(i);
    if (s.indexOf('.') < 0) { s += decval; }
    if (s.indexOf('.') == (s.length - decemimal)) { s += '0'; }
    s = minus + s;
    return s;
}
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired  
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}
function Validate()
{
    var $scope = angular.element(document.getElementById('SMDealDIV')).scope();

    ClearERROR();
    var isValid = true;
    var $element = $('#ddlMarketCode');
    if ($scope.model.MarketCode == "0") {
        $element.tooltip("destroy").data("title", 'Please Select Market Code.').addClass("error").tooltip();
        isValid = false;
    }
    $element = $('#txtEventType');
    if ($scope.model.EventTypeDesc.length == 0) {
        $element.tooltip("destroy").data("title", 'Please Select Event Type.').addClass("error").tooltip();
        isValid = false;
    }
    $element = $('#txtSecurityType');
    if ($scope.model.SecurityType.length == 0) {
        $element.tooltip("destroy").data("title", 'Please Select Security Type.').addClass("error").tooltip();
        isValid = false;
    }
    $element = $('#txtSecurityCode');
    if ($scope.model.SecurityCode.length == 0) {
        $element.tooltip("destroy").data("title", 'Please Select Security Code').addClass("error").tooltip();
        isValid = false;
    }
    $element = $('#ddlStockExchange');
    if ($scope.model.StockExchange == "0") {
        $element.tooltip("destroy").data("title", 'Please Select Stock Exchange.').addClass("error").tooltip();
        isValid = false;
    }

    return isValid;
}

function SMDealCtrl($scope, DDLData, EntityModel, $http, $q, $filter, $browser) {

    $scope.EditIndex = -1;
   // $scope.model = EntityModel.GetEntityModel();
    $scope.disableflag = true;
    // $scope.isValid = true;
    $scope.ValidateValueDate = function (index) {
        $scope.EditIndex = index;

        var grdTransListDT = document.getElementById('grdTransList').tBodies[0];

        var $element = grdTransListDT.rows[index + 1].cells[8].getElementsByTagName("input")[0];

        $($element).data("title", "").removeClass("error").tooltip("destroy");


        if ($scope.model.SMDtlsList[$scope.EditIndex].ValueDate.length > 0)

   
            if (!$scope.model.SMDtlsList[$scope.EditIndex].ValueDate.match((/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/))) {
                $scope.model.SMDtlsList[$scope.EditIndex].ValueDate = "";
               
                $($element).data("title", "").removeClass("error").tooltip("destroy");
                $($element).tooltip("destroy").data("title", 'Please Enter valid Value Date.').addClass("error").tooltip();

                

            }
            else {
                if (new Date($scope.model.SMDtlsList[$scope.EditIndex].ValueDate) > new Date($("#hdnSysDate").val())) {
                    $scope.model.SMDtlsList[$scope.EditIndex].ValueDate = $("#hdnSysDate").val();

                    $($element).data("title", "").removeClass("error").tooltip("destroy");
                    $($element).tooltip("destroy").data("title", 'Value Date should be less than or equal to System Date.').addClass("error").tooltip();

                   
                }

            }



       
    };



    $scope.UpdateSetDateQuantityModel = function (index) {
        $scope.EditIndex = index;

       



        var _validate = Validate();
        if ($scope.model.SMDtlsList[$scope.EditIndex].Quantity.length == 0)
            _validate = false;
        if ($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice.length == 0)
            _validate = false;



        var grdTransListDT = document.getElementById('grdTransList').tBodies[0];

        var $element = grdTransListDT.rows[index + 1].cells[9].getElementsByTagName("input")[0];

        $($element).data("title", "").removeClass("error").tooltip("destroy");


        if ($scope.model.SMDtlsList[$scope.EditIndex].SettlementDate.length > 0)


            if (!$scope.model.SMDtlsList[$scope.EditIndex].SettlementDate.match((/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/))) {
                $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = "";

                $($element).data("title", "").removeClass("error").tooltip("destroy");
                $($element).tooltip("destroy").data("title", 'Please Enter valid Settlement Date.').addClass("error").tooltip();
                _validate = false;


            }
            else {

                if (new Date($scope.model.SMDtlsList[$scope.EditIndex].ValueDate) > new Date($scope.model.SMDtlsList[$scope.EditIndex].SettlementDate)) {
                    $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = "";

                    $($element).data("title", "").removeClass("error").tooltip("destroy");
                    $($element).tooltip("destroy").data("title", 'Settlement Date should be greater than or equal to Value Date.').addClass("error").tooltip();
                    _validate = false;

                }

            }






        if (_validate) {



            var httpRequest = $http({
                method: "POST",
                url: "../FundTrackTrans/SMDeal.aspx/GetSMDealCalc",
                dataType: 'json',
                // data: "{detEntry:" + txt + "}",
                data: "{data:" + JSON.stringify($scope.model) + ",index:" + index + "}",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            httpRequest.success(function (data, status) {




                if ($scope.EditIndex !== -1) {
                    var qty = JSON.parse(data.d)[0];

                    if ($scope.EvtType == "O") {
                        if (qty.QtychkFlag != "Y") {
                            alert("Saleable Quantity is less then available Qty");
                        }

                        else {
                            //new added 12 12

                            $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY = CurrencyFormatted(qty.FeeCalc, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = CurrencyFormatted(qty.ExRate, parseInt($scope.FundCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));

                            //ACQ FCY LCY Cal
                            var GrossAmt = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].Quantity) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice);
                            var Amt;
                            if ($scope.EvtType == "O") {

                                Amt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);


                            }
                            if ($scope.EvtType == "I") {

                                Amt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);
                            }
                            $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY = CurrencyFormatted(Amt, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
                            if ($scope.EvtType == "I") {
                                $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY;
                                $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY;
                            }
                            //ACQ FCY LCY Cal
                            $scope.model.SMDtlsList[$scope.EditIndex].GLLCY = qty.Gain_Loss_LCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].GLFCY = qty.Gain_Loss_FCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = qty.Holding_Acq_Cost_LCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = qty.Holding_Acq_Cost_FCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = qty.ExRate;

                            $scope.model.SMDtlsList[$scope.EditIndex].GIntLCY = qty.Interest;
                            $scope.model.SMDtlsList[$scope.EditIndex].GIntFCY = qty.Interest;

                            if (qty.Settlement_Date != "1900-01-01T00:00:00")
                                $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = qty.Settlement_Date;

                            //Net Amt FCY and Sett.Amt FCY Cal
                            var NetAmt;
                            if ($scope.EvtType == "O") {
                                NetAmt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                            }
                            else {
                                NetAmt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                            }
                            $scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));

                            //$scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));
                            //$scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));

                            $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));




                            //Net Amt and Sett.Amt Cal

                            // new added
                        }


                    }
                    else {
                        $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY = CurrencyFormatted(qty.FeeCalc, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = CurrencyFormatted(qty.ExRate, parseInt($scope.FundCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));

                        //ACQ FCY LCY Cal
                        var GrossAmt = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].Quantity) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice);
                        var Amt;
                        if ($scope.EvtType == "O") {

                            Amt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);


                        }
                        if ($scope.EvtType == "I") {

                            Amt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);
                        }
                        $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY = CurrencyFormatted(Amt, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
                        if ($scope.EvtType == "I") {
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY;
                        }
                        //ACQ FCY LCY Cal
                        $scope.model.SMDtlsList[$scope.EditIndex].GLLCY = qty.Gain_Loss_LCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].GLFCY = qty.Gain_Loss_FCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = qty.Holding_Acq_Cost_LCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = qty.Holding_Acq_Cost_FCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = qty.ExRate;

                        $scope.model.SMDtlsList[$scope.EditIndex].GIntLCY = qty.Interest;
                        $scope.model.SMDtlsList[$scope.EditIndex].GIntFCY = qty.Interest;

                        if (qty.Settlement_Date != "1900-01-01T00:00:00")
                            $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = qty.Settlement_Date;

                        //Net Amt FCY and Sett.Amt FCY Cal
                        var NetAmt;
                        if ($scope.EvtType == "O") {
                            NetAmt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                        }
                        else {
                            NetAmt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                        }
                        $scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));

                        //$scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));
                        //$scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));

                        $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));




                        //Net Amt and Sett.Amt Cal

                    }




                }


            });
            httpRequest.error(function (data, status) {

                alert("Error in fetching data from server.");
                // console.log(status);
            });



        }









    }


   $scope.UpdateQuantityModel = function (index) {
        $scope.EditIndex = index;
       
        var _validate = Validate();
        if ($scope.model.SMDtlsList[$scope.EditIndex].Quantity.length == 0)
            _validate = false;
        if ($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice.length == 0)
            _validate = false;
        if (_validate) {

            

            var httpRequest = $http({
                method: "POST",
                url: "../FundTrackTrans/SMDeal.aspx/GetSMDealCalc",
                dataType: 'json',
                // data: "{detEntry:" + txt + "}",
                data: "{data:" + JSON.stringify($scope.model) + ",index:" + index + "}",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            httpRequest.success(function (data, status) {




                if ($scope.EditIndex !== -1) {
                    var qty = JSON.parse(data.d)[0];

                    if ($scope.EvtType == "O") {
                        if (qty.QtychkFlag != "Y") {
                            alert("Saleable Quantity is less then available Qty");
                        }

                        else {
                            //new added 12 12

                            $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY = CurrencyFormatted(qty.FeeCalc, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = CurrencyFormatted(qty.ExRate, parseInt($scope.FundCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));

                            //ACQ FCY LCY Cal
                            var GrossAmt = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].Quantity) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice);
                            var Amt;
                            if ($scope.EvtType == "O") {

                                Amt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);


                            }
                            if ($scope.EvtType == "I") {

                                Amt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);
                            }
                            $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY = CurrencyFormatted(Amt, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
                            if ($scope.EvtType == "I") {
                                $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY;
                                $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY;
                            }
                            //ACQ FCY LCY Cal
                            $scope.model.SMDtlsList[$scope.EditIndex].GLLCY = qty.Gain_Loss_LCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].GLFCY = qty.Gain_Loss_FCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = qty.Holding_Acq_Cost_LCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = qty.Holding_Acq_Cost_FCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = qty.ExRate;

                            $scope.model.SMDtlsList[$scope.EditIndex].GIntLCY = qty.Interest;
                            $scope.model.SMDtlsList[$scope.EditIndex].GIntFCY = qty.Interest;

                            if (qty.Settlement_Date != "1900-01-01T00:00:00")
                                $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = qty.Settlement_Date;

                            //Net Amt FCY and Sett.Amt FCY Cal
                            var NetAmt;
                            if ($scope.EvtType == "O") {
                                NetAmt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                            }
                            else {
                                NetAmt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                            }
                            $scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));

                            //$scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));
                            //$scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));

                            $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));
                            $scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));




                            //Net Amt and Sett.Amt Cal

                            // new added
                        }


                    }
                    else {
                        $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY = CurrencyFormatted(qty.FeeCalc, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = CurrencyFormatted(qty.ExRate, parseInt($scope.FundCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));

                        //ACQ FCY LCY Cal
                        var GrossAmt = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].Quantity) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice);
                        var Amt;
                        if ($scope.EvtType == "O") {

                            Amt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);


                        }
                        if ($scope.EvtType == "I") {

                            Amt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);
                        }
                        $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY = CurrencyFormatted(Amt, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
                        if ($scope.EvtType == "I") {
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY;
                            $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY;
                        }
                        //ACQ FCY LCY Cal
                        $scope.model.SMDtlsList[$scope.EditIndex].GLLCY = qty.Gain_Loss_LCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].GLFCY = qty.Gain_Loss_FCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = qty.Holding_Acq_Cost_LCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = qty.Holding_Acq_Cost_FCY;
                        $scope.model.SMDtlsList[$scope.EditIndex].ExchangRate = qty.ExRate;

                        $scope.model.SMDtlsList[$scope.EditIndex].GIntLCY = qty.Interest;
                        $scope.model.SMDtlsList[$scope.EditIndex].GIntFCY = qty.Interest;

                        if (qty.Settlement_Date != "1900-01-01T00:00:00")
                            $scope.model.SMDtlsList[$scope.EditIndex].SettlementDate = qty.Settlement_Date;
                       
                        //Net Amt FCY and Sett.Amt FCY Cal
                        var NetAmt;
                        if ($scope.EvtType == "O") {
                            NetAmt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                        }
                        else {
                            NetAmt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
                        }
                        $scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));

                        //$scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));
                        //$scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate));

                        $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));
                        $scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.SecCurrency));




                        //Net Amt and Sett.Amt Cal

}
                   

                     

                }


            });
            httpRequest.error(function (data, status) {

                alert("Error in fetching data from server.");
                // console.log(status);
            });



        }






      


   }
   $scope.UpdateExchangeRateModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].SerTaxLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].StampLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].STTLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].PremDiscAmtLCY = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].PremDiscAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate);
               $scope.model.SMDtlsList[$scope.EditIndex].GIntLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
               $scope.$apply();
}

       }

   }

   $scope.UpldateFCY = function (index)
   {
       //ACQ FCY LCY Cal
       var GrossAmt = parseFloat($scope.model.SMDtlsList[$scope.EditIndex].Quantity) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].UnitPrice);
       var Amt;
       if ($scope.EvtType == "O") {

           Amt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);


       }
       if ($scope.EvtType == "I") {

           Amt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY);
       }
       $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY = CurrencyFormatted(Amt, parseInt($scope.SecCurrency));
       $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ACQFCY) * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
       if ($scope.EvtType == "I") {
           $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQFCY;
           $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = $scope.model.SMDtlsList[$scope.EditIndex].ACQLCY;
       }
       //ACQ FCY LCY Cal
       //Net Amt FCY and Sett.Amt FCY Cal
       var NetAmt;
       if ($scope.EvtType == "O") {
           NetAmt = GrossAmt - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) - parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
       }
       else {
           NetAmt = GrossAmt + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY) + parseFloat($scope.model.SMDtlsList[$scope.EditIndex].GIntFCY);
       }
       $scope.model.SMDtlsList[$scope.EditIndex].NetAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));
       $scope.model.SMDtlsList[$scope.EditIndex].SettAmtFCY = CurrencyFormatted(NetAmt, parseInt($scope.SecCurrency));

       $scope.model.SMDtlsList[$scope.EditIndex].NetAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));
       $scope.model.SMDtlsList[$scope.EditIndex].SettAmtLCY = CurrencyFormatted(NetAmt * parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt($scope.FundCurrency));

       //Net Amt and Sett.Amt Cal
       //Profit Loss Cal
       var httpRequest = $http({
           method: "POST",
           url: "../FundTrackTrans/SMDeal.aspx/GetSMDealCalc",
           dataType: 'json',
           // data: "{detEntry:" + txt + "}",
           data: "{data:" + JSON.stringify($scope.model) + ",index:" + index + "}",
           headers: {
               "Content-Type": "application/json"
           }
       });
       httpRequest.success(function (data, status) {
           var qty = JSON.parse(data.d)[0];
           if ($scope.EvtType == "O") {
               $scope.model.SMDtlsList[$scope.EditIndex].GLFCY = CurrencyFormatted(qty.Gain_Loss_FCY, parseInt($scope.SecCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].GLLCY = CurrencyFormatted(qty.Gain_Loss_LCY, parseInt($scope.FundCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].HoldACQFCY = CurrencyFormatted(qty.Holding_Acq_Cost_FCY, parseInt($scope.SecCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].HoldACQLCY = CurrencyFormatted(qty.Holding_Acq_Cost_LCY, parseInt($scope.FundCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].PremDiscAmtFCY = CurrencyFormatted(qty.Holding_Prem_Disc_Amt_Fcy, parseInt($scope.SecCurrency));
               $scope.model.SMDtlsList[$scope.EditIndex].PremDiscAmtLCY = CurrencyFormatted(qty.Holding_Prem_Disc_Amt_Lcy, parseInt($scope.FundCurrency));



           }

       });
       httpRequest.error(function (data, status) {

           alert("Error in fetching data from server.");
           // console.log(status);
       });
       //Profit Loss Cal

   }
  
   $scope.UpdateBrokgAmtFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].BrokgAmtLCY, parseInt(4));
              }
          }
   }
   $scope.UpdateSerTaxFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].SerTaxFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].SerTaxLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].SerTaxLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].SerTaxLCY, parseInt(4));
           }
       }
   }
   $scope.UpdateStampFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].StampFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].StampLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].StampLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].StampLCY, parseInt(4));
           }
       }
   }
   $scope.UpdateClearingFeesFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].ClearingFeesLCY, parseInt(4));
           }
       }
   }
   $scope.UpdateCustodianChrgsFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].CustodianChrgsLCY, parseInt(4));
           }
       }
   }
   $scope.UpdateSTTFCYModel = function (index) {
       $scope.EditIndex = index;
       if (Validate()) {
           if ($scope.EditIndex !== -1) {
               $scope.model.SMDtlsList[$scope.EditIndex].STTFCY = CurrencyFormatted(parseFloat($scope.model.SMDtlsList[$scope.EditIndex].STTLCY) / parseFloat($scope.model.SMDtlsList[$scope.EditIndex].ExchangRate), parseInt(4));
               $scope.UpldateFCY(index);
               $scope.model.SMDtlsList[$scope.EditIndex].STTLCY = CurrencyFormatted($scope.model.SMDtlsList[$scope.EditIndex].STTLCY, parseInt(4));
           }
       }
   }
    $scope.SaveSMDeal = function () {

      
        try {

            var isValid = Validate();
         

            var $element;
                angular.forEach($scope.model.SMDtlsList, function (SMDtls, index) {
                    if (SMDtls.AccountNo.length == 0)
                    {
                        $element = $('#AccountNo_' + index);
                        $element.tooltip("destroy").data("title", 'Please Enter Account No.').addClass("error").tooltip();
                        isValid = false;
                    }
                    if (SMDtls.Custodian == "0")
                    {
                        $element = $('#ddlCustodian_' + index);
                        $element.tooltip("destroy").data("title", 'Please Select Custodian.').addClass("error").tooltip();
                        isValid = false;
                    }
                       
                    if (SMDtls.InvestmentType == "0")
                    {

                        $element = $('#ddlInvestmentType_' + index);
                        $element.tooltip("destroy").data("title", 'Please Select Investment Type.').addClass("error").tooltip();
                        isValid = false;
                    }
                        
                    if (SMDtls.UnitPrice.length == 0)
                    {
                        $element = $('#UnitPrice' + index);
                        $element.tooltip("destroy").data("title", 'Please Enter Unit Price.').addClass("error").tooltip();
                        isValid = false;
                    }
                        
                    if (SMDtls.Quantity.length == 0)
                    {
                        $element = $('#Quantity' + index);
                        $element.tooltip("destroy").data("title", 'Please Enter Quantity.').addClass("error").tooltip();
                        isValid = false;
                    }
                        
                    if (SMDtls.ValueDate.length == 0)
                    {
                       // $element = $('#ValueDate' + index);
                        //$element.tooltip("destroy").data("title", 'Please Enter Value Date.').addClass("error").tooltip();
                        isValid = false;
                    }
                      
                    if (SMDtls.SettlementDate.length == 0)
                    {
                        //$element = $('#SettlementDate' + index);
                       // $element.tooltip("destroy").data("title", 'Please Enter Settlement Date.').addClass("error").tooltip();
                        isValid = false;
                    }
                         
                    if (SMDtls.ExchangRate.length == 0)
                    {

                        $element = $('#ExchangRate' + index);
                        $element.tooltip("destroy").data("title", 'Please Enter Exchange Rate.').addClass("error").tooltip();
                        isValid = false;
                    }
                       
                    if (SMDtls.BankAccount.length == 0)
                    {
                        $element = $('#BankAccount_' + index);
                        $element.tooltip("destroy").data("title", 'Please Enter Bank Account.').addClass("error").tooltip();
                        isValid = false;
                    }
                        
                  
                })
                if (isValid) {



                var httpRequest = $http({
                    method: "POST",
                    url: "../FundTrackTrans/SMDeal.aspx/SaveSMDeal",
                    dataType: 'json',
                    data: "{data:" + JSON.stringify($scope.model) + "}",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                httpRequest.success(function (data, status) {

                    alert(JSON.parse(data.d)[0].StatusMsg);


                    $('#div_Grid').slideDown('slow');
                    $('#div_Fields').slideUp('slow');

                    //$timeout(function () {
                    //    angular.element(document.querySelector('#btnReset')).click();
                    //}, 0);

                    // console.log(JSON.parse(data.d));  // conversion string to json format
                });
                httpRequest.error(function (data, status) {
                    alert("Error while Saving the transaction.");
                    // console.log(status);
                });





            }
            else {
                alert("Please Enter All Mandatory Fields.");
            }

        }
        catch (e) {
            alert("Some Error..");
            //console.log(e + " Some Error");
        }

    }
    $scope.ResetSMDeal = function ($event) {



    }
   




    
  
    DDLData.data.then(function (response) {
        $scope.MarketCodeList = response.MarketCodeList.data;
       
        $scope.StockExchangeList = response.StockExchangeList.data;
        $scope.BrokerList = response.BrokerList.data;
        $scope.CounterPartyCodeList = response.CounterPartyCodeList.data;
        $scope.CustodianList = response.CustodianList.data;
        $scope.InvestmentTypeList = response.InvestmentTypeList.data;
       
    });

    //$scope.$watch('model.InstrumentNo', function (val) {

    //    $scope.model.InstrumentNo = $filter('INR')(val);

    //}, true);


    $scope.GetModel = function () {
        $scope.model = EntityModel.GetEntityModel();
        $scope.model.MarketCode = "6";

        //$scope.model.InstrumentNo = "100000";//$filter('INR')('100000');

        $scope.$apply();

    }
    $scope.GetNewSMDtls = function () {
       

        $scope.model.SMDtlsList.push(
            {
                TransactionID: "", //parseInt($scope.model.SMDtlsList[$scope.model.SMDtlsList.length - 1].TransactionID) + 1
                AccountNo :"",
                AccountName:"",
                Custodian: "2",
                InvestmentType: "2",
                UnitPrice:"",
                Yield:"0",
                Quantity:"",
                ValueDate: $("#hdnSysDate").val(),
                SettlementDate:"",
                ExchangRate:"",
                ACQLCY:"0",
                ACQFCY:"0", 
                BankAccount:"",
                BrokgAmtLCY:"0",
                BrokgAmtFCY:"0",
                SerTaxLCY:"0",
                SerTaxFCY:"0",
                StampLCY:"0",
                StampFCY:"0",
                ClearingFeesLCY:"0",
                ClearingFeesFCY:"0",
                CustodianChrgsLCY:"0",
                CustodianChrgsFCY:"0",
                STTLCY:"0",
                STTFCY:"0",
                GIntLCY:"0",
                GIntFCY:"0",
                PremDiscAmtLCY:"0",
                PremDiscAmtFCY:"0",
                NetAmtLCY:"0",
                NetAmtFCY:"0",
                SettAmtLCY:"0",
                SettAmtFCY:"0",
                GLLCY:"0",
                GLFCY:"0",
                HoldACQLCY:"0",
                HoldACQFCY:"0",
                BankChrgs:"",
                Remarks:"",
                VerNo :"0",
                Record_Type:"N"
            }
        );
    }
    $scope.FnAccDtlsCB = function (arg) {

        if ($scope.EditIndex !== -1) {

            $scope.model.SMDtlsList[$scope.EditIndex].AccountNo = $.trim(arg[0]);
            $scope.model.SMDtlsList[$scope.EditIndex].AccountName = $.trim(arg[2].split('-')[1]);
            $scope.FundCurrency = arg[9];
            //if ($scope.model.SMDtlsList[$scope.EditIndex].ValueDate == null || $scope.model.SMDtlsList[$scope.EditIndex].ValueDate == undefined || $scope.model.SMDtlsList[$scope.EditIndex].ValueDate == "" || $scope.model.SMDtlsList[$scope.EditIndex].ValueDate.lenght == 0)
          //      $scope.model.SMDtlsList[$scope.EditIndex].ValueDate = $("#hdnSysDate").val();
            $scope.$apply();

        }

     
    }
    $scope.FnBankDtlsCB = function (arg) {

        if ($scope.EditIndex !== -1) {

            $scope.model.SMDtlsList[$scope.EditIndex].BankAccount = arg[2];
            $scope.$apply();

        }


    }
    $scope.FnEditData = function (MastTranID, VerNo, RecType,VMode) {



        var httpRequest = $http({
            method: "POST",
            url: "../FundTrackTrans/SMDeal.aspx/GetDataMasTransID",
            dataType: 'json',
            data: "{ MastTranID: '" + MastTranID + "',VerNo:'" + VerNo + "',RecType:'" + RecType + "'}",
            headers: {
                "Content-Type": "application/json"
            }
        });
        httpRequest.success(function (data, status) {

            var _result = JSON.parse(data.d);
            // alert(JSON.parse(data.d)[0].StatusMsg);
            $scope.model = EntityModel.SetEntityModel(_result, VMode, RecType, VerNo);

            $('#div_Fields').slideDown('slow');
            $('#div_Grid').slideUp('slow');

            //$timeout(function () {
            //    angular.element(document.querySelector('#btnReset')).click();
            //}, 0);

            // console.log(JSON.parse(data.d));  // conversion string to json format
        });
        httpRequest.error(function (data, status) {
            alert("Error in Save data.");
            // console.log(status);
        });



       

       


    }
    $scope.removeSMDtl = function (e, SMDtl) {
       // if ($scope.model.SMDtlsList.length == 1) return;
        $scope.model.SMDtlsList.splice($scope.model.SMDtlsList.indexOf(SMDtl), 1);
       // $element.remove();
      //  $scope.$destroy();
    };
    $scope.GetAccNoDtls = function (ctrlID,curModel, index) {

        $scope.EditIndex = index;
      
        if (parseInt(curModel.AccountNo.length) >= 3) {

            OpenDynamicModalPopup('ID', 'V_AccountInfo', 'Fund_ID', ctrlID, 'hdn_AccountNo', 'FnAccDtlsCallBack', 'Fund_ID', curModel.AccountNo);
        }
        else {
            alert("Please Enter at least 3 chars from account no.");

        }
       
       

       
       // event.preventDefault();
        return false;

    };
    $scope.GetBankAccountDtls = function (ctrlID, curModel, index) {
        $scope.EditIndex = index;
        if (parseInt(curModel.AccountNo.length) === 0) {
            alert('Please Select Account No.');
        }
        else {
            OpenDynamicModalPopup('ID', 'Bank_Account', 'Bank_Account_Number', ctrlID, 'hdn_BankAccountNumber', 'FnBankDtlsCallBack', 'AccountId', curModel.AccountNo);

        }

       
        event.preventDefault();
        return false;
    };
    

   // alert("hai");
}


function SetEntity(model, VMode, RecType, VerNo) {
    var SMDEntity = SMDEntity || {};
    SMDEntity.Model = function () {
        this.MasterTransactionID = model[0].BatchTran_ID;
        this.AMCCode = model[0].AMC_Code;
        if (!(angular.isUndefined(model[0].MarketID) || model[0].MarketID == null))
              this.MarketCode = model[0].MarketID.toString();
        this.EventType = model[0].Event_Type;
        this.EventTypeDesc = model[0].Event_Name;
        this.SecurityType = model[0].Security_Type;
        this.SecurityTypeDesc = model[0].Securitytype_Description;
        this.SecurityCode = model[0].Security_Code;
        this.SecurityDesc = model[0].Security_Description;
        if (!(angular.isUndefined(model[0].Maturity_Date) || model[0].Maturity_Date == null))
        this.MaturityDate = model[0].Maturity_Date;
        if (!(angular.isUndefined(model[0].Stock_Exchange) || model[0].Stock_Exchange == null))
        this.StockExchange = model[0].Stock_Exchange.toString();
        this.Broker = model[0].BrokerCode;
        if (!(angular.isUndefined(model[0].CounterPartyID) || model[0].CounterPartyID == null))
        this.CounterPartyCode = model[0].CounterPartyID.toString();
        this.SecurityCurrency = model[0].Security_Currency;
        this.InstrumentType = model[0].Instrument_Type;
        this.InstrumentNo = model[0].Instrument_No;
        this.InstrumentDate = model[0].Instrument_Date;
        this.SettlementRef = model[0].Settlement_Reference;
        this.Record_Type = RecType;
        this.VerNo = VerNo;
        this.DMLMode = VMode;
        
        var arr = [];
        angular.forEach(model, function (SMDtls, index) {
            arr.push({
                TransactionID: SMDtls.Transaction_ID,
                AccountNo: SMDtls.Fund_ID,
                AccountName: SMDtls.AccountName,
                Custodian: SMDtls.Custodian.toString(),
                InvestmentType: SMDtls.Investment_TypeID.toString(),
                UnitPrice: SMDtls.Unit_Price,
                Yield: SMDtls.Yield,
                Quantity: SMDtls.Quantity,
                ValueDate: SMDtls.Value_Date,
                SettlementDate: SMDtls.Settlement_Date,
                ExchangRate: SMDtls.Exchange_Rate,
                ACQLCY: SMDtls.ACQ_LCY,
                ACQFCY: SMDtls.ACQ_FCY,
                BankAccount: SMDtls.Bank_Account,
                BrokgAmtLCY: SMDtls.Comm_Amt_LCY,
                BrokgAmtFCY: SMDtls.Comm_Amt_FCY,
                SerTaxLCY: SMDtls.Service_Tax_LCY,
                SerTaxFCY: SMDtls.Service_Tax_FCY,
                StampLCY: SMDtls.Stamp_LCY,
                StampFCY: SMDtls.Stamp_FCY,
                ClearingFeesLCY: SMDtls.Clearing_Fees_LCY,
                ClearingFeesFCY: SMDtls.Clearing_Fees_FCY,
                CustodianChrgsLCY: SMDtls.Custodian_Charges_LCY,
                CustodianChrgsFCY: SMDtls.Custodian_Charges_FCY,
                STTLCY: SMDtls.STT_LCY,
                STTFCY: SMDtls.STT_FCY,
                GIntLCY: SMDtls.Gross_Int_LCY,
                GIntFCY: SMDtls.Gross_Int_FCY,
                PremDiscAmtLCY: SMDtls.Premium_Disc_Amt_LCY,
                PremDiscAmtFCY: SMDtls.Premium_Disc_Amt_FCY,
                NetAmtLCY: SMDtls.Net_Amount_LCY,
                NetAmtFCY: SMDtls.Net_Amount_FCY,
                SettAmtLCY: SMDtls.Settlement_Amount_LCY,
                SettAmtFCY: SMDtls.Settlement_Amount_FCY,
                GLLCY: SMDtls.Gain_Loss_LCY,
                GLFCY: SMDtls.Gain_Loss_FCY,
                HoldACQLCY: SMDtls.Holding_Acq_Cost_LCY,
                HoldACQFCY: SMDtls.Holding_Acq_Cost_FCY,
                BankChrgs: SMDtls.Bank_Charges,
                Remarks: SMDtls.Notes,
                VerNo: SMDtls.VerNo,
                Record_Type: SMDtls.Record_Type
            });
        });


        this.SMDtlsList = arr;
       
        this.fill = function () {
            // this.SMDtlsList = [{ TransactionID: "230", AccountNo: "aao32", AccountName: "Please Select" }];
            alert('tst');
            //console.log('fill tank');
        }



    }

    var model = new SMDEntity.Model();
    return model;
}
function Entity() {
    var SMDEntity = SMDEntity || {};
    SMDEntity.Model = function () {
        this.MasterTransactionID = "";
        this.AMCCode = $("#hdnAMCCode").val();
        this.MarketCode = "0";
        this.EventType = "";
        this.EventTypeDesc = "";
        this.SecurityType = "";
        this.SecurityTypeDesc = "";
        this.SecurityCode = "";
        this.SecurityDesc = "";
        this.MaturityDate = "";
        this.StockExchange = "0";
        this.Broker = "0";
        this.CounterPartyCode = "0";
        this.SecurityCurrency = "";
        this.InstrumentType = "0";
        this.InstrumentNo = "";
        this.InstrumentDate = "";
        this.SettlementRef = "";
        this.Record_Type = "N";
        this.VerNo = "0";
        this.DMLMode = "I";
        this.SMDtlsList = [{
TransactionID:"",
AccountNo :"",
AccountName:"",
Custodian: "2",
InvestmentType: "2",
UnitPrice:"",
Yield:"0",
Quantity:"",
ValueDate: $("#hdnSysDate").val(),
SettlementDate:"",
ExchangRate:"1",
ACQLCY:"0",
ACQFCY:"0", 
BankAccount:"",
BrokgAmtLCY:"0",
BrokgAmtFCY:"0",
SerTaxLCY:"0",
SerTaxFCY:"0",
StampLCY:"0",
StampFCY:"0",
ClearingFeesLCY:"0",
ClearingFeesFCY:"0",
CustodianChrgsLCY:"0",
CustodianChrgsFCY:"0",
STTLCY:"0",
STTFCY:"0",
GIntLCY:"0",
GIntFCY:"0",
PremDiscAmtLCY:"0",
PremDiscAmtFCY:"0",
NetAmtLCY:"0",
NetAmtFCY:"0",
SettAmtLCY:"0",
SettAmtFCY:"0",
GLLCY:"0",
GLFCY:"0",
HoldACQLCY:"0",
HoldACQFCY:"0",
BankChrgs:"",
Remarks:"",
VerNo :"0",
Record_Type:"N"
        }];
        this.fill = function () {
           // this.SMDtlsList = [{ TransactionID: "230", AccountNo: "aao32", AccountName: "Please Select" }];
                alert('tst');
                //console.log('fill tank');
            }
        

     
    }
   
    var model = new SMDEntity.Model();
    return model;
}

function curformat() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {

            ctrl.$formatters.push(function (modelValue) {
                return modelValue.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            });
            ctrl.$parsers.push(function (viewValue) {
                return parseFloat(viewValue.replace(new RegExp(",", "g"), ''));
            });

        }
    };
}
//function currencyInput()
//{
//    return {
//        require: 'ngModel',
//        link: function ($scope, $element, $attrs, ngModelCtrl, $filter, $browser, $render) {
//            var listener = function () {
//                var value = $element.val().replace(/,/g, '')
//                $element.val($filter('number')(value, false))
//            }

//            // This runs when we update the text field
//            ngModelCtrl.$parsers.push(function (viewValue) {
//                return viewValue.replace(/,/g, '');
//            })

//            // This runs when the model gets updated on the scope directly and keeps our view in sync
//            ngModelCtrl.$render = function () {
//                $element.val($filter('number')(ngModelCtrl.$viewValue, false))
//            }

//            $element.bind('change', listener)
//            $element.bind('keydown', function (event) {
//                var key = event.keyCode
//                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
//                // This lets us support copy and paste too
//                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
//                    return
//                $browser.defer(listener) // Have to do this or changes don't get picked up properly
//            })

//            $element.bind('paste cut', function () {
//                $browser.defer(listener)
//            })
//        }

//    }
//}
function forceReadonly()
{
    return {
     
        link: function (scope, element, attr) {

            var focusHandler = element.on("focus", function(){
                element.removeAttr('disabled');
               
               // if (this.readonly) {
                    this.blur();
               // }
            });
            scope.$on("$destroy", function () {
               //console.log("destroy");
                focusHandler();
            })
        }




    }


}
function jqsysdatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        transclude:true,
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                   
                });
            };
            var today = new Date();
            var options = {
                dateFormat: "dd/mm/yy",
                maxDate: $('#hdnSysDate').val(),
                autoSize: true,
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                onSelect: function (dateText) {
                    updateModel(dateText);
                    elem.removeClass("error").tooltip("destroy");
                }
            };

            elem.datepicker(options);
        }
    }

}
function jqdatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var today = new Date();
            var options = {
                dateFormat: "dd/mm/yy",
                autoSize: true,
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                onSelect: function (dateText) {
                    updateModel(dateText);
                    elem.removeClass("error").tooltip("destroy");
                }
            };

            elem.datepicker(options);
        }
    }

}
function jqtodatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
           // var today = new Date();
            var options = {
                dateFormat: "dd/mm/yy",
                minDate: new Date(scope.SMDtl.ValueDate.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3")),
                autoSize: true,
                changeMonth: true,
                changeYear: true,
               onSelect: function (dateText) {
                    updateModel(dateText);
                    elem.removeClass("error").tooltip("destroy");
               }
                ,
               beforeShow: function () {
                   elem.datepicker("option", "minDate", new Date(scope.SMDtl.ValueDate.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, "$2$1$3")));

               }
            };

            elem.datepicker(options);
           
        }
    }

}

function EntityModel() {



    return {

        GetEntityModel: function () {
            return Entity();

        },
        SetEntityModel: function (model, VMode, RecType, VerNo) {
            return SetEntity(model,VMode, RecType, VerNo);

        }
    }
}

function DatabaseFty($http, $q) {


    function getData(url, prm) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: url,
            data: prm,//JSON.stringify(prm),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            deferred.resolve({ success: true, data: JSON.parse(data.d) });
        }).catch(function (response) {
            deferred.resolve({ success: false, data: 'Error from server' });
            // do some basic stuff e.g. hide spinner
            // deferred.reject(error);
        });

        return deferred.promise;

    }

  



}