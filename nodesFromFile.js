var fs = require("fs");

var createNetworkFromCommandLineArguments = function() {
	var getParamStringsAsJson = function(arr) {
		var params = {};
		var paramsArray = arr.slice(2);
		paramsArray.forEach((e, i, a) => {
			var pName = e.split("=")[0];
			var pValue = e.split("=")[1];
			params[pName] = pValue;
		});
		return params;
	};

	var processCSV = function(fileName, delimiter, colSpec) {
		var fileAsArray = fs.readFileSync(params.file).toString().split("\n");

		var headers = fileAsArray[0].split(params.delimiter);
		var data = fileAsArray.slice(1);
		var csvAsJsonArray = data.map((e, i, a) => {
			var row = e.split(delimiter);
			var item = {};
			headers.forEach((ee, ii, aa) => {
				if (colSpec[ii] == "number") item[headers[ii]] = Number(row[ii])
				else item[headers[ii]] = row[ii];  //useColSpec to interpret row[ii]
			});
			return item;
		});
		return csvAsJsonArray;
	};

	var createNodesBasedOn = function(arr, key, type) {
		var map = {};
		arr.forEach((e, i, a) => {
			map[e[key]] = {
				id: e[key],
				type: type,
				data: e
			};
		});
		return map;
	};

	var createEdgesBasedOn = function(arr, fromKey, toKey, nodesJson, nodeType, edgeType) {
		var edges = arr.map((e, i, a) => {
			if (nodesJson[e[fromKey]] == undefined) nodesJson[e[fromKey]] = {  //SIDEFFECT
				id: e[fromKey],
				type: nodeType,
				data: {}  // assumtion: no link data on row
			};
			return {
				type: edgeType,			
				from: e[fromKey],
				to: e[toKey],
				data: {}
			};
		});
		return edges
	};
	var network;
	var params = getParamStringsAsJson(process.argv);
	var config = JSON.parse(fs.readFileSync(params.config).toString());
	var newCSV = processCSV(params.file, params.delimiter,config.colSpec);
	var nodesJson = createNodesBasedOn(
			newCSV, 
			config.toKey, 
			config.type
	);
	var edgesJson = createEdgesBasedOn(
		newCSV, 
		config.fromKey, 
		config.toKey, 
		nodesJson, 
		config.type, 
		config.edgeType
	);
	var network = {
		nodes: nodesJson,
		edges: edgesJson
	};
	return network;
};

var network = createNetworkFromCommandLineArguments();
console.log(network);
