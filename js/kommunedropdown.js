const select = document.getElementById("ddKommuner");
const searchOptions = document.getElementById("searchOptions");
const fillDrop = document.getElementById("pbFillKommuner");
const searchInput = document.getElementById("userInput");
const urlKommune = "https://api.dataforsyningen.dk/kommuner";

let kommuneArr;

function fetchAnyUrl(url)
{
    console.log("inside fetch url = " + url);
    return fetch(url).then(response => response.json());
}

function fillDropdown(item)
{
    const el = document.createElement("option");
    el.textContent = item.navn;
    el.value = item.navn;
    select.appendChild(el);

}

async function fetchKommuner(any)
{
    select.innerHTML = '';
    kommuneArr = await fetchAnyUrl(urlKommune);
    console.log(kommuneArr);
    kommuneArr.forEach(fillDropdown);
    kommuneArr.forEach(fillInputField);
    kommuneArr.forEach(createATag);
}


function selectedKommune()
{
    const selectedOption = select.options[select.selectedIndex];
    select.value = selectedOption.value;
}

function removeKommuneFromArray(option)
{
    for (let i = 0; i < kommuneArr.length; i++)
    {
        if (kommuneArr[i].navn === option.navn)
        {
            kommuneArr.splice(i, 1);
            break;
        }
    }
}

function getUserInput()
{
    const userInput = searchInput.value;
    searchOptions.innerHTML = "";
    if (userInput.length > 0)
    {
        kommuneArr.forEach(option =>
        {
            if (option.navn.toLowerCase().includes(userInput.toLowerCase()))
            {
                const optionIndex = document.createElement('div');
                optionIndex.textContent = option.navn;
                optionIndex.addEventListener('click', () => createATag(option));
                searchOptions.appendChild(optionIndex);
            }
        });
    }
}

function createATag(option)
{
    {
        searchInput.value = option.navn;
        searchOptions.innerHTML = "";
        const aTag = document.createElement('a');
        aTag.textContent = option.navn;
        aTag.href = option.href;
        document.body.appendChild(aTag);
        removeKommuneFromArr(option);
    }

}

select.addEventListener('change', selectedKommune);
fillDrop.addEventListener('click', fetchKommuner);
searchInput.addEventListener('input', getUserInput);

// Jeg har fået lidt hjælp af ChatGPT, da jeg ikke føler mig helt 100% på JavaScript endnu.
// Men det hjælper med opgaver som disse, så jo flere opgaver jo bedre.
