function changeRate(rate){
    if(!rate.classList.contains("active")){
        document.querySelector(".active").classList.remove("active")
        rate.classList.add("active")
        if(rate.dataset.sub === "right"){
            document.querySelector(".button").href = "https://google.com/"
        }else{
            document.querySelector(".button").href = "https://apple.com/"
        }
    }
}

function changeLocalization(localization){
    let textArr = document.querySelectorAll('[data-text]')
    let dataLocalization = document.querySelector('[data-localization]')
    let localizations = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh']

    if(!localizations.includes(localization)) localization = 'en'
    dataLocalization.dataset.localization = localization
    
    fetch(`./Localizations/${localization}.json`)
    .then(res => res.json())
    .then((data) => {
        textArr.forEach((e) => {
            if(e.innerHTML.includes('{{price}}')){
                let newStr = data[e.innerHTML].replace(/{{price}}/g, '9.99')
                e.innerHTML = newStr
            }else if(e.innerHTML.includes('{{priceYm}}')){
                let newStr = data[e.innerHTML].replace(/{{priceYm}}/g, '1.66')
                e.innerHTML = newStr
            }else if(e.innerHTML.includes('{{priceY}}')){
                let newStr = data[e.innerHTML].replace(/{{priceY}}/g, '19.99')
                e.innerHTML = newStr
            }else{
                e.innerHTML = data[e.innerHTML]
            }
        })
    })
}

if(!window.location.search){
    let language = window.navigator.language.substr(0, 2).toLowerCase()
    changeLocalization(language)
}else{
    changeLocalization(window.location.search.replace('?lang=', ''))
}
