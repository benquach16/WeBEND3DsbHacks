//TODO: Make this dynamic
var TABLE_NAME = "exavqxxu3s";
var lastID = 0;

var listCommits = [];

function checkNewCommits()
{
	receiveCommit(lastID + 1 );
}

function checkOldCommits(newID)
{
	for(var curID = lastID + 1; curID < newID; curID++)
	{
		receiveCommit(curID);
	}
}

function stringToCommit(msg)
{
	return msg.split("&");
}

function removeCommit(ID)
{
	$.ajax({
		url: "http://10.143.6.164:80/SBHacksClient/server/removeRow.php",       
		type: "POST",
		data: {
			id: ID,
			tableName: TABLE_NAME
		}//, 
		//error: Utilities.Logger.displayAjaxError
	}).done(function( msg ) {
		//alert(msg);
		for(var i = listCommits.length - 1; i >= 0; i--)
		{
			if(listCommits[1] == ID)
			{
				listCommits.splice(i, 1);
				//alert(listCommits);
				break;
			}
		}
	});
}

function receiveCommit(ID)
{
	$.ajax({
		url: "http://10.143.6.164:80/SBHacksClient/server/pullData.php",       
		type: "POST",
		data: {
			id: ID,
			tableName: TABLE_NAME
		}//, 
		//error: Utilities.Logger.displayAjaxError
	}).done(function( msg ) {
		//alert(msg);
		if(msg)
		{
			listCommits.push( stringToCommit(msg) );
			//decodeCommit(listCommits[listCommits.length-1]);
		}
	});
}

function sendCommit(_cmd, _verts1, _verts2, _func)
{
   $.ajax({
		url: "http://10.143.6.164:80/SBHacksClient/server/array_edit.php",       
		type: "POST",
		data: {
			cmd: _cmd,
			verts1: _verts1,
			verts2: _verts2,
			func: _func,
			tableName: TABLE_NAME
		}//, 
		//error: Utilities.Logger.displayAjaxError
	}).done(function( msg ) {
		//alert(msg);
		checkOldCommits(msg);
	});
}


//Function calls
function translatePoints(vertices, translation, selectedGeometry)
{
	var pointsString = "";
	if(vertices == '*')
	{
		pointsString = "*";
	}
	else
	{
		for(var i = 0; i < vertices.length; i++)
		{
			pointsString += "" + vertices[i] + ", ";
		}
		pointsString = pointsString.substr(0,pointsString.length-1);
	}

	var distanceString = "" + translation.x + ',' + translation.y + ',' + translation.z;
	//alert(pointsString + ", " + distanceString);
	
	sendCommit("TRANSLATE_POINTS", pointsString, distanceString, selectedGeometry);
}

function scalePoints(vertices, scale, selectedGeometry)
{
	var pointsString = "";
	if(vertices == '*')
	{
		pointsString = "*";
	}
	else
	{
		for(var i = 0; i < vertices.length; i++)
		{
			pointsString += "" + vertices[i] + ", ";
		}
		pointsString = pointsString.substr(0,pointsString.length-1);
	}
	
	var scaleString = "" + scale.x + ',' + scale.y + ',' + scale.z;
	//alert(pointsString + ", " + distanceString);
	
	sendCommit("SCALE_POINTS", pointsString, scaleString, selectedGeometry);
}

function rotatePoints(vertices, rotation, selectedGeometry)
{
	var pointsString = "";
	if(vertices == '*')
	{
		pointsString = "*";
	}
	else
	{
		for(var i = 0; i < vertices.length; i++)
		{
			pointsString += "" + vertices[i] + ", ";
		}
		pointsString = pointsString.substr(0,pointsString.length-1);
	}
	
	var rotationString = "" + rotation.x + ',' + rotation.y + ',' + rotation.z;
	//alert(pointsString + ", " + distanceString);
	
	sendCommit("SCALE_POINTS", pointsString, rotationString, selectedGeometry);
}

function decodeCommit(commit)
{
	var pointList = [];
	if(commit[2] == "TRANSLATE_POINTS" || "SCALE_POINTS" || "ROTATE_POINTS")
	{
		pointList = commit[3].split("|");

		var translation = commit[4].split(",");
		//alert(pointList + ", " + translation);
		var distanceString = "" + translation.x + ',' + translation.y + ',' + translation.z;
		
		return [commit[2], pointList, translation, commit[5]];
	}

	var pointsString = "";
	for(var i = 0; i < vertices.length; i++)
	{
		pointsString = "" + vertices[i] + ", ";
	}
	pointsString = pointsString.substr(0,pointsString.length-1);

	var distanceString = "" + translation.x + ',' + translation.y + ',' + translation.z;
	//alert(pointsString + ", " + distanceString);
	
	sendCommit("TRANSLATE_POINTS", pointsString, distanceString, selectedGeometry);
}

