const BaseURL = "https://api.weatherapi.com/v1/"
const key = "e1f20b7ba5f840509ea94914240105";
const searchAPI = "search.json"


let availableKeywords = [];
let result = '';

const searchResultBox = document.querySelector(".search_resultbox");
const inputBox = document.getElementById("search");

inputBox.onkeyup = function () {
    let input = inputBox.value;
    availableKeywords = [];
    if(input.length) {
        GetSearchData(input);   
    }

    if(!result.length)
        searchResultBox.innerHTML = '';
}


const GetSearchData = async (val) => {
    const endpoint = BaseURL+`${searchAPI}?q=${val}&key=${key}`;

    let response = await fetch(endpoint);

    if(response != null){
        let data = await response.json();

        for(let i =0; i < data.length; i++){
            availableKeywords.push(data[i].name);       
        }

        DisplayResult(availableKeywords);
    }

    
}

function DisplayResult(result) {
    const content = result.map((list)=> {
            return "<li>"+list+"</li>";
    });

    searchResultBox.innerHTML = "<ul>"+content.join('')+"</ul>";

    // Add event listener to all <li> elements inside search result box
    let listItems = searchResultBox.querySelectorAll("li");
    listItems.forEach(function(li) {
        li.addEventListener("click", function() {
            // Get the text content of the clicked <li>
            let selectedText = this.textContent;
            
            // Insert the selected text into the input field
            inputBox.value = selectedText;
            searchResultBox.innerHTML = '';
        });
    });
}

