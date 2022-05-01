/*  Fetches the first button in the document it is linked to
    (in this case, index.html)
    with the selector
    (in this case, the id "generate")
    and assigns it an object for use in the script
    */
var generateBtn = document.querySelector("#generate");

/*  Function calling another function we write
    generatePassword() returns a value that is stored in in the password variable
    passwordText gets assigned an object via querySelector similar to above
    passwordText object is a textarea, which has a .value property
    passwordText.value gets assigned our password generated by generatePassword()
    */
    function writePassword() {

    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    
    // due to the ! logical operator, if empty string is passed through, nothing happens
    if(!password == "") {
        
        passwordText.value = password;
        
        // one-time appending of "Password Generated" text above the box containing generated password
        // I tried for a long time to figure out how to style this text but it seems it requires extra stuff like AJAX
        if(typeof onlyOnce === 'undefined') {
            document.querySelector('.card-header').append("Password Generated");
            onlyOnce = true;
        }
    }

}

var generatePassword = function() {

    // Initialize returnedPassword as a primitive type string, allowing += assignment to add both numbers and characters to our string
    // This value will be returned by function
    var returnedPassword = "";

    // Store all possible characters that could be used in password generation
    var chars = {
        lowerCase: "abcdefghijklmnopqrstuvwxyz",
        upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        special: "`~!@#$%^&*()_+-=[]{};':\\\",.<>/?|",
        numbers: "0123456789"
    }

    // Store answers user gives about whether to use particular criteria
    var useLowerCase = confirm("Use lower case letters?");
    var useUpperCase = confirm("Use upper case letters?");
    var useSpecial = confirm("Use special characters?");
    var useNumbers = confirm("Use numbers?");

    // Ensure user selected at least one character type using comparisons to ensure all are false
    // This loop's conditions will not return true if user selects at least one character type
    while (!useLowerCase && !useUpperCase && !useSpecial && !useNumbers) {

        // User has not selected at least one character type, so we alert them and go back over character types before moving on
        alert("At least one character type must be selected!");

        useLowerCase = confirm("Use lower case letters?");
        useUpperCase = confirm("Use upper case letters?");
        useSpecial = confirm("Use special characters?");
        useNumbers = confirm("Use numbers?");

    }

    // Final user selection about password length
    var passwordLength = prompt("How many characters, from 8 to 128, would you like your password to be?");

    // If user hits cancel, passwordLength will be null and so we return empty string to cancel out of dialogs
    if (passwordLength === null) {
        return;
    }
    
    // Ensure user selected valid password length and an actual number, but also not a decimal
    while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength) || passwordLength.includes(".")) {
        // If user hits cancel, passwordLength will be null and so we return empty string to cancel out of dialogs
        if (passwordLength === null) {
            return;
        }
        passwordLength = prompt(`Invalid entry. You entered \"${passwordLength}\".\nLength must be an integer from 8 to 128 characters.\nHow many characters, from 8 to 128, would you like your password to be?`);
    }

    // Iterates a # of times equal to password length specified by user.
    for (i = 0;i < passwordLength;i++) {

        // Generate # between 1 and 3, which corresponds to the types of characters a person can choose
        var typePicker = Math.floor(Math.random() * 4);

        // Use switch case for randomly generated number. Basically the same as if-else but I like switch.
        switch (typePicker) {

            case 0:
                // Validation for character type.
                // If false, decrement i so we don't shorten string for random cases that aren't valid for chosen character types.
                if(useLowerCase) {
                    var picked = chars.lowerCase.charAt(Math.floor(Math.random() * chars.lowerCase.length));
                    returnedPassword += picked;
                }
                else { 
                    i-- 
                }

                break;
                // See case 0
            case 1:
                if(useUpperCase) {
                    var picked = chars.upperCase.charAt(Math.floor(Math.random() * chars.upperCase.length));
                    returnedPassword += picked;
                }
                else {
                    i--
                }
                break;
                // See case 0
            case 2:
                if(useSpecial) {
                    var picked = chars.special.charAt(Math.floor(Math.random() * chars.special.length));
                    returnedPassword += picked;
                }
                else {
                    i--
                }

                break;
                // See case 0
            case 3:
                if(useNumbers) {
                    var picked = chars.numbers.charAt(Math.floor(Math.random() * chars.numbers.length));
                    returnedPassword += picked;
                }
                else {
                    i-- 
                }
                break;
        };
    }
    // Return our now-generated password
    return returnedPassword;
};

/*  With our assigned button object, when clicked, execute writePassword()
    writePassword() does its thing, which has several confirms and prompts for our user
    These prompts collect criteria from user which are used to generate the password
    returnedPassword is returned by generatePassword which passes that value to the textarea
    We can confirm this chain of events by commenting out the addEventListener and manually calling writePassword()
    */
generateBtn.addEventListener("click", writePassword);
// writePassword();