const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const exchangeBtn = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i");
// console.log(selectTag[0])
// console.log(exchangeBtn)
selectTag.forEach((tag , id) => {
    for (const countriesCode in countries) {
        // Choose Defualt Language In Selected Tag
        let selected;
        if(id == 0 && countriesCode == "en-GB") {
            selected = "selected"
        } else if(id == 1 && countriesCode ==  "ar-SA") {
            selected = "selected"
        }

       let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`
       tag.insertAdjacentHTML("beforeend", option) // adding option tag to select tag
    }
});

// exchange Values
exchangeBtn.addEventListener("click", ()=> {
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let templang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = templang
    
})

translateBtn.addEventListener("click", ()=> {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value,
    apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    // fetching api response in json and recieving it in data Object and give to text value for translated word
    fetch(apiURL).then(response => response.json()).then(data => {
      console.log(data)
      toText.value = data.responseData.translatedText;
    })
     
})


icons.forEach(icon => {
    icon.addEventListener("click" , ({target})=>{
        if(icon.classList.contains("fa-copy")) {
            if(target.id == "from") {
              navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance;
            if(target.id == "from") {
              utterance = new SpeechSynthesisUtterance(fromText.value);
              utterance.lang = selectTag[0].value
              } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value
              }
              speechSynthesis.speak(utterance);
         
        }
    })
})