var fs = require("fs");
var http = require("http");
var url = require("url");

var USER = "admin";
var PASSWORD = "admin";

var file = process.argv.filter( (e, i, a) => {
	var arg = e.split("=");
	if (arg[0] == "ddl") return true
	else return false	
})[0].split("=")[1];

console.log("ddl file=",file);

var ddl = fs.readFileSync(file).toString().split("\n");
for(i in ddl) {
    console.log(ddl[i]);
}

var ddl = ddl.filter((e, i, a) => {
	return !(e.match("^\s*$")||(e.match("\/\/.*")));
});

console.log(ddl);

//  set up http connection and function

var prepareCommand = function(command) {
	var options = {
		method: "POST",
		port: 2480,
		host: "127.0.0.1",
		auth: USER + ":" + PASSWORD,
		path: `/command/MOH%20v1.0/sql/${encodeURIComponent(command)}`,
		headers: {
			"Accept": "application/json"		}
	};

	console.log("Day dreaming! "+JSON.stringify(options));
	return options;

}

//  loop through ddl in async series style

var process1 = function(head, tail){
	if (tail.slice(1).length == 0) console.log("stop")
	else {
		console.log("processing", head);
		console.log("------");
		var reqDream = http.request(prepareCommand(head), (resDream) => {
		var responseBody = [];
		console.log(`Back with ${resDream.statusCode}`);  // example of string templates
		resDream.on('data', (chunk) => {
			console.log(`Got ${chunk.length}`);
			responseBody.push(chunk);
		});
		resDream.on('end', () => {
			responseBody.json = JSON.parse(Buffer.concat(responseBody).toString());
			console.log(responseBody.json);
			process1(tail[0], tail.slice(1));
//			res.send(url.parse(req.url));
		});
	});

	reqDream.end();
	}	
}

//ddl.map()
process1(ddl[0],ddl.slice(1));

//console.log(ddl.slice(1));