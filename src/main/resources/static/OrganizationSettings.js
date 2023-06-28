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
			console.log(data[0]);
			var depId;
			var depName;
			for(var i = 0; i < data.length; i++){
				depId = data[i].id;
				depName = data[i].name;
				var depDiv = `
					<div class="depDiv" id="${depId}"> 
						<h2>${depName}</h2>
						
					
				`
				for(var j = 0; j < data[i].users.length; j++){
					var isManager = data[i].users[j].role.name;
					console.log(isManager);
					if(isManager === 'ROLE_MANAGER'){
						var managerId = data[i].users[j].user.id;
						var managerFirst = data[i].users[j].user.firstName;
						var managerLast = data[i].users[j].user.lastName;
						
						var managerDiv = `
							<div class="managerDiv" id="${managerId}">${managerFirst} ${managerLast} </div>
						`
						depDiv += managerDiv;
					}
					
				}
				depDiv += `</div>`
				$('#departmentsDiv').append(depDiv);
			}
			
		});
		$(".organization-settings-view").show();
		//th:href="@{/orgsettings}"
	});

});