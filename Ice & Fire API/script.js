

let nav = document.createElement("div")
nav.setAttribute("class", "navbar navbar-header text-light mb=2 mt-2")
nav.innerHTML = `<div class="container"><h4 col=col-3>Ice and Fire API</h4> 
    <h5>Home</h5><h5>Author</h5><h5>Publisher</h5>
    <div class="col-3"> 
    <input id="search" type="text" placeholder="Search">
    <button id="searchbtn" type="button"onclick="book()" >Search</button></div>
    </div> `;
document.body.append(nav);


let Title = document.createElement("div");
Title.innerHTML = `<h1 class="text-center mb-2 mt-5" >Ice and Fire API</h1>`;
document.body.append(Title);

async function iceandfire() {
    try {
        let response = await fetch("https://www.anapioficeandfire.com/api/books");
        let output = await response.json();
        console.log(output);
        console.log(`Author : ${output[0].authors}`);
        console.log(`Name : ${output[0].name}`);
        console.log(`Number of Pages : ${output[0].numberOfPages}`);
        console.log(output[0].isbn);
        console.log(output[0].publisher);
        console.log(output[0].released);
        console.log(output[0].characters[0]);

        var container = document.createElement("div");
        container.setAttribute("class", "container");
        container.setAttribute("id", "container")
        document.body.appendChild(container);
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        container.appendChild(row);

        output.forEach(api => {
            let card = document.createElement("div");
            card.setAttribute("class", "col-lg-4 col-md-6 col-sm-12 col-12 pb-3 rounded-3")
            row.appendChild(card);

            let name = document.createElement("div");
            name.setAttribute("class", "card-header");
            name.innerHTML = `<h3>${api.name}</h3>`;
            card.appendChild(name);

            var cardbody = document.createElement("div");
            cardbody.setAttribute("class", "card-body");
            card.appendChild(cardbody);

            let author = document.createElement("div");
            author.setAttribute("class", "author");
            author.innerHTML = `<h4>Author : ${api.authors}</h4>`;
            cardbody.appendChild(author);

            let numberOfPages = document.createElement("div");
            numberOfPages.setAttribute("class", "pages");
            numberOfPages.innerHTML = `<p>Number of Pages : ${api.numberOfPages}</p>`
            cardbody.appendChild(numberOfPages);

            let isbn = document.createElement("div");
            isbn.setAttribute("class", "author");
            isbn.innerHTML = `<p>isbn : ${api.isbn}</p>`;
            cardbody.appendChild(isbn);

            let publisher = document.createElement("div");
            publisher.setAttribute("class", "author");
            publisher.innerHTML = `<p>Publisher : ${api.publisher}</p>`;
            cardbody.appendChild(publisher);

            let releaseddate = document.createElement("div");
            releaseddate.setAttribute("class", "author");
            releaseddate.innerHTML = `<p>Released Date : ${api.released}</p>`;
            cardbody.appendChild(releaseddate);

            // let character = document.createElement("button");
            // character.setAttribute("class","btn btn-light")
            // character.setAttribute("type","button");
            // character.innerHTML = "Characters";
            // cardbody.appendChild(character);
            // character.addEventListener("onclick",()=>{
            //     char(e.characters);
            // });


            // <--- Show Characters --->

            async function char() {
                // document.getElementsByTagName("p").innerHTML = "";
                let charac = await fetch(`${api.characters[1]}`);
                let charac1 = await charac.json();
                console.log(charac1);
                console.log(charac1.aliases[0]);

                let cha = document.createElement("p");
                cha.setAttribute("class", "cha text-yellow");
                cha.setAttribute("id", "cha");
                cha.innerHTML = `<strong><br/>Characters :<br/>${charac1.aliases[0]}<br/> ${charac1.aliases[1]}<br/>${charac1.aliases[2]}<br/>${charac1.aliases[3]}<br/>${charac1.aliases[4]}</strong>`;
                cardbody.appendChild(cha);
            }
            char();


        });

    } catch (error) {
        console.log(Error);
    }

}
iceandfire();



let display = document.createElement("div");
display.setAttribute("class", "text-dark text-center mt-3 pt-5");
display.innerHTML = `<strong><div id = "bookname"class="card-header1"></div>
    <div class="card-body1">
    <div id = "bookauthor"></div>
    <div id = "bookpage"></div>
    <div id = "bookpublisher"></div>
    <div id = "bookreleased"></div></strong>
    </div></div> `
document.body.append(display);

async function book() {
    try {
        let search = document.getElementById("search").value;

        document.getElementById("container").innerHTML = "";

        let res = await fetch("https://www.anapioficeandfire.com/api/books/");
        let res1 = await res.json();

        let result = res1.filter((value) => (value.name == `${search}` || value.publisher == `${search}` || value.authors == `${search}`));
        console.log(result);
        console.log(result[0].name);
        console.log(result[0].authors);
        console.log(result[0].numberOfPages);
        console.log(result[0].publisher);
        console.log(result[0].released);

        for (i = 0; i < result.length; i++) {
            document.getElementById("bookname").innerHTML = `<h3>${result[0].name}</h3>`;
            document.getElementById("bookauthor").innerHTML = `<h5>Author: ${result[0].authors}</h5>`;
            document.getElementById("bookpage").innerHTML = `<p>Number of Pages: ${result[0].numberOfPages}</p>`;
            document.getElementById("bookpublisher").innerHTML = `Publisher:<p> ${result[0].publisher}</p>`;
            document.getElementById("bookreleased").innerHTML = `ReleasedDate :<p> ${result[0].released}</p>`;
        }

        // let div1 = document.createElement("div");
        // div1.setAttribute("class", "text-dark text-center");
        // div1.innerHTML = `<strong><p id="fire"></p></strong>`
        // document.body.append(div1);

        async function fire() {
            // document.getElementsByTagName("p").innerHTML = "";
            let actor = await fetch(`${result[0].characters[1]}`);
            let actor1 = await actor.json();
            console.log(actor1);
            console.log(actor1.aliases[0]);

            let para = document.createElement("div");
            para.setAttribute("class", "fire text-dark");
            para.setAttribute("id", "fire");
            for (i = 0; i < actor1.length; i++) {
                document.getElementById("fire").innerHTML = `<strong><br/>Characters :<br/>${actor1[0].aliases[0]},<br/> ${actor1.aliases[1]},<br/>${actor1.aliases[2]},<br/>${actor1.aliases[3]},<br/>${actor1.aliases[4]}</strong>`;
            }
            display.append(para);
        }
        fire();

        setTimeout(() => {
            location.reload();
        }, 9000);
    } catch (error) {
        console.log(Error);
    }

}






// characters url "https://www.anapioficeandfire.com/api/characters"
// books url "https://www.anapioficeandfire.com/api/books"

