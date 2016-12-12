// import {Observable} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.from(numbers);

// class MyObserver {
//     next(value) {
//         console.log(`value: ${value}`);
//     }

//     error(e) {
//         console.log(`error: ${e}`);
//     }

//     complete() {
//         console.log("complete");
//     }
// }

// source.subscribe(new MyObserver());

// ********************************************************************************

// import {Observable, Observer} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.from(numbers);

// class MyObserver implements Observer<number> {
//     next(value) {
//         console.log(`value: ${value}`);
//     }

//     error(e) {
//         console.log(`error: ${e}`);
//     }

//     complete() {
//         console.log("complete");
//     }
// }

// source.subscribe(new MyObserver());


// ********************************************************************************

// import {Observable, Observer} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.from(numbers);
// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable, Observer} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.create(observer => {
//     for(let n of numbers) {
//         observer.next(n);
//     }

//     observer.complete();
// });

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.create(observer => {
//     for(let n of numbers) {
//         if(n === 5) {
//             observer.error("Some error!");
//         }
//         observer.next(n);
//     }

//     observer.complete();
// });

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.create(observer => {
//     let index = 0;
//     let produceValue = () => {
//         observer.next(numbers[index++]);

//         if(index < numbers.length) {
//             setTimeout(produceValue, 2000);
//         } else {
//             observer.complete();
//         }
//     }

//     produceValue();
// });

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";

// let numbers = [1, 5, 10];
// let source = Observable.create(observer => {
//     let index = 0;
//     let produceValue = () => {
//         observer.next(numbers[index++]);

//         if(index < numbers.length) {
//             setTimeout(produceValue, 2000);
//         } else {
//             observer.complete();
//         }
//     }

//     produceValue();
// }).map(n => n * 2)
//   .filter(n => n > 4);

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";
// // import {Observable} from "rxjs/Observable";
// // import "rxjs/add/operator/map";
// // import "rxjs/add/operator/filter";

// let numbers = [1, 5, 10];
// let source = Observable.create(observer => {
//     let index = 0;
//     let produceValue = () => {
//         observer.next(numbers[index++]);

//         if(index < numbers.length) {
//             setTimeout(produceValue, 2000);
//         } else {
//             observer.complete();
//         }
//     }

//     produceValue();
// }).map(n => n * 2)
//   .filter(n => n > 4);

// source.subscribe(
//     value => console.log(`value: ${value}`),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";

// let circle = document.getElementById("circle");
// let source = Observable.fromEvent(document, "mousemove")
//                     .map((e: MouseEvent) => {
//                         return {
//                             x: e.clientX,
//                             y: e.clientY
//                         }
//                     })
//                     .filter(
//                         value => value.x < 500
//                     )
//                     .delay(300);

// // .map(n => n * 2)
// //   .filter(n => n > 4);

// function onNext(value) {
//     circle.style.left = value.x;
//     circle.style.top = value.y;
// }

// source.subscribe(
//     onNext,
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

// import {Observable} from "rxjs";

// let output = document.getElementById("output");
// let button = document.getElementById("button");
// let click = Observable.fromEvent(button, "click");

// // .map(n => n * 2)
// //   .filter(n => n > 4);

// function load(url : string) {
//     let xhr = new XMLHttpRequest();

//     xhr.addEventListener("load", () => {
//         let movies = JSON.parse(xhr.responseText);
//         movies.forEach(m => {
//             let div = document.createElement("div");
//             div.innerText = m.title;
//             output.appendChild(div);
//         });
//     });

//     xhr.open("GET", url);
//     xhr.send();
// }

// click.subscribe(
//     e => load("movies.json"),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

// ********************************************************************************

import { Observable } from "rxjs";

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = Observable.fromEvent(button, "click");

// .map(n => n * 2)
//   .filter(n => n > 4);

function load(url: string) {

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET", url);
        xhr.send();
    });
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}


click.flatMap(e => load("movies.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );