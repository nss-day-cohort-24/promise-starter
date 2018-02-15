"use strict";

console.log("main.js");

let db = require("./fetch-legos");

let greetingPromise = () => {
	new Promise( (resolve, reject) => {
		setTimeout( () => {
			resolve("World");
		}, 3000);
	}).then((resolve) => {
		console.log("resolve", resolve);
	});
};

greetingPromise();
console.log("Hello");












let showItems = (legosData) => {
	let legoDisplay = document.getElementById("lego-display");

	legosData.forEach( (lego) => {
		let legoBlock = buildLego(lego);
		legoDisplay.innerHTML += legoBlock;
	});
};

let buildLego = (lego) => {
	//building a string to create the visual display

	//each seperated by comma
	let block = "",
		wrapper = `<section class="block-wrapper" style="border: 2px solid #000000; background-color:#${lego.ColorHex}">`,
		title = `<h3>Name: ${lego.LegoName}</h3>`,
		years = `<div class="block-years">Manufactured ${lego.YearFrom} - ${lego.YearTo}</div>`;
		// image = `<div class="card-img" style="background-image: url('images/${car.image}')"></div>`,
      let link = lego.ColorstreamLinkImage;
		if (link){
			 block += `<a href="${link}" target="_blank">${wrapper + title + years}</section></a>`;
		}else{
			block += `${wrapper + title + years}</section>`;
		}
  	return block;
};


// // //version 1
// let colorPromise = db.Legos.loadLegos()
// // console.log("colorPromise", colorPromise);
// .then(
//  	(resolve) => {
//  		//do some more stuff
//  		let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"};
//  		resolve.push(newItem);
//  		showItems(resolve);
//  	},
//  	(reject) => {
//  		console.error("OOPS", reject);
//  		//do something else here - backup plan
//  	});

// // //version 2 with additional .then

let colorPromise = db.Legos.loadLegos()
.then(
	(resolve) => {
		let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"};
  		resolve.push(newItem);
  		return resolve;
	},
	(reject) => {
		console.log("OOPS", reject);
		//backplan();
	}).then(
	(resolve) => {
		console.log("One for the road", resolve);
		showItems(resolve);
	},
	() => {
		//default to catch anthying else
		console.log("there was an error somewhere");
	});

// // //promise All

var p1 = Promise.resolve("I don't like peas");
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo');
});

Promise.all([p3, p2, p1])
.then(
	(resolve) => {
		console.log("resolve values", resolve);
	},
	(reject) => {
		console.log("reject", reject);
	});


// // //Promise race
// // var p11 = new Promise((resolve, reject) => {
// // 	setTimeout(resolve, 1000, "one");
// // });

// // var p22 = new Promise((resolve, reject) => {
// // 	setTimeout(resolve, 2000, "two");
// // });

// // var p33 = new Promise((resolve, reject) => {
// // 	setTimeout(resolve, 3000, "three");
// // });

// // var p44 = new Promise((resolve, reject) => {
// // 	setTimeout(resolve, 400, "four");
// // });

// // var p55 = new Promise((resolve, reject) => {
// // 	// setTimeout(resolve, 1000, "five");
// // 	// reject("I really don't like peas");
// // });


// // Promise.race([p11, p22, p33, p44, p55])
// // .then( (winner) =>{
// // 	console.log("winner", winner);
// // 	console.log("show me the lego array - for fun", db.Legos.getLegos());
// // },
// // (reject) => {
// // 	console.log("reject", reject);
// // });
