
$(document).ready(function() 
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
}); 
// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validatePaymentForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidpIDSave").val() == "") ? "POST" : "PUT"; 
 $.ajax( 
 { 
 url : "PaymentsAPI", 
 type : type, 
 data : $("#formItem").serialize(), 
 dataType : "text", 
 complete : function(response, status) 
 { 
 onPaymentSaveComplete(response.responseText, status); 
 } 
 }); 
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
$("#hidpIDSave").val($(this).data("pid")); 
 $("#CusID").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#pType").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#pAmount").val($(this).closest("tr").find('td:eq(2)').text()); 
 //$("#itemDesc").val($(this).closest("tr").find('td:eq(3)').text()); 
});

$(document).on("click", ".btnRemove", function(event) 
{ 
 $.ajax( 
 { 
 url : "PaymentsAPI", 
 type : "DELETE", 
 data : "pID=" + $(this).data("pid"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onPaymentDeleteComplete(response.responseText, status); 
 } 
 }); 
});
// CLIENT-MODEL================================================================
function validatePaymentForm() 
{ 
// CODE
if ($("#CusID").val().trim() == "") 
 { 
 return "Insert CustomerID Code."; 
 } 
// NAME
if ($("#pType").val().trim() == "") 
 { 
 return "Insert Payment type."; 
 } 
// PRICE-------------------------------
if ($("#pAmount").val().trim() == "") 
 { 
 return "Insert Amount."; 
 } 
// is numerical value
var tmpPrice = $("#pAmount").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
 { 
 return "Insert a numerical value for Amount."; 
 } 
// convert to decimal price
 $("#pAmount").val(parseFloat(tmpPrice).toFixed(2)); 
// DESCRIPTION------------------------

return true; 
}

function onPaymentSaveComplete(response, status) 
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while saving."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 } 
 $("#hidpIDSave").val(""); 
 $("#formItem")[0].reset(); 
}


function onPaymentDeleteComplete(response, status) 
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}




