var is_visible = false;
var count = 0


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

// displays result if valid or invalid
async function showResult() {
    var password = document.getElementById("password").value;
    var password = password.trim()
    let res = await checkValidity(password)

    if (res) {
        console.log("valid password")
        document.getElementById("result").innerHTML = "Your password is Valid"
    } else {
        document.getElementById("result").innerHTML = "Your password is Invalid"
    }
    document.getElementById("results").style.display = "block";
    
}

// displays the count of the password as user types and hides the result div while user types
function inputChange() {
    var input = document.getElementById("password").value;

    input = input.trim();
    document.getElementById("password").value = input;
    document.getElementById("count").innerText = "length : " + input.length;

    document.getElementById("results").style.display = "none";

}

// checks if password satisfies rules
async function checkValidity(word) {
    
    if (word.length > 16 || word.length < 6 ) {
        console.log(word.length)
        return false
    }
    console.log("length checked")

    
    var regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    if (regex.test(word) != true) {
        console.log(regex.test(word))
        console.log("non latin characters")
        return false
    }
    console.log("latin checked")

    var z = word.match(/[\d\.]+|\D+/g);
    console.log(z);
    
    for (i=0; i < z.length; i++) {
        if (z[i].match(/[A-za-z0–9_]/i)) {

            response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${z[i]}`)
            data = await response.json()
            console.log(data)
            if (data.title != "No Definitions Found") {
                console.log("english word" + " " + z[i])
                console.log(data.title)
                return false
            } 
        }
    }
    console.log("dictionary word checked")
    

    return true
}
