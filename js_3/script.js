// greeting
{
    let str = prompt(`Введіть свое і'мя:`);
    alert(`Вітаємо ${str} на сторінці!!!!`);
}


// gopni4ek
{
    let str = prompt("Ввудіть будь яке речення!!");
    alert(str.split(",").join(" блін, "));
}

//capitalize
{
    let str = "cANBerRa";
    let result = str[0].toUpperCase() + str.slice(1).toLowerCase();
    console.log(result);
}

//word count
{
    let str = prompt("Введіть будь який рядок, я підрахую кількість слів у ньому.").split(" ").length;
    alert(`${str} слів у цьому речені.`);
}

//credentials
{
    let nameUser = prompt(`Введіть своє ім'я.`).trim();
    let surnameUser = prompt(`Введіть свою прізвище.`).trim();
    let middleNameUser = prompt(`Введіть своє ім'я по батькові.`).trim();

    let nameUserFix = nameUser[0].toUpperCase() + nameUser.slice(1).toLowerCase();
    let surnameUserFix = surnameUser[0].toUpperCase() + surnameUser.slice(1).toLowerCase();
    let middleNameUserFix = middleNameUser[0].toUpperCase() + middleNameUser.slice(1).toLowerCase();

    let fullName = `${nameUserFix} ${surnameUserFix} ${middleNameUserFix}`;
    alert(`${fullName}`); 
}

// beer // не коректно работает с пробелами и первым словом 
{
    let str = "Було жарко. Василь пив пиво вприкуску з креветками";

    function replaceWorld (world) {
        let index = str.indexOf(world); 
        if (index === -1) {
           console.log(`Такого слова не знайдено!`)
        } else {
            let result = str.slice(0, index-1) + " чай" + str.slice(index + world.length);
            return result;
        }
    }
    console.log(replaceWorld("пиво"));
}

// beer2
{
    let str = "Було жарко. Василь пив пиво вприкуску з креветками";

    function replaceWorld (worldInText, replacemenrWorld) {
        return str.replace(worldInText,replacemenrWorld)
    }
    console.log(replaceWorld("пиво", "чай"));
}

//no tag
{
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше"
    
    let startTag = "<";
    let endTag = ">";

    let indexStart = str.indexOf(startTag);
    let indexEnd = str.indexOf(endTag);
   
    let result = str.slice(0, indexStart) + str.slice(indexEnd+1).trimStart();
    console.log(result);
}

//big tag
{
    let str = "якийсь текст у якому є один тег <br /> і всяке інше"
    
    let startTag = "<";
    let endTag = ">";

    let indexStart = str.indexOf(startTag);
    let indexEnd = str.indexOf(endTag);

    let upperTag = str.slice(indexStart,indexEnd + 1).toUpperCase();
     
    let result = str.slice(0, indexStart) + upperTag + str.slice(indexEnd+1);

    console.log(result)
}

//new line
{
    let str = prompt("Введыть рядок з новим рядками за домопомогою \\n");
    let result = str.split("\\n").join("\n");
    alert(result);
}

// youtube

const regular = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
const link = prompt("Введіть посилання на YouTube");
const match = link.match(regular);

if (match) {
    const idVideo = match[6];
    document.write(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${idVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
} else {
    document.write("Ви ввели не існуюче посилання на YouTube");
}