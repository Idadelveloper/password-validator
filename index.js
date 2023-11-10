var is_visible = false;
var count = 0
var conditions = {
    correctRange: false,
    includesNumber: false,
    onlyLatin: false,
    nonDict: false
}

function see() {
    var input = document.getElementById("password");
    var see = document.getElementById("see");

    if (is_visible) {
        input.type = "password"
        is_visible = false
        see.style.color = "gray"
    } else {
        input.type = "text";
        is_visible = true;
        see.style.color = "green";
    }

}


async function isValidWord(word) {
    const response = await 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json()
    if (data.title === "No Definitions Found") {
        document.getElementById("check4").style.color = "green"
        count ++
        return true
    } else if (response.status === 200 || "200") {
        document.getElementById("check4").style.color = "red"
        conditions.nonDict == false
        return true
    } else  {
        document.getElementById("check4").style.color = "green"
        count ++
        return true
    }
}

async function checkValidity() {
    var password = document.getElementById("password").value;
    var password = password.trim()

    // const response = await 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${password}`)
    .then(res => {return res.json()})
    .then((response) => {
        // const data =  response.json()
        if (response.title === "No Definitions Found") {
            document.getElementById("check4").style.color = "green"
            conditions.nonDict = true
            count ++
        } else if (response.status === 200 || "200") {
            document.getElementById("check4").style.color = "red"
        } else  {
            document.getElementById("check4").style.color = "green"
            count ++
        }
    })
    .then(() => {
        var input = document.getElementById("password").value;

        input = input.trim();
        if (input.length >= 8 && input.length <= 16) {
            document.getElementById("check0").style.color = "green";
            conditions.correctRange = true
            count++
        } else {
            document.getElementById("check0").style.color = "red";
            conditions.correctRange = false
        }
    
        if (input.match(/[0-9]/i)) {
            document.getElementById("check2").style.color = "green"
            conditions.includesNumber = true
            count++
        } else {
            document.getElementById("check2").style.color = "red";
            conditions.includesNumber = false
        }
    
        if (input.match(/[A-za-z0–9_]/i)) {
            document.getElementById("check3").style.color = "green"
            conditions.onlyLatin = true
            count++
        } else {
            document.getElementById("check3").style.color = "red";
            conditions.onlyLatin = false
        }
    })
    .then(() => {
        console.log(conditions)
        if (conditions.correctRange && conditions.includesNumber && conditions.nonDict && conditions.onlyLatin) {
            document.getElementById("result").innerHTML = "Your password is Valid"
        } else {
            document.getElementById("result").innerHTML = "Your password is Invalid"
        }
    })
    .catch((err) => console.log(err))
    

}

function showResult() {

    let input = document.getElementById("password")
   
    if (checkValidity()) {
        document.getElementById("results").style.display = "block";
        document.getElementsByClassName("final-results").style.display = "block"
        
    }
    
}

function inputChange() {
    var input = document.getElementById("password").value;

    input = input.trim();
    document.getElementById("password").value = input;
    document.getElementById("count").innerText = "length : " + input.length;

    document.getElementById("results").style.display = "none";

}

function resetResult() {
    conditions = {
        correctRange: false,
        includesNumber: false,
        onlyLatin: false,
        nonDict: false
    }
    document.getElementById("rule0").style.color = "black"
    document.getElementById("rule1").style.color = "black"
    document.getElementById("rule2").style.color = "black"
    document.getElementById("rule3").style.color = "black"
    document.getElementById("result").innerText = "Waiting for results..."
}
