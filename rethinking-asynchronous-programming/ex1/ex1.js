function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

function outputResult() {
	for(var i = 0; i<resultOrder.length; i++) {
		if (result[resultOrder[i]]) {
			if (!resultSent[i]) {
				output(result[resultOrder[i]]);
				resultSent[i] = true;
			}
		} else {
			return;
		}
	}
	output("Complete!");
}
// **************************************
// The old-n-busted callback way
var resultOrder = ["file1", "file2", "file3"], result = {}, resultSent = [];
function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		result[file] = text;
		outputResult();
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
