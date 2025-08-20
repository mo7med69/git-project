$(document).ready(function () {


	function GetAllRules() {
		$.ajax({
			url: 'http://aml-test.datagearbi.local:8086/datagear-aml/aml/queries',
			success: function (e) {
				var dt = $('#table_id').DataTable();

				for (var i = 0; i < e.length; i++) {
					if (e[i]['outputReadable'] != null) {
						if (e[i]['active'] === 1) {
							dt.row.add([e[i]['outputReadable'], e[i]['userId'], e[i]['createdDate'], '<label class="switch"><input type="checkbox" id = ' + e[i]['ruleId'] + '  onclick="Change(' + e[i]['active'] + ',' + e[i]['ruleId'] + ')" checked > <span class="slider"   ></span></label>']).draw(false);
						} else {
							dt.row.add([e[i]['outputReadable'], e[i]['userId'], e[i]['createdDate'], '<label class="switch"><input type="checkbox" id = ' + e[i]['ruleId'] + ' onclick="Change(' + e[i]['active'] + ',' + e[i]['ruleId'] + ')" > <span class="slider"   ></span></label>']).draw(false);
						}
					}
				}
			},
			dataType: 'JSON'
		});

	}

	GetAllRules();
});


function Change(active, rule_id) {
	// Send the update request here and refresh page
	//console.log(active);
	//console.log(rule_id);
	var changeActiveDb = null;
	if (active === 1) {

		changeActiveDb = 0;

	}
	else {

		changeActiveDb = 1;
	}
	fetch('http://aml-test.datagearbi.local:8086/datagear-aml/aml/queries/rules/' + rule_id + '', {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(
			{
				"Active": changeActiveDb
			}
		)

	})
		.then(response => {
			console.log(JSON.stringify(response.json()));
			//console.log('success');
		})
		.catch(err => {
			console.log(JSON.stringify(err.json()));
		});

}



