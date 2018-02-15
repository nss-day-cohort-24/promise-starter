"use strict";

var Legos = {};

	let legoItems = [];

	let parseData = (data) => {
		data.LegoColorss.forEach( (element) => {
			legoItems.push(element);
		});
		return legoItems;
	};

Legos.getLegos = () => {
	return legoItems;
};

Legos.loadLegos = () => {
   return new Promise( (resolve, reject) => {
      let request = new XMLHttpRequest();
      request.onload = function (){
         if(request.status === 200){
            //sucess
            let data = JSON.parse(request.responseText);
            // console.log("data", data);
            // console.log("new data", parseData(data));
            resolve(parseData(data));
            //default
            // resolve(request.responseText);
         } else{
            //something went wrong
            reject(new Error("XMLHttpRequest Error ", request.statusText));
         }
      };
      request.open('GET', "./lego-colors.json");
      request.send();
   });
};

module.exports = { Legos };