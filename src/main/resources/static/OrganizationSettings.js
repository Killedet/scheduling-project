$(document).ready(function(){
	
	$('#organization-settings-click-to-start').click(function(){
		var orgInfo ={};
		/*orgInfo['organizationId'] = 1;
		orgInfo['organizationName'] = "testorg";*/
		orgInfo.organizationId = 1;
		orgInfo.organizationName = "testorg";
		var orgDto = {};
		orgDto["orgDto"] = orgInfo;
		$.ajax({
    		url: 'http://localhost:8080/departments',
    		type: 'POST',
    		contentType: "application/json",
    		data: JSON.stringify(orgInfo),
    		dataType:'json'
    		
		}).then(function(data){
			console.log(data);
			$('#departmentsDiv').append(data);
		});
		$(".organization-settings-view").show();
		//th:href="@{/orgsettings}"
	});

});