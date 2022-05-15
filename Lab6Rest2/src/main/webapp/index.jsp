<%@page import="model.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
if (request.getParameter("pID") != null) 
{ 
 Payment payObj = new Payment(); 
 String stsMsg = ""; 
//Insert--------------------------
if (request.getParameter("hidpIDSave") == "") 
 { 
 stsMsg = payObj.insertPay( 
 request.getParameter("cusID"), 
 request.getParameter("pType"), 
 request.getParameter("pAmount")); 
 } 
else//Update----------------------
 { 
 stsMsg = payObj.updatePay(request.getParameter("hidpIDSave"), 
 request.getParameter("cusID"), 
 request.getParameter("pType"), 
 request.getParameter("pAmount")
 ); 
 } 
 session.setAttribute("statusMsg", stsMsg); 
} 
//Delete-----------------------------
if (request.getParameter("hidpIDDelete") != null) 
{ 
 Payment payObj = new Payment(); 
 String stsMsg = 
		 payObj.deletePay(request.getParameter("hidpIDDelete")); 
 session.setAttribute("statusMsg", stsMsg); 
}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payments Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/items.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>Payment Management V10.1</h1>
<form id="formItem" name="formItem">
 CustomerID: 
 <input id="cusID" name="cusID" type="text" 
 class="form-control form-control-sm">
 <br> Payment type: 
 <input id="pType" name="pType" type="text" 
 class="form-control form-control-sm">
 <br> Amount: 
 <input id="pAmount" name="pAmount" type="text" 
 class="form-control form-control-sm">
 
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidpIDSave" 
 name="hidpIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divItemsGrid">
 <%
 Payment payObj = new Payment(); 
  out.print(payObj.readPay());
 %>
</div>
</div> </div> </div> 
</body>
</html>
