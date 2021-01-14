
const amount = document.querySelector('.amount-input')
const selectFrom = document.querySelector('.your-currency');
const selectAnother = document.querySelector('.another-currency');
const amountPlaceholder = document.querySelector('.amount-equal');
const conversionPlaceholder = document.querySelector('.conversion-value');
const datePlaceholder = document.querySelector('.exact-date')
const loading = document.querySelector('.loading')
const rate1 = document.querySelector('.rate1')
const rate2 = document.querySelector('.rate2')
const detailtab = document.querySelector('.details')
const contentForm = document.querySelector('.main-content-form')
let isAnimationExecuted = false;
const API_KEY = 'a7a71c7fa7ff513e89541de6e7994c1d';

fetchCurrencies = async()=>{
    loading.className = "loading";
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}`);
    return response.json()
}

fetchCurrencies().then((data)=>{
    console.log(data)
    datePlaceholder.innerHTML = data.date;
    rates = data.rates;
    currencyData = data;
    baseRate = data.base;
   for(const [key, value ] of Object.entries(data.rates)){
        const optionforSelectFrom = document.createElement('option');
        const optionforSelectAnother = document.createElement('option');
        optionforSelectFrom.value = value;
        optionforSelectFrom.text = key;
        optionforSelectAnother.value = value;
        optionforSelectAnother.text = key;
        selectFrom.append(optionforSelectFrom)
        selectAnother.append(optionforSelectAnother)
   }
   loading.className = "loading hidden";
}).catch(err=>{
    console.error(err)
    loading.className = "loading hidden";
})

roundOff = (val)=>{
    const finalConverted = Math.round((val + Number.EPSILON) * 100) / 100
    return finalConverted
}

let selectText;
setSelectedText = (event)=>{
    const select = event.target;
    selectText = select.options[select.selectedIndex].text
}

let otherSelectedText;
handleOptions= (event)=>{
const select = event.target;
otherSelectedText = select.options[select.selectedIndex].text
}
convert = ()=>{
    const myCurrency = selectFrom.value;
    const otherCurrency = selectAnother.value;
    if(amount.value && myCurrency != 0 && otherCurrency != 0){
    const select = event.target;
   
     const converted = roundOff((otherCurrency/myCurrency) * amount.value);
  
     rate1.innerHTML = `1 ${selectText} = ${roundOff(otherCurrency/myCurrency).toLocaleString()} ${otherSelectedText}`
     rate2.innerHTML = `1 ${otherSelectedText} = ${roundOff(myCurrency/otherCurrency).toLocaleString()} ${selectText}`
    amountPlaceholder.innerHTML = `${amount.value.toLocaleString()} ${selectText} IS `
     conversionPlaceholder.innerHTML = `${converted.toLocaleString()} ${otherSelectedText}`
     if(!isAnimationExecuted){
         detailtab.className = "details fade";
         const classforThis = window.innerWidth > 1120 ? 'add-height-big add-height-anim-big' : 'add-height add-height-anim'
         contentForm.className = `main-content-form ${classforThis}`
         isAnimationExecuted = true;
        
     }
     }
}

window.addEventListener('resize',()=>{
    if(window.innerWidth > 1120 && isAnimationExecuted){
        console.log("big")
        contentForm.className = "main-content-form add-height-big"
    }
    if(window.innerWidth < 1120 && isAnimationExecuted){
        console.log("smol")
        contentForm.className = "main-content-form add-height"
    }
})

selectFrom.addEventListener('change',setSelectedText)
selectAnother.addEventListener('change',handleOptions)


