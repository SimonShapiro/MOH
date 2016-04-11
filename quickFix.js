var Node = function(type, id, data, model) {
	this.baseType = "Node";
	this.type = type;
	this.id = id;
	if (data == undefined) this.data = {}
	else this.data = data;
	model.add(this)
}
var Edge = function(type, fromNode, toNode, data) {
	this.baseType = "Edge";
	this.type = type;
	this.from = fromNode;
	this.to = toNode;
	if (data == undefined ) this.data = {}
	else this.data = data;
}
var Model = function() {
	this.nodes = [];
	this.edges = [];
	this.add = function(node) {
		this.nodes.push(node);
		return this;
	}
	this.connect = function(edge) {
		this.edges.push(edge);
		return this;
	}
}

// =============== Information models starts here ===================
var OrgUnit = function(model, id, data) {
	var node = new Node("OrgUnit", id, data, model);
	return node
}
var OrgUnit_CONNECTS_OrgUnit = function(fromOrgUnit, toOrgUnit, data) {
	var edge = new Edge("CONNECTS", fromOrgUnit, toOrgUnit, data);
	return edge
}
var FrontToBackProcess = function(model, id, data) {
	var node = new Node("FrontToBackProcess", id, data, model);
	return node
}
var OrgUnit_RESPONSIBLE_FOR_FrontToBackProcess = function(fromOrgUnit, toFrontToBackProcess, data) {
	var edge = new Edge("RESPONSIBLE_FOR", fromOrgUnit, toFrontToBackProcess, data);
	return edge
}

// =============== Construct model with content below ==============
MOH = new Model();

var barcPLC 	= new OrgUnit 				(MOH, "BPLC", 			{name: "Barclays PLC"});
var barcBPLC 	= new OrgUnit 				(MOH, "BBPLC", 			{name: "Barclays Bank PLC"});
var PCB 		= new OrgUnit 				(MOH, "PCB", 			{name: "Private and Corporate Bank"});
var ftb_pcb_001 = new FrontToBackProcess 	(MOH, "ftb_pcb_001", 	{name: "Apply for unsecured loan"});

MOH.connect(new OrgUnit_CONNECTS_OrgUnit					(barcPLC, 	barcBPLC))
   .connect(new OrgUnit_CONNECTS_OrgUnit					(barcBPLC, 	PCB))
   .connect(new OrgUnit_RESPONSIBLE_FOR_FrontToBackProcess	(ftb_pcb_001, 		ftb_pcb_001));
//above should create an error condition
console.log(MOH.nodes.length, MOH.edges.length);
console.log(MOH.nodes);
console.log(MOH.edges);

