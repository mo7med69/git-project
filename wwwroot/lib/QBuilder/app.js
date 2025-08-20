$(document).ready(function () {


	//var options = {
	//	allow_empty: true,

	//	filters: [
	//		{
	//			id: 'Party_Number',
	//			label: 'Party_Number',
	//			type: 'string',
	//			// optgroup: 'core',
	//			default_value: '1234663',
	//			size: 30,
	//			unique: true
	//		},
	//		{
	//			id: 'TOTAL_WIRE_C_AMT',
	//			label: 'TOTAL_WIRE_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: '1',
	//			size: 30,
	//			unique: true
	//		},
	//		{
	//			id: 'TOTAL_WIRE_D_AMT',
	//			label: 'TOTAL_WIRE_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: '1',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_CASH_C_AMT',
	//			label: 'TOTAL_CASH_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: '2',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_CASH_D_AMT',
	//			label: 'TOTAL_CASH_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 'gaur',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_CLEARINGCHECK_C_AMT',
	//			label: 'TOTAL_CLEARINGCHECK_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 'gaur',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_CLEARINGCHECK_D_AMT',
	//			label: 'TOTAL_CLEARINGCHECK_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 'gaur',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_INHOUSECHECK_C_AMT',
	//			label: 'TOTAL_INHOUSECHECK_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 10.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_INTERNALTRANSFER_C_AMT',
	//			label: 'TOTAL_INTERNALTRANSFER_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 14.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_LOANDISBURSEMENT_C_AMT',
	//			label: 'TOTAL_LOANDISBURSEMENT_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 'gaur',
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_MNGRSCHCKISSNCE_D_AMT',
	//			label: 'TOTAL_MNGRSCHCKISSNCE_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_MISC_C_AMT',
	//			label: 'TOTAL_MISC_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_MISC_D_AMT',
	//			label: 'TOTAL_MISC_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_SALARYCREDIT_C_AMT',
	//			label: 'TOTAL_SALARYCREDIT_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_TDREDEMPTION_C_AMT',
	//			label: 'TOTAL_TDREDEMPTION_C_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}, {
	//			id: 'TOTAL_TTISSUANCE_D_AMT',
	//			label: 'TOTAL_TTISSUANCE_D_AMT',
	//			type: 'double',
	//			// optgroup: 'core',
	//			default_value: 0.2,
	//			size: 30,
	//			unique: true
	//		}
	//	]
	//};


	//start Getting The Current User
	//var Loged_user = "";
	//function GetTheCurrentLoggedUser() {
	//	var obj;
	//	fetch('http://aml-test.datagearbi.local/SASComplianceSolutionsMid/rest/users/current?applicationNames=aml&relationships=applicationCapabilities,queues')
	//		.then(res => res.json())
	//		.then(data => obj = data.userId)
	//		.then((data) => checkAuth(obj));

	//	function checkAuth(curAut) {
	//		Loged_user = curAut;
	//		//console.log(Loged_user);

	//	}
	//}
	//GetTheCurrentLoggedUser();
	//End
	var options = {};
	$.ajax({
		url: "/AutoRules/GetQueryBuilderParams",
		success: (res) => {
			//console.log(res);
			//options = {
			//	allow_empty: true,

			//	filters: res
			//};
			//console.log(JSON.stringify(res));
			options.allow_empty = true;
			options.filters = res;
			$('#builder').queryBuilder(options);
			console.log(options);

		}
	})

	

	$('.parse-json').on('click', function () {
		// var res =  JSON.stringify($('#builder').queryBuilder('getSQL','question_mark'));
		//console.log(JSON.stringify($('#builder').queryBuilder('getMongo')));
		//console.log($('#builder').queryBuilder('getMongo').sql);
		var jsonObj = $('#builder').queryBuilder('getRules');
		console.log(jsonObj);

		var query = '';
		jsonRes = $('#builder').queryBuilder('getRules');

		if (jsonRes['rules'].length == 1) {
			query += jsonRes['rules'][0]['id'] + ' ' + jsonRes['rules'][0]['operator'] + ' ' + jsonRes['rules'][0]['value'];
			query += ' ';
		}

		//console.log(list);
		// console.log(jsonRes['rules'][index]['id']);
		console.log(jsonRes['rules'].length);
		if (jsonRes['rules'].length > 1) {

			for (var index in jsonRes['rules']) {
				if (jsonRes['rules'].length - 1 == index) {
					query += jsonRes['rules'][index]['id'] + ' ' + jsonRes['rules'][index]['operator'] + ' '
						+ jsonRes['rules'][index]['value'];
				}
				else {
					query += jsonRes['rules'][index]['id'] + ' ' + jsonRes['rules'][index]['operator'] + ' '
						+ jsonRes['rules'][index]['value'];
					query += ' ,AND ';


				}


			}
			console.log(JSON.stringify(jsonRes));
		}



		// $('#append').append('<h4> '+query+ '</h4>');
		//Send Rules to database
		/*
		*/
		function SendRulesToDB(query) {
			
			$.ajax({
				type: "POST",
				url: "/AML_ANALYSIS/RulesData",
				data: {
					query: query,
					tableName: "ART_AML_ANALYSIS_VIEW"
					
				},
				success: function (res) {
					window.location.reload();
				}
			});
			//fetch('/AML_ANALYSIS/RulesData', {
			//	method: 'POST',
			//	headers: {
			//		'content-type': 'application/json'
			//	},
			//	body: 
			//		{
			//			"query": query,
			//			"tableName": "FSC_AML_ANALYSIS",
			//			"userId": "islam"
			//		}
				

			//})
			//	.then(response => {
			//		console.log(JSON.stringify(response.json()))

			//	})
			//	.catch(err => {
			//		console.log(JSON.stringify(err.json()))
			//	});
		};

		SendRulesToDB(query);
		// Gender equal to "Male" AND Age equal to "50" AND Favorite city equal to "Cairo" AND Gender greater than "60"

		$("#gridRules").data("kendoGrid").dataSource.read();
		$("#gridRules").data("kendoGrid").refresh();

	});

});


