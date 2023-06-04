/* const btn=document.getElementById("btn");
btn.addEventListener("click",(e)=>{

    const date=document.getElementById("search-input").value;
     var inputDate = new Date(date); 
    console.log(date);
    e.preventDefault(); 
});*/

function getCurrentImageOfTheDay(){
    const apiKey="cbXGhNU14iewaobY2vpRzFvfZeLsLGWVVs9YgbhP";
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        let section =document.getElementById("current-image-container");
        section.innerHTML = `
        <h1>NASA Picture of the Day</h1>
        <div id="image">
            <img src="${data.url}" alt="${data.title}" >
        </div>
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
    `; //End

    })
    .catch(error => console.log(error));
}

// Function to fetch and display the image for the selected date
function getImageOfTheDay(selectedDate) {
    const apiKey = "cbXGhNU14iewaobY2vpRzFvfZeLsLGWVVs9YgbhP";

    fetch(`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display data in the UI   
            const currentImageContainer = document.getElementById("current-image-container");


            currentImageContainer.innerHTML = `
            <h1>Picture on : ${data.date}</h1>
            <div id="image">
                <img src="${data.url}" alt="${data.title}" >
            </div>
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;

            // Save the date to local storage and add it to the search history
            saveSearch(selectedDate);
            addSearchToHistory(selectedDate);
        })
        .catch(error => console.log(error));
}

function saveSearch(selectedDate){
const search=JSON.parse(localStorage.getItem("search")) || [];
search.push(selectedDate);
localStorage.setItem("search", JSON.stringify(search));
}

function addSearchToHistory(selectedDate){
    const ul=document.getElementById("search-history");
    const li =document.createElement("li");
    const a =document.createElement("a");

    a.href="javascript:void(0)";
    a.textContent=selectedDate;
    a.addEventListener("click",()=>{
        getImageOfTheDay(selectedDate);
    });
    li.appendChild(a);
    ul.appendChild(li);
    

}





const search = document.getElementById("search-form");
search.addEventListener("submit",(e)=>{
    e.preventDefault();
    const selectedDate=document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];

    if(selectedDate>currentDate)
    {
        alert("Please Enter The Date On Or Before Today's Date")
        return;
    }
    
    getImageOfTheDay(selectedDate);

});




    getCurrentImageOfTheDay();