$(document).ready(function () {
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
});
$(document).ready(function () {
    $('#PageTitle').text('RIMS Rate Card Setup');
    $('#subTitle').text('Wealth Tracking Aggregator - RIMS - RIMS Rate Card Setup');
    CalenderContolByYear($("#Txt_StartDate"), "-100:+90");
    CalenderContolByYear($("#Txt_EndDate"), "-100:+90");
    $("#TxtCommValue").numeric({ allow: ".0123456789" });
    $("#TxtToAmt").numeric({ allow: ".0123456789" });
    $("#TxtFromAmt").numeric({ allow: ".0123456789" });
    $("#txtCommissionflow").numeric({ allow: ".0123456789" });
});
var CountComm = 0;
var CountPay = 0;
var CountRec = 0;
function New(Ctrl) {
    //alert("New");
    $('#div_Fields').slideDown('slow');
    $('#div_Grid').slideUp('slow');
    ClearFields();
    removeTableRow('ui_grdinner');
    PageButtons(true,false,false);
    $('#div_Payble').hide();
    $('#div_Recievable').hide();
    $('#div_Commission').hide();
    removeTableRow('grd_Commission');
    removeTableRow('grd_Recievable');
    removeTableRow('grd_Payble');
    $("#SelectData").hide();
    ClearFields();
    $("#Drp_Asset").prop('selectedIndex', 0);
    $("#Drp_BasedOn").prop('selectedIndex', 0);
    $('#Txt_StartDate').val('');
    $('#Txt_EndDate').val('');
}
function PageButtons(Save, Update, Reverse) {
    ////debugger;
    if (!Save || Save == false) $('#btn_Save').hide();
    else $('#btn_Save').show();

    if (!Update || Update == false) $('#btn_Update').hide();
    else $('#btn_Update').show();

    if (!Reverse || Reverse == false) $('#btn_Reverse').hide();
    else $('#btn_Reverse').show();
}
function FillGrid(data) {
    //debugger;
    try {
        result = jQuery.parseJSON(data.d);
        if (result == null) {
            ClearGrid();
            //return;
        }
        if (result.length <= 0) {
            ClearGrid();
            //return;
        }
        else {
            removeTableRow('gv_RIMSRateCardSetup');
            var tdata = jQuery.parseJSON(data.d);
            if (tdata.Table.length > 0) {
                for (var i = 0; i < tdata.Table.length; i++) {
                    var st = "";

                    if (tdata.Table[i].Record_Type == 'N' || tdata.Table[i].Record_Type == 'R' || $('#hdnfld_DMode').val() == 'H') {
                        st = "style='Display:none'";
                    }
                    var st1 = "";
                    if ($('#hdnfld_DMode').val() == 'H' || tdata.Table[i].Record_Type == 'R') {
                        st1 = "style='Display:none'";
                    }
                    var versty = "";
                    var versty = "style='Display:none'";
                    if ($('#hdnfld_DMode').val() == 'H') {
                        versty = "";
                        //$("#gv_EquRequisition td:nth-child(6),th:nth-child(6)").show();
                        $('#gv_RIMSRateCardSetup tr').each(function () {
                            $(this).find('td:eq(5), th:eq(5)').show();
                        });
                    }
                    else {
                        versty = "style='Display:none'";
                        //$("#gv_EquRequisition td:nth-child(6),th:nth-child(6)").hide();
                        $('#gv_RIMSRateCardSetup tr').each(function () {
                            $(this).find('td:eq(5), th:eq(5)').hide();
                        });
                    }
                    $('#gv_RIMSRateCardSetup').append("<tr><td>" + tdata.Table[i].RateCard_Code + "</td><td>" + tdata.Table[i].Asset_Type + "</td><td>" + tdata.Table[i].From_Dt + "</td><td>" + tdata.Table[i].To_Dt + "</td>"
                        + "<td>" + tdata.Table[i].Record_Type + "</td>"
                        + "<td " + versty + ">" + tdata.Table[i].VerNo + "</td>"
                        + "<td><a " + st1 + " id='a_Edit_" + i + "' onclick='EditData(this);'><img id='img_Edit_" + i + "' alt='Edit' title='Edit' src='../Images/edit.png' /></a></td>"
                        + "<td><a " + st + " id='a_Reverse_" + i + "' onclick='ReverseData(this);'><img id='img_Reverse_" + i + "' alt='Reverse' title='Reverse' src='../Images/close.png' /></a></td>"
                        + "<td><a id='a_View_" + i + "' onclick='DisplayData(this);'><img id='img_View_" + i + "' alt='View' title='View' src='../Images/view1.jpg' /></a></td>"
                        + "<td style='display:none'>" + tdata.Table[i].ID + "</td>" + "<td style='display:none' >" + tdata.Table[i].VerNo + "</td>"
                        + "</tr>");
                }
            } 
        }
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
    //GetPagelevelAccess();
}
function DisplayData(Ctrl) {
     //debugger;
    try {
        var id = Ctrl.parentNode.parentElement.cells[0].innerHTML;
        var vernoid = Ctrl.parentNode.parentElement.cells[10].innerHTML;
        var rectyp = Ctrl.parentNode.parentElement.cells[4].innerHTML;
        var assetid = Ctrl.parentNode.parentElement.cells[1].innerHTML;
        $('#hdnAsset_CD').val(assetid);
        $('#hdnfld_PkId').val(id)
        $('#hdnfld_VerNo').val(vernoid)
        $('#hdnfld_RecType').val(rectyp)
        PageButtons(false, false, false);
        $('#div_Fields').slideDown('slow');
        $('#div_Grid').slideUp('slow');
        var dmode = $('#hdnfld_DMode').val();
        ClearFields();
        //alert(id);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../RIMS/RIMS_RateCard_Setup.aspx/GetRateCardSetupList",
            //data: "{ID : '" + id + "'}",
            data: "{SortBy: '',SortByColumnName: '',ID: '" + id + "' ,PageNumber: '1',PageSize: '10',Record_Type:'" + dmode + "',VerNo:" + vernoid + ",SearchVal:''}",
            dataType: "json",
            async: false,
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                if (tdata.Table.length > 0) {
                    $('#Div_ItemGrd').show();
                    $('#Drp_Asset').val(tdata.Table[0].Asset_TypeID);
                    $('#Txt_StartDate').val(tdata.Table[0].From_Dt);
                    $('#Txt_EndDate').val(tdata.Table[0].To_Dt);
                    //BindItemGridForEdit(tdata, tdata[0].Asset_Type);  
                    FillAssetDetails(tdata.Table[0].Asset_TypeID);
                    var dmode = tdata.Table[0].Asset_TypeID;
                    var cdvalue = '';
                    if (dmode == 4 || dmode == 3 || dmode == 2) {
                        var SlNo = $("#gv_ItemGrid tr").length; //'Security_Code'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                            if (tdata.Table[0].Security_Code == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue = $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var Security_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                                var Sector_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[3].innerText;
                                $('#hdn_Security_Code').val(Security_Code);
                                $('#hdn_Sector_Code').val(Sector_Code);
                            }

                        }
                    }
                    if (dmode == 6) {
                        var SlNo = $("#gv_InsItemGrid tr").length; //'PolicyName'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                            if (tdata.Table[0].PolicyID == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue = $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var PolicyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                                var PolicyTypeID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[7].innerText;
                                var PolicyNatureID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[6].innerText;
                                var IssuingcompanyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[8].innerText;
                                $('#hdn_PolicyID').val(PolicyID);
                                $('#hdn_PolicyTypeID').val(PolicyTypeID);
                                $('#hdn_PolicyNatureID').val(PolicyNatureID);
                                $('#hdn_IssuingcompanyID').val(IssuingcompanyID);

                            }

                        }

                    }
                }
                PopulateDropdownControls_WithParams('DrpCommMode', '../RIMS/RIMS_RateCard_Setup.aspx/GetDDLPayMode_CommType', "{DMLMode : '1', Pay_Mode : '', AssetCD :'" + cdvalue + "'}");
                if (tdata.Table1.length > 0) {
                    $('#div_Recievable').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Recievable', tdata.Table1)
                }
                if (tdata.Table2.length > 0) {
                    $('#div_Payble').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Payble', tdata.Table2)
                }
                if (tdata.Table3.length > 0) {
                    $('#div_Commission').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Commission', tdata.Table3)
                }
            },
            error: function (result) {
                alert('Data not found.');
            }
        });
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function EditData(Ctrl) {
    //debugger;
    try {
        var id = Ctrl.parentNode.parentElement.cells[0].innerHTML;
        var pKid = Ctrl.parentNode.parentElement.cells[9].innerHTML;
        var vernoid = Ctrl.parentNode.parentElement.cells[10].innerHTML;
        var rectyp = Ctrl.parentNode.parentElement.cells[4].innerHTML;
        var assetid = Ctrl.parentNode.parentElement.cells[1].innerHTML;
        $('#hdnAsset_CD').val(assetid);
        $('#hdnfld_PkId').val(pKid)
        $('#hdnfld_VerNo').val(vernoid)
        $('#hdnfld_RecType').val(rectyp)
        $('#hdnRateCardCode').val(id)
        PageButtons(false, true, false);
        $('#div_Fields').slideDown('slow');
        $('#div_Grid').slideUp('slow');
        var dmode = $('#hdnfld_DMode').val();
        ClearFields();
        //alert(id);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../RIMS/RIMS_RateCard_Setup.aspx/GetRateCardSetupList",
            //data: "{ID : '" + id + "'}",
            data: "{SortBy: '',SortByColumnName: '',ID: '" + id + "' ,PageNumber: '1',PageSize: '10',Record_Type:'" + dmode + "',VerNo:" + vernoid + ",SearchVal:''}",
            dataType: "json",
            async: false,
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                if (tdata.Table.length > 0) {
                    $('#Div_ItemGrd').show();
                    $('#Drp_Asset').val(tdata.Table[0].Asset_TypeID);
                    $('#Txt_StartDate').val(tdata.Table[0].From_Dt);
                    $('#Txt_EndDate').val(tdata.Table[0].To_Dt);
                    //BindItemGridForEdit(tdata, tdata[0].Asset_Type);  
                    FillAssetDetails(tdata.Table[0].Asset_TypeID);
                    var dmode = tdata.Table[0].Asset_TypeID;
                    var cdvalue = '';
                    if (dmode == 4 || dmode==3||dmode==2 ) {
                        var SlNo = $("#gv_ItemGrid tr").length; //'Security_Code'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                            if (tdata.Table[0].Security_Code == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue = $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var Security_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                                var Sector_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[3].innerText;                              
                                $('#hdn_Security_Code').val(Security_Code);
                                $('#hdn_Sector_Code').val(Sector_Code);
                            }
                          
                        }
                    }
                    if (dmode == 6) {
                        var SlNo = $("#gv_InsItemGrid tr").length; //'PolicyName'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                            if (tdata.Table[0].PolicyID == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue=  $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var PolicyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                                var PolicyTypeID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[7].innerText;
                                var PolicyNatureID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[6].innerText;
                                var IssuingcompanyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[8].innerText;
                                $('#hdn_PolicyID').val(PolicyID);
                                $('#hdn_PolicyTypeID').val(PolicyTypeID);
                                $('#hdn_PolicyNatureID').val(PolicyNatureID);
                                $('#hdn_IssuingcompanyID').val(IssuingcompanyID);
                               
                            }                            

                        }

                    }
                }

                PopulateDropdownControls_WithParams('DrpCommMode', '../RIMS/RIMS_RateCard_Setup.aspx/GetDDLPayMode_CommType', "{DMLMode : '1', Pay_Mode : '', AssetCD :'" + cdvalue + "'}");
                if (tdata.Table1.length > 0) {
                    $('#div_Recievable').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Recievable', tdata.Table1)
                   
                    CountRec++;
                }
                if (tdata.Table2.length > 0) {
                    $('#div_Payble').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Payble', tdata.Table2)
                    
                    CountPay++;
                }
                if (tdata.Table3.length > 0) {
                    $('#div_Commission').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Commission', tdata.Table3)
                    CountComm++;
                }
            },
            error: function (result) {
                alert('Data not found.');
            }
        });
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function GetDataForAdd() {
    AddData();
}
function ReverseData(Ctrl) {
    //debugger;
    try {
        var id = Ctrl.parentNode.parentElement.cells[0].innerHTML;
        var pKid = Ctrl.parentNode.parentElement.cells[9].innerHTML;
        var vernoid = Ctrl.parentNode.parentElement.cells[10].innerHTML;
        var rectyp = Ctrl.parentNode.parentElement.cells[4].innerHTML;
        var assetid = Ctrl.parentNode.parentElement.cells[1].innerHTML;
        $('#hdnAsset_CD').val(assetid);
        $('#hdnfld_PkId').val(pKid)
        $('#hdnRateCardCode').val(id)
        $('#hdnfld_VerNo').val(vernoid)
        $('#hdnfld_RecType').val(rectyp)
        PageButtons(false, false, true);
        $('#div_Fields').slideDown('slow');
        $('#div_Grid').slideUp('slow');
        var dmode = $('#hdnfld_DMode').val();
        ClearFields();
        //alert(id);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../RIMS/RIMS_RateCard_Setup.aspx/GetRateCardSetupList",
            //data: "{ID : '" + id + "'}",
            data: "{SortBy: '',SortByColumnName: '',ID: '" + id + "' ,PageNumber: '1',PageSize: '10',Record_Type:'" + dmode + "',VerNo:" + vernoid + ",SearchVal:''}",
            dataType: "json",
            async: false,
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                if (tdata.Table.length > 0) {
                    $('#Div_ItemGrd').show();
                    $('#Drp_Asset').val(tdata.Table[0].Asset_TypeID);
                    $('#Txt_StartDate').val(tdata.Table[0].From_Dt);
                    $('#Txt_EndDate').val(tdata.Table[0].To_Dt);
                    //BindItemGridForEdit(tdata, tdata[0].Asset_Type);  
                    FillAssetDetails(tdata.Table[0].Asset_TypeID);
                    var dmode = tdata.Table[0].Asset_TypeID;
                    var cdvalue = '';
                    if (dmode == 4 || dmode == 3 || dmode == 2) {
                        var SlNo = $("#gv_ItemGrid tr").length; //'Security_Code'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                            if (tdata.Table[0].Security_Code == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue = $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var Security_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[1].innerText;
                                var Sector_Code = $('#gv_ItemGrid tr').get(i).getElementsByTagName('td')[3].innerText;
                                $('#hdn_Security_Code').val(Security_Code);
                                $('#hdn_Sector_Code').val(Sector_Code);
                            }

                        }
                    }
                    if (dmode == 6) {
                        var SlNo = $("#gv_InsItemGrid tr").length; //'PolicyName'
                        for (i = 1; i < SlNo; i++) {
                            var rid = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                            if (tdata.Table[0].PolicyID == rid) {
                                $('#Chk_ItemGrid_' + i).prop('checked', true);
                                cdvalue = $('#AsetCD_' + i).val();
                                $('#hdnSecCode').val(cdvalue);
                                var PolicyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[5].innerText;
                                var PolicyTypeID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[7].innerText;
                                var PolicyNatureID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[6].innerText;
                                var IssuingcompanyID = $('#gv_InsItemGrid tr').get(i).getElementsByTagName('td')[8].innerText;
                                $('#hdn_PolicyID').val(PolicyID);
                                $('#hdn_PolicyTypeID').val(PolicyTypeID);
                                $('#hdn_PolicyNatureID').val(PolicyNatureID);
                                $('#hdn_IssuingcompanyID').val(IssuingcompanyID);

                            }

                        }

                    }
                }
                PopulateDropdownControls_WithParams('DrpCommMode', '../RIMS/RIMS_RateCard_Setup.aspx/GetDDLPayMode_CommType', "{DMLMode : '1', Pay_Mode : '', AssetCD :'" + cdvalue + "'}");
                if (tdata.Table1.length > 0) {
                    $('#div_Recievable').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Recievable', tdata.Table1)
                }
                if (tdata.Table2.length > 0) {
                    $('#div_Payble').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Payble', tdata.Table2)
                }
                if (tdata.Table3.length > 0) {
                    $('#div_Commission').show();
                    $('#SelectData').show();
                    FinalBindAllRecPayCommGrid('grd_Commission', tdata.Table3)
                }
            },
            error: function (result) {
                alert('Data not found.');
            }
        });
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function FillAssetDetails(dmode) {
    //debugger;
    try {
        ClearFields();
        PopulateDropdownControls('DrpCommFlow', '../RIMS/RIMS_RateCard_Setup.aspx/GetStaticDropdowns', 'CommissionFlow');
        $('#div_Payble').hide();
        $('#div_Recievable').hide();
        $('#div_Commission').hide();
        removeTableRow('grd_Commission');
        removeTableRow('grd_Recievable');
        removeTableRow('grd_Payble');
        $('#hdnAssetId').val($("#Drp_Asset option:selected").text());
        $("#SelectData").hide();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../RIMS/RIMS_RateCard_Setup.aspx/GetDDLAsset",
            data: "{AssetID : '" + dmode + "'}",
            dataType: "json",
            async: false,
            success: function (data) {
                var tdata = jQuery.parseJSON(data.d);
                if (tdata != null) {
                    if (tdata.length > 0) {
                        $('#Div_ItemGrd').show();

                        if (dmode == 6)
                        { BindItemGrid(tdata, dmode); }
                        else if (dmode == 3)
                        {BindItemGrid(tdata, dmode); }
                        else
                        { BindItemGrid(tdata, dmode); }
                    }
                    else {
                        ClearGrid();
                        return;
                    }
                }
                else { ClearGrid(); }
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
function BindItemGrid(gdata, dmode) {
    var st_hide = "style=display:none";
    if (dmode == 6) {
        if (gdata.length > 0) {
            removeTableRow('gv_InsItemGrid');
            removeTableRow('gv_ItemGrid');
           
            $('#gv_InsItemGrid').show();
            $('#gv_ItemGrid').hide();
            for (var i = 0; i < gdata.length; i++) {
                var style_td = "style='border: 0px solid #6f9dd9;padding-left:10px;'";
                var SlNo = $('#gv_InsItemGrid').children().find('tr').length;
                $('#gv_InsItemGrid').append("<tr style='border: 0px;' id=trid" + SlNo + ">"
                            + "<td><input type='radio' id='Chk_ItemGrid_" + SlNo + "'  class='checkbox1' name='AssetCode' onclick='ShowCommisionMode(this)' /></td>"
                            + "<td>" + gdata[i].PolicyName + "</td>"
                            + "<td>" + gdata[i].policyTypeName + "</td>"
                            + "<td>" + gdata[i].PolicyNatureName + "</td>" //+ "</td>"                            
                            + "<td>" + gdata[i].InsuranceCompany + "</td>"
                            + "<td " + st_hide + ">" + gdata[i].PolicyID + "</td>"
                            + "<td  " + st_hide + ">" + gdata[i].Policynatureid + "</td>"
                            + "<td  " + st_hide + ">" + gdata[i].PolicyTypeID + "</td>"
                            + "<td  " + st_hide + ">" + gdata[i].IssuingcompanyID + "</td>"
                            + "<td style='display:none'><input type='text' class='TextCls' readonly='true'  id='AsetCD_" + SlNo + "' value='" + gdata[i].Asset_CD + "'/></td>"
                            + "</tr>");
            }
        }

    }

   
    else {
        if (gdata.length > 0) {
            $('#gv_InsItemGrid').hide();
            $('#gv_ItemGrid').show();
            removeTableRow('gv_ItemGrid');
            removeTableRow('gv_InsItemGrid');
        
            for (var i = 0; i < gdata.length; i++) {
                var style_td = "style='border: 0px solid #6f9dd9;padding-left:10px;'";
                var SlNo = $('#gv_ItemGrid').children().find('tr').length;
                $('#gv_ItemGrid').append("<tr style='border: 0px;' id=trid" + SlNo + ">"
                            + "<td><input type='radio' id='Chk_ItemGrid_" + SlNo + "' class='checkbox2' name='AssetCode' onclick='ShowCommisionMode(this)' /></td>"
                            + "<td>" + gdata[i].Security_Code + "</td>"
                            + "<td>" + gdata[i].Security_Name + "</td>"
                            + "<td " + st_hide + ">" + gdata[i].sector_code + "</td>"
                            + "<td style='display:none'><input type='text' class='TextCls' readonly='true'  id='AsetCD_" + SlNo + "' value='" + gdata[i].Asset_CD + "'/></td>"
                            + "</tr>");
            }
        }
      
      
    }

    
}
function BindItemGridForEdit(gdata, dmode) {
    var st_hide = "style=display:none";
    if (dmode == 6) {
        if (gdata.Table.length > 0) {
            removeTableRow('gv_InsItemGrid');
            removeTableRow('gv_ItemGrid');
            $('#gv_InsItemGrid').show();
            $('#gv_ItemGrid').hide();
            for (var i = 0; i < gdata.Table.length; i++) {
                var style_td = "style='border: 0px solid #6f9dd9;padding-left:10px;'";
                var SlNo = $('#gv_InsItemGrid').children().find('tr').length;
                $('#gv_InsItemGrid').append("<tr style='border: 0px;' id=trid" + SlNo + ">"
                            + "<td><input type='radio' id='Chk_ItemGrid_" + SlNo + "'  class='checkbox1' name='AssetCode' onclick='ShowCommisionMode(this)' /></td>"
                            + "<td>" + gdata.Table[i].PolicyName + "</td>"
                            + "<td>" + gdata.Table[i].policyTypeName + "</td>"
                            + "<td>" + gdata.Table[i].PolicyNatureName + "</td>" //+ "</td>"                            
                            + "<td>" + gdata.Table[i].InsuranceCompany + "</td>"
                            + "<td " + st_hide + ">" + gdata.Table[i].PolicyID + "</td>"
                            + "<td  " + st_hide + ">" + gdata.Table[i].Policynatureid + "</td>"
                            + "<td  " + st_hide + ">" + gdata.Table[i].PolicyTypeID + "</td>"
                            + "<td  " + st_hide + ">" + gdata.Table[i].IssuingcompanyID + "</td>"
                            + "<td style='display:none'><input type='text' class='TextCls' readonly='true'  id='AsetCD_" + SlNo + "' value='" + gdata.Table[i].Asset_CD + "'/></td>"
                            + "</tr>");
            }
        }
    }
    else {
        if (gdata.Table.length > 0) {
            $('#gv_InsItemGrid').hide();
            $('#gv_ItemGrid').show();
            removeTableRow('gv_ItemGrid');
            removeTableRow('gv_InsItemGrid');
            for (var i = 0; i < gdata.Table.length; i++) {
                var style_td = "style='border: 0px solid #6f9dd9;padding-left:10px;'";
                var SlNo = $('#gv_ItemGrid').children().find('tr').length;
                $('#gv_ItemGrid').append("<tr style='border: 0px;' id=trid" + SlNo + ">"
                            + "<td><input type='radio' id='Chk_ItemGrid_" + SlNo + "' class='checkbox2' name='AssetCode' onclick='ShowCommisionMode(this)' /></td>"
                            + "<td>" + gdata.Table[i].Security_Code + "</td>"
                            + "<td>" + gdata.Table[i].Security_Name + "</td>"
                             + "<td " + st_hide + ">" + gdata.Table[i].sector_code + "</td>"
                            + "<td style='display:none'><input type='text' class='TextCls' readonly='true'  id='AsetCD_" + SlNo + "' value='" + gdata.Table[i].Asset_CD + "'/></td>"
                            + "</tr>");
            }
        }
    }
}
function ClearGrid() {
    removeTableRow('gv_InsItemGrid');
    removeTableRow('gv_ItemGrid');
    $('#gv_InsItemGrid').hide();
    $('#gv_ItemGrid').hide();
    //removeTableRow('grd_Chekbox');
    //removeTableRow('grd_InsGrid');
    

    removeTableRow('gv_OtherRIMSOtherSetup');
    $('#gv_OtherRIMSOtherSetup').append("<tr id=trid>"
           + "<td style='text-align:center;font-weight:bold;' colspan='9'>No data found</td>"
           + "</tr>");
}
function HideFields(Ctrl) {
    $('#div_Grid').slideDown('slow');
    $('#div_Fields').slideUp('slow');
    ClearGrid();
    $('#Txt_EffectFrom').val('');
    $('#Drp_Asset').val(0);
}
function ShowCommisionMode(objt) {
    try {
        $('#div_Payble').hide();
        $('#div_Recievable').hide();
        $('#div_Commission').hide();
        removeTableRow('grd_Commission');  
        removeTableRow('grd_Recievable');        
        removeTableRow('grd_Payble');       
        $("#SelectData").slideDown("slow")
        ClearFields();
        var dmode=$('#Drp_Asset').val()
        if (dmode == 6) {
            var tr = $(objt).parent().parent().get(0).getElementsByTagName('td');
            $('#hdn_PolicyID').val(tr[5].innerHTML);
            $('#hdn_PolicyTypeID').val(tr[7].innerHTML);
            $('#hdn_PolicyNatureID').val(tr[6].innerHTML);
            $('#hdn_IssuingcompanyID').val(tr[8].innerHTML);
           
        }
        else {
            var tr = $(objt).parent().parent().get(0).getElementsByTagName('td');
            $('#hdn_Security_Code').val(tr[1].innerHTML);
            $('#hdn_Sector_Code').val(tr[3].innerHTML);
            
        }
        var res = objt.id;   
        res = res.substring(13);
        var cdvalue = $('#AsetCD_' + res).val();
        $('#hdnSecCode').val(cdvalue);
        $('#DrpCommType').empty();
        PopulateDropdownControls_WithParams('DrpCommMode', '../RIMS/RIMS_RateCard_Setup.aspx/GetDDLPayMode_CommType', "{DMLMode : '1', Pay_Mode : '', AssetCD :'" + cdvalue + "'}");
       
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function FillCommisionType(objt) {
    try {
        if (parseInt(objt) > 0) {
            var seccode = $('#hdnSecCode').val();
            var paymode = objt;
            PopulateDropdownControls_WithParams('DrpCommType', '../RIMS/RIMS_RateCard_Setup.aspx/GetDDLPayMode_CommType', "{DMLMode : '2', Pay_Mode : '" + paymode + "', AssetCD :'" + seccode + "'}");
        }
        else {
            $('#DrpCommType').empty();
            $('#DrpCommType').each(function () {
                var option = $("<option />");
                option.attr("value", '0').text('NoDataFound');
                $('#DrpCommType').append(option);

            });
        }
    }
    catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function ClearFields() {   
    $("#DrpCommMode").prop('selectedIndex', 0);
    $("#DrpCommType").prop('selectedIndex', 0);
    $('#TxtFromAmt').val('');
    $('#TxtToAmt').val('');
    $('#TxtCommValue').val('');    
    $("#DrpCommFlow").prop('selectedIndex', 0);
    $("#div_commflow").hide();
    $('#txtCommissionflow').val('');
    $('#DrpCommType').empty();
}
function AddData() {
    if (ValidateDataBeforeSearch() == false) {
        return false;
    }
    if (DiffNum() == false) {
        return false;
    }
   
    var CommMode = $("#DrpCommMode option:selected").text();
    var CommissionType = $("#DrpCommType option:selected").text();
    if (CommMode == "Payable") {      
        if (DiffMax('grd_Payble',CommissionType) == false) {
            return false;
        }
        BindAllRecPayCommGrid('div_Payble', 'grd_Payble');
        CountPay++;     
      

    }
    if (CommMode == "Receivable") {    
        if (DiffMax('grd_Recievable',CommissionType) == false) {
            return false;
        }
        BindAllRecPayCommGrid('div_Recievable', 'grd_Recievable');
        CountRec++;      
       
    }
    if (CommMode == "Commission") {                                
        if (DiffMax('grd_Commission',CommissionType) == false) {
            return false;
        }
        BindAllRecPayCommGrid('div_Commission', 'grd_Commission');
        CountComm++;       
    }   
    ClearFields();
    $('#DrpCommMode').focus();
    return false;


}
function SortGrid(grdname, tblname)
{
    var alldata = '{"GrdData":[';
    var gv = $('#' + grdname);
    var SlNo = $('#' + grdname).children().find('tr').length;
    var comtype = '';
    var listComtype = '';
    for (var i = 1; i < SlNo; i++) {
        var gv_row = gv.children().find('tr:not(:first)').get(i - 1).getElementsByTagName('td');
        if (comtype != gv_row[0].innerHTML) {
            if (listComtype.indexOf(gv_row[0].innerHTML)>0) {
            }
            else {
                comtype = gv_row[0].innerHTML;
                listComtype = listComtype + " , " + gv_row[0].innerHTML;
                alldata = alldata + '{"ComType":"' + gv_row[0].innerHTML + '"},';
            }
        }
    }
    alldata = alldata.substring(0, alldata.length - 1);
    alldata = alldata + ']}';
    var FlteredCommType = jQuery.parseJSON(alldata);
    var NoCom = FlteredCommType.GrdData.length;
    var SortedData = '{"SortedResult":[';
    for (var a = 0; a < NoCom; a++)
    {
        var GrdRec = $('#' + grdname).children().find('tr').length;
        var comtypedt = '';
        for (var i = 1; i < GrdRec; i++) {
            var gv_row = gv.children().find('tr:not(:first)').get(i - 1).getElementsByTagName('td');
            if (FlteredCommType.GrdData[a].ComType == gv_row[0].innerHTML) {
                comtypedt = comtypedt + '{"Commision_Type":"' + gv_row[0].innerHTML + '", "From_Amount":"' + gv_row[1].innerHTML + '", "To_Amount":"' + gv_row[2].innerHTML + '", "COM_Value":"' + gv_row[3].innerHTML + '", "COM_Basis":"' + gv_row[4].innerHTML + '","CommissionTypeID":"' + gv_row[5].innerHTML + '","COM_BasisID" :"' + gv_row[6].innerHTML + '","ID" :"' + gv_row[7].innerHTML + '"},';
            }
        }
        SortedData = SortedData + comtypedt;
    }
    SortedData = SortedData.substring(0, SortedData.length - 1);
    SortedData = SortedData + ']}';
    var Fresult = jQuery.parseJSON(SortedData);
    FinalBindAllRecPayCommGrid(grdname, Fresult.SortedResult);
    //return SortedData;
}
function FinalBindAllRecPayCommGrid(grid_ID, resultdt)
{
    var tr = "";
    if (grid_ID == "grd_Recievable") {
        tr = "trid1";
    }
    else if (grid_ID == "grd_Payble")
    {
        tr = "trid2";
    }
    var st1 = "style=display:none;";
    if (resultdt.length > 0) {
        removeTableRow(grid_ID);       
        for (var i = 0; i < resultdt.length; i++) {
            var id = parseInt(resultdt[i].ID);
            if (id > 0) {

            }
            var SlNo = $('#'+grid_ID).children().find('tr').length;
            $('#' + grid_ID).append("<tr style='border: 0px;' id=" + tr + i + ">"
                        + "<td>" + resultdt[i].Commision_Type + "</td>"
                        + "<td>" + resultdt[i].From_Amount + "</td>"
                        + "<td>" + resultdt[i].To_Amount + "</td>"
                        + "<td>" + resultdt[i].COM_Value + "</td>"                        
                        + "<td >" + resultdt[i].COM_Basis + "</td>"
                        + "<td style=display:none>" + resultdt[i].CommissionTypeID + "</td>"
                        + "<td style=display:none>" + resultdt[i].COM_BasisID + "</td>"
                        + "<td style=display:none>" + resultdt[i].ID + "</td>"
                        + "<td ><a id='a_Delete_" + i + "' onclick='DeleteRow(this);'><img id='img_Delete_" + i + "' alt='Delete' title='Delete' src='../Images/delete.jpg' /></a></td>"
                        + "<td style='display:none;'>" + i + "</td>"
                        + "<td style='display:none;'>" + tr + "</td>"                          
                        + "</tr>");
        }
    }
}
function DeleteRow(Ctrl) {
    try {      
     
         var tr = $(Ctrl).parent().parent().children().get(10).innerHTML;
        var i = Ctrl.id;
        i = i.substring(9);
         $('#'+tr + i).remove();     
        
    } catch (e) {
        ErrorLog(e);
        alert(ErrorMsg());
    }
}
function BindAllRecPayCommGrid(div_ID,grid_ID)
{
    var CommissionMode = $("#DrpCommMode option:selected").text();
    var Commision_Type = $("#DrpCommType option:selected").text();
    var CommissionTypeID = $("#DrpCommType").val();
    var From_Amount = $('#TxtFromAmt').val();
    var To_Amount = $('#TxtToAmt').val();
    var COM_Value = $('#TxtCommValue').val();
    var COM_Basis = '';
    var COM_BasisID = '';
    var ID = '0';
    var st1 = '';
   var dmode= $('#Drp_Asset').val();
   if (dmode == 6) {
       COM_Basis = $('#txtCommissionflow').val();
       st1 = "style=display:block";
       var COM_BasisID = $('#txtCommissionflow').val();
   }
   else {
       //COM_Basis = $('Drp_Asset').val();
      
       var ctype = $('#DrpCommType').val();
       if (dmode == 4) {
           if (ctype == "231") {
               COM_Basis = $("#DrpCommFlow  option:selected").text();
               COM_BasisID = $('#DrpCommFlow').val();
               st1 = "style=display:block";
           }
       }

       st1 = "style=display:none";
   }
    $('#'+div_ID).show();
    $('#' + grid_ID).append("<tr style='border: 0px;' id=trid>"
                              + "<td>" + Commision_Type + "</td>"
                              + "<td>" + From_Amount + "</td>"
                              + "<td>" + To_Amount + "</td>"
                              + "<td>" + COM_Value + "</td>"
                              + "<td >" + COM_Basis + "</td>"
                              + "<td style=display:none;>" + CommissionTypeID + "</td>"
                              + "<td style=display:none;>" + COM_BasisID + "</td>"
                              + "<td style=display:none;>" + ID + "</td>"
                              + "</tr>");
    CountComm++;   
    SortGrid(grid_ID, div_ID);
}
function Cancel() {
    $("#SelectData").slideUp("slow");
    ClearFields();
    ClearGrid();
    $('#DrpCommType').empty();
    $("#Div_ItemGrd").hide();
    $("#Drp_Asset").prop('selectedIndex', 0);
}
function DiffNum() {
    var FromAmount = parseInt($('#TxtFromAmt').val());
    var ToAmount = parseInt($('#TxtToAmt').val());
    if ((FromAmount) > (ToAmount)) {
        alert("FromAmount must be less than the ToAmount");
        $('#TxtFromAmt').val('');
        $('#TxtFromAmt').focus();
        return false;
    }
    if ((ToAmount) < (FromAmount)) {
        alert("ToAmount must be greater than the FromAmount");
        $('#TxtToAmt').val('');
        $('#TxtToAmt').focus();
        return false;
    }

}
function ValidateDataBeforeSearch() {
    var flag = true;

    var ddlcmMode = $('#DrpCommMode').val();
    if (ddlcmMode == '' || ddlcmMode == '0') {
        var $element = $('#DrpCommMode');
        $element.data("title", "").removeClass("error").tooltip("destroy");
        $element.tooltip("destroy").data("title", 'Please select Commission Mode').addClass("error").tooltip();
        flag = false;
    }
    else {
        var $element = $('#DrpCommMode');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    }
    var ddlcmType = $('#DrpCommType').val();
    if (ddlcmType == '' || ddlcmType == '0') {
        var $element = $('#DrpCommType');
        $element.data("title", "").removeClass("error").tooltip("destroy");
        $element.tooltip("destroy").data("title", 'Please select Commission Type').addClass("error").tooltip();
        flag = false;
    }
    else {
        var $element = $('#DrpCommType');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    }
    var txtFromAmt = $('#TxtFromAmt').val();
    if (txtFromAmt == '' ) {
        var $element = $('#TxtFromAmt');
        $element.data("title", "").removeClass("error").tooltip("destroy");
        $element.tooltip("destroy").data("title", 'Please Enter From Amount').addClass("error").tooltip();
        flag = false;
    }
    else {
        var $element = $('#TxtFromAmt');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    }
    var TxtToAmt = $('#TxtToAmt').val();
    if (TxtToAmt == '' ) {
        var $element = $('#TxtToAmt');
        $element.data("title", "").removeClass("error").tooltip("destroy");
        $element.tooltip("destroy").data("title", 'Please Enter To Amount').addClass("error").tooltip();
        flag = false;
    }
    else {
        var $element = $('#TxtToAmt');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    }
    var TxtCommValue = $('#TxtCommValue').val();
    if (TxtCommValue == '' ) {
        var $element = $('#TxtCommValue');
        $element.data("title", "").removeClass("error").tooltip("destroy");
        $element.tooltip("destroy").data("title", 'Please Enter Commission Value').addClass("error").tooltip();
        flag = false;
    }
    else {
        var $element = $('#TxtCommValue');
        $element.data("title", "").removeClass("error").tooltip("destroy");
    }
    var dmode = $('#Drp_Asset').val()
    if (dmode == 6) {
        var txtCommissionflow = $('#txtCommissionflow').val();
        if (txtCommissionflow == '') {
            var $element = $('#txtCommissionflow');
            $element.data("title", "").removeClass("error").tooltip("destroy");
            $element.tooltip("destroy").data("title", 'Please Enter Commission Flow Value').addClass("error").tooltip();
            flag = false;
        }
        else {
            var $element = $('#txtCommissionflow');
            $element.data("title", "").removeClass("error").tooltip("destroy");
        }
    }
    else {
        $('#div_commflow').hide();
        var ctype = $('#DrpCommType').val();
        if (dmode == 4) {
            if (ctype == "231") {
                var DrpCommFlow = $('#DrpCommFlow').val();
                if (DrpCommFlow == '' || DrpCommFlow == '0') {
                    var $element = $('#DrpCommFlow');
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                    $element.tooltip("destroy").data("title", 'Please select Commission Flow').addClass("error").tooltip();
                    flag = false;
                }
                else {
                    var $element = $('#DrpCommFlow');
                    $element.data("title", "").removeClass("error").tooltip("destroy");
                }
            }
            
        }
    }
    return flag;
}
function DiffMax(grdname, CommType) {
    var ToValue=''
    var GrdRec = $('#' + grdname).children().find('tr').length;
    var gv = $('#' + grdname);
    for (var i = 1; i < GrdRec; i++) {
        var gv_row = gv.children().find('tr:not(:first)').get(i - 1).getElementsByTagName('td');
        if (CommType == gv_row[0].innerHTML) {
             ToValue = gv_row[2].innerHTML;
        }        
    }
    var sec_valuepre = $('#hdnSecCode').val();
    var CommMode = $("#DrpCommMode option:selected").text();
    
        if (CommMode == 'Payable') {
      
                if (CountPay > 0) {                    
                    if(ComPAreNum(ToValue)==false)
                    return false;
                }            
        }
        if (CommMode == 'Receivable') {            
            if (CountRec > 0) {                
                if (ComPAreNum(ToValue) == false)
                    return false;
            }
        }            
            if (CommMode == 'Commission') {              
                    if (CountRec > 0) {
                        if (ComPAreNum(ToValue) == false)
                            return false;
                    }      
           }
}
function ComPAreNum(ToValue) {
    var FromAmount = $('#TxtFromAmt').val();
    if (parseInt(FromAmount) <= parseInt(ToValue)) {
        alert("FromAmount must be greater than the Previous ToAmount");
        $('#TxtFromAmt').val('');
        $('#TxtFromAmt').focus();
        return false;
    }
}
function GenerateJoshnForSubGrid(grdname, hdnname, tblname) {
    var alldata = '{"' + tblname + '":[';
    var gv = $('#' + grdname);
    var SlNo = $('#' + grdname).children().find('tr').length;
    if (SlNo > 1) {
        for (var i = 1; i < SlNo; i++) {
            var gv_row = gv.children().find('tr:not(:first)').get(i - 1).getElementsByTagName('td');
            alldata = alldata + '{"Commision_Type":"' + gv_row[5].innerHTML + '", "From_Amount":"' + gv_row[1].innerHTML + '", "To_Amount":"' + gv_row[2].innerHTML + '", "COM_Value":"' + gv_row[3].innerHTML + '", "COM_Basis":"' + gv_row[6].innerHTML + '", "ID":"' + gv_row[7].innerHTML + '"},';

        }
        alldata = alldata.substring(0, alldata.length - 1);
        alldata = alldata + ']}';
    }
    else { alldata = '';}
    $('#' + hdnname).val(alldata);
}
function GetDataForjson()
{
    GenerateJoshnForSubGrid("grd_Recievable", "hdn_Recievable", "RIMS_RateCard_Setup_Details");
    GenerateJoshnForSubGrid("grd_Payble", "hdn_Payble", "RIMS_RateCard_Setup_Details");
    GenerateJoshnForSubGrid("grd_Commission", "hdn_Commission", "RIMS_RateCard_Setup_Details");

}
function GetDataForSave() {
    if (RadioDb() == false)
        return false
    GetDataForjson();
}
function ChngCommType(ctrl) {
   
    var dmode=$('#Drp_Asset').val()
    if (dmode == 6) {
        $('#div_commflow').show();
        $('#divdrpflow').hide();
        $('#divtxtflow').show();
    }
    else {
        $('#div_commflow').hide();
       
        if (dmode == 4) {
            if (ctrl == "231") {
                $('#div_commflow').show();
                $('#divdrpflow').show();
                $('#divtxtflow').hide();
            }
            if (ctrl == "230") {
             
                $('#lblToAmt').html("To Count");
                $('#lblFromAmt').html("From Count");
            }
            else {
               
                $('#lblToAmt').html("To Value");
                $('#lblFromAmt').html("From Value");
            }
        }
    }
    return false;
}
function RadioDb() {
    try {
       
        var dmode = $('#Drp_Asset').val()
        if (dmode == 6) {
            var a = $("#gv_InsItemGrid").find("input:radio").is(':checked');
            if (a == false) {
                alert("Please select at least one Policy");
                return false;
            }
        }
        else {
            var a = $("#gv_ItemGrid").find("input:radio").is(':checked');
            if (a == false) {
                alert("Please select at least one SecurityCode");
                return false;
            }
        }

    } catch (e) {
        ErrorLog(e); alert(ErrorMsg());
    }

    
   
}