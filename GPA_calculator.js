// MY CODES START FROM HERE

// press calculate to run this function: this function will take in the data values from GPA_dictionary.json (the GPA_dictionary has the Grade vs Point for the top 5 universities in Singapore with format as such "A+":5.3, ... )
// based on the univeristy from user input, this function will return the calcualated GPA
function calculateGPA() {
    // application of axios knowledge: retreiving data from a json file:

    target = './GPA_dictionary.json';
    axios.get(target)
        .then(response => {
            // retrieved data from the dictionary for each uni's grade : gpa 
            // console.log(response.data); 
            var inputUni = document.getElementById('university').value;
            var displayMsg = document.getElementById('displayMsg');
            var displayMsg1 = document.getElementById('displayMsg1');
            displayMsg1.innerText = '';
            var numSelected = document.getElementById('moduleCount').value;
            // error prevention in case of bug:
            if (!numSelected) {
                alert('Please select the number of modules you have taken.');
                return;
            }
            numSelected = parseInt(numSelected);
            // this will obtain the all elements of 'input' with id 'moduleInputs'
            let textFieldsList = document.querySelectorAll('#moduleInputs input');

            // calculation for SMU:
            // SMU's cumulative GPA calculation: sum of GPA of all mods divide by number of mods
            if (inputUni == 'smu') {
                let sum = 0;
                var uniDicts = response.data;
                let uniObj = uniDicts[0];
                for (dict of uniDicts) {
                    if (dict.hasOwnProperty(inputUni)) {
                        uniObj = dict[inputUni];
                    }
                }
                // console.log(uniObj)
                let i = 0
                while (i < numSelected) {
                    // ensure user's input is valid first (can be found in the dictionary)
                    let gradeEntered = textFieldsList[i].value.trim().toUpperCase();
                    if (typeof gradeEntered == "string" && uniObj.hasOwnProperty(gradeEntered)) {
                        // console.log(uniObj[gradeEntered]);
                        sum += uniObj[gradeEntered];
                    }
                    else {
                        alert('Please ensure the grade entered for module ' + (parseInt(i) + 1) + " is valid!");
                        return;
                    }

                    i++;
                }

                let cumulativeGPA = sum / numSelected;
                cumulativeGPA = cumulativeGPA.toFixed(2);
                displayMsg.innerText = "Your cumulative GPA for current semester is " + cumulativeGPA;


                // calculate overall GPA:
                let pastGPA = document.getElementById('pastGPA').value;
                let pastNumMods = document.getElementById('pastNumMods').value;
                displayMsg1.scrollIntoView({ behavior: 'smooth' });
                if(pastGPA !== "" && !isNaN(parseFloat(pastGPA)) && pastNumMods != "" && !isNaN(parseFloat(pastGPA))){ // this is only for users who key in their past GPA and past number of mods correctly
                    pastGPA = parseFloat(pastGPA); 
                    pastNumMods = parseFloat(pastNumMods);
                    cumulativeGPA = parseFloat(cumulativeGPA);
                    if(pastGPA > 4.3 || pastGPA < 0){ // error prevention measure: in case user key in funny value for past gpa
                        alert("Please enter a valid value for your past GPA (0 to 4.3)!");
                        displayMsg1.innerText = "";
                        return;
                    }
                    if(pastNumMods < 0 || pastNumMods > 100){ // error prevention measure: in case user key in funny value for past num of mods
                        alert("Please enter a valid value for your past number of modules!");
                        displayMsg1.innerText = "";
                        return;
                    } 
                    let overallGPA = ((pastGPA * pastNumMods) + cumulativeGPA * numSelected)  /  (numSelected + pastNumMods);
                    overallGPA = overallGPA.toFixed(2);
                    displayMsg1.innerText = "Your overall cumulative GPA will be " + overallGPA;
                    // system will congratulate user based on their total GPA, should they enter their past GPA
                    if(overallGPA >= 3.8 ){
                        alert("Your will get Summa Cum Laude! You sir/ma'am, are a genius!");
                    }
                    else if(3.79 >= overallGPA && overallGPA >= 3.7){
                        alert('Your will get Magna Cum Laude! Owwwww dean lister, time to show off to friends!');
                    }
                    else if(3.69 >= overallGPA && overallGPA >= 3.6){
                        alert('Your will get Magna Cum Laude! Keep up and you will become a dean lister!');
                    }
                    else if(3.59 >= overallGPA && overallGPA >= 3.4){
                        alert('Your will get Cum Laude! Higher employment rate and starting salary await you!');
                    }
                    else if(3.39 >= overallGPA && overallGPA >= 3.2){
                        alert('Your will get High Merit!');
                    }
                    else if(3.19 >= overallGPA && overallGPA >= 3.0){
                        alert('Your will get Merit!');
                    }
                    
                }
                // if user does not key in past GPA, then the system will congratulate user based on their current GPA
                else{
                    if(cumulativeGPA >= 3.8 ){
                        alert("Your will get Summa Cum Laude! You sir/ma'am, are a genius!");
                    }
                    else if(3.79 >= cumulativeGPA && cumulativeGPA >= 3.7){
                        alert('Your will get Magna Cum Laude! Owwwww dean lister, time to show off to friends!');
                    }
                    else if(3.69 >= cumulativeGPA && cumulativeGPA >= 3.6){
                        alert('Your will get Magna Cum Laude! Keep up and you will become a dean lister!');
                    }
                    else if(3.59 >= cumulativeGPA && cumulativeGPA >= 3.4){
                        alert('Your will get Cum Laude! Higher employment rate and starting salary await you!');
                    }
                    else if(3.39 >= cumulativeGPA && cumulativeGPA >= 3.2){
                        alert('Your will get High Merit!');
                    }
                    else if(3.19 >= cumulativeGPA && cumulativeGPA >= 3.0){
                        alert('Your will get Merit!');
                    }
                }

            }
            // calculation for sutd:
            else if (inputUni == 'sutd') {
                let totalGPA = 0;
                let totalCredits = 0;
                var uniDicts = response.data;
                let uniObj = uniDicts[0];
                for (dict of uniDicts) {
                    if (dict.hasOwnProperty(inputUni)) {
                        uniObj = dict[inputUni];
                    }
                }
                // console.log(uniObj)
                // textFieldsList will generate [0: mod1, 1: credit1, 2: mod2, 3: credit2 ... ]
                let i = 0; // i indicates the mod index
                let j = 1; // j indicates the credit index
                let m = 0; // m indicates the loop index
                while (i <= numSelected * 2 && j <= numSelected * 2) {
                    // OR: while( i <= textFieldsList.length() )

                    // ensure user's input is valid first (can be found in the dictionary)
                    let gradeEntered = textFieldsList[i].value.trim().toUpperCase();
                    let creditEntered = textFieldsList[j].value;
                    if (typeof gradeEntered == "string" && uniObj.hasOwnProperty(gradeEntered)) {
                        let thisGPA = uniObj[gradeEntered];
                        creditEntered = parseFloat(creditEntered);
                        if (creditEntered < 10 && creditEntered > 0) {
                            totalCredits += creditEntered;
                            totalGPA += creditEntered * thisGPA;
                        }
                        else {
                            alert('Please ensure the credit entered for module ' + (parseInt(m) + 1) + " is valid! Your credit entered for the mod is either too large or too small!");
                            return;
                        }
                    }
                    else {
                        alert('Please ensure the grade entered for module ' + (parseInt(i) + 1) + " is valid!");
                        return;
                    }
                    m ++;
                    i += 2;
                    j += 2;
                }

                let cumulativeGPA = totalGPA / totalCredits;
                cumulativeGPA = cumulativeGPA.toFixed(2);
                // display the result in the displayMsg div:
                displayMsg = document.getElementById('displayMsg');
                displayMsg.innerText = "Your cumulative GPA for current semester is " + cumulativeGPA ;

                
                // calculate overall GPA taking past GPA and current GPA:
                var displayMsg1 = document.getElementById('displayMsg1');
                displayMsg1.scrollIntoView({ behavior: 'smooth' });
                let pastGPA = document.getElementById('pastGPA').value;
                let pastNumMods = document.getElementById('pastNumMods').value;
                if(pastGPA !== "" && !isNaN(parseFloat(pastGPA)) && pastNumMods != "" && !isNaN(parseFloat(pastGPA))){ // this is only for users who key in their past GPA and past number of mods correctly
                    pastGPA = parseFloat(pastGPA); 
                    pastNumMods = parseFloat(pastNumMods);
                    cumulativeGPA = parseFloat(cumulativeGPA);
                    if(pastGPA > 5.3 || pastGPA < 0){ // error prevention measure: in case user key in funny value for past gpa
                        alert("Please enter a valid value for your past GPA (0 to 5.3)!");
                        displayMsg1.innerText = "";
                        return;
                    }
                    if(pastNumMods < 0 || pastNumMods > 100){ // error prevention measure: in case user key in funny value for past num of mods
                        alert("Please enter a valid value for your past number of modules!");
                        displayMsg1.innerText = "";
                        return;
                    }
                    let overallGPA = ((pastGPA * pastNumMods) + cumulativeGPA * numSelected)  /  (numSelected + pastNumMods);
                    overallGPA = overallGPA.toFixed(2);
                    displayMsg1.innerText = "Your overall cumulative GPA will be " + overallGPA;
                
                }
            }



            // calculation for other unis
            // other uni's cumulative gpa = sum of (grade point * credit) divide by total credits
            else {
                let totalGPA = 0;
                let totalCredits = 0;
                var uniDicts = response.data;
                let uniObj = uniDicts[0];
                for (dict of uniDicts) {
                    if (dict.hasOwnProperty(inputUni)) {
                        uniObj = dict[inputUni];
                    }
                }
                // console.log(uniObj)
                // textFieldsList will generate [0: mod1, 1: credit1, 2: mod2, 3: credit2 ... ]
                let i = 0; // i indicates the mod index
                let j = 1; // j indicates the credit index
                let m = 0; // m indicates the loop index
                while (i <= numSelected * 2 && j <= numSelected * 2) {
                    // OR: while( i <= textFieldsList.length() )

                    // ensure user's input is valid first (can be found in the dictionary)
                    let gradeEntered = textFieldsList[i].value.trim().toUpperCase();
                    let creditEntered = textFieldsList[j].value;
                    if (typeof gradeEntered == "string" && uniObj.hasOwnProperty(gradeEntered)) {
                        let thisGPA = uniObj[gradeEntered];
                        creditEntered = parseFloat(creditEntered);
                        if (creditEntered < 10 && creditEntered > 0) {
                            totalCredits += creditEntered;
                            totalGPA += creditEntered * thisGPA;
                        }
                        else {
                            alert('Please ensure the credit entered for module ' + (parseInt(m) + 1) + " is valid! Your credit entered for the mod is either too large or too small!");
                            return;
                        }
                    }
                    else {
                        alert('Please ensure the grade entered for module ' + (parseInt(i) + 1) + " is valid!");
                        return;
                    }
                    m ++;
                    i += 2;
                    j += 2;
                }

                let cumulativeGPA = totalGPA / totalCredits;

                cumulativeGPA = cumulativeGPA.toFixed(2);
                // display the result in the displayMsg div:
                displayMsg = document.getElementById('displayMsg');
                displayMsg.innerText = "Your cumulative GPA for current semester is " + cumulativeGPA ;

                
                // calculate overall GPA taking past GPA and current GPA:
                var displayMsg1 = document.getElementById('displayMsg1');
                displayMsg1.scrollIntoView({ behavior: 'smooth' });
                let pastGPA = document.getElementById('pastGPA').value;
                let pastNumMods = document.getElementById('pastNumMods').value;
                if(pastGPA !== "" && !isNaN(parseFloat(pastGPA)) && pastNumMods != "" && !isNaN(parseFloat(pastGPA))){ // this is only for users who key in their past GPA and past number of mods correctly
                    pastGPA = parseFloat(pastGPA); 
                    pastNumMods = parseFloat(pastNumMods);
                    cumulativeGPA = parseFloat(cumulativeGPA);
                    if(pastGPA > 5 || pastGPA < 0){ // error prevention measure: in case user key in funny value for past gpa
                        alert("Please enter a valid value for your past GPA (0 to 5)!");
                        displayMsg1.innerText = "";
                        return;
                    }
                    if(pastNumMods < 0 || pastNumMods > 100){ // error prevention measure: in case user key in funny value for past num of mods
                        alert("Please enter a valid value for your past number of modules!");
                        displayMsg1.innerText = "";
                        return;
                    }
                    let overallGPA = ((pastGPA * pastNumMods) + cumulativeGPA * numSelected)  /  (numSelected + pastNumMods);
                    overallGPA = overallGPA.toFixed(2);
                    displayMsg1.innerText = "Your overall cumulative GPA will be " + overallGPA;
                
                }

            }

        })
        .catch(error => {
            console.error(error);
        });
}


// when user select a number k, this function will generate k text fields for user to enter his grades
function generateInputFields() {
    let displayMsg = document.getElementById('displayMsg');
    displayMsg.replaceChildren();
    var schoolSelectd = document.getElementById('university').value;
    var num_mod = document.getElementById('moduleCount').value;
    // just wanna be funny LMAO
    if (num_mod > 6) {
        alert("WOW You are crazy taking so many mods within one SEM?!")
    }
    // end of funny
    var modInputEle = document.getElementById('moduleInputs');
    modInputEle.replaceChildren();

    // for SMU: (SMU does not really have credit system for its mods, based on personal experience)
    if (schoolSelectd == 'smu') {
        // edit pastGPA field max value (SMU is 4.3):
        var labelEle_pastGPA = document.getElementById('pastGPA-label');
        labelEle_pastGPA.style.visibility = 'visible';
        var pastGPA_field = document.getElementById('pastGPA');
        pastGPA_field.style.visibility = 'visible';
        pastGPA_field.max = 4.3;

        let i = 1;
        while (i <= num_mod) {
            let moduleDiv = document.createElement('div');
            moduleDiv.classList.add('module');

            let label = document.createElement('label');
            label.textContent = 'Enter grade for module ' + i + ': ';

            // SMU only needs to take account for the number of mods and grade of each mod
            let input = document.createElement('input');
            input.type = 'text';
            input.id = 'grade' + i;
            input.style.display = "inline";
            input.style.marginLeft = '12px';
            input.style.width = '65%';
            input.style.maxWidth = '100%';
            input.setAttribute('required', true);
            input.classList.add('form-control');
            input.placeholder = 'A+, B, C-, etc (can be lowercase)';

            moduleDiv.appendChild(label);
            moduleDiv.appendChild(input);
            modInputEle.appendChild(moduleDiv);
            i++;
        }
    }
    // for SUTD:
    else if(schoolSelectd == 'sutd'){
        // edit pastGPA field max value (SUTD is 5.3):
        var labelEle_pastGPA = document.getElementById('pastGPA-label');
        labelEle_pastGPA.style.visibility = 'visible';
        var pastGPA_field = document.getElementById('pastGPA');
        pastGPA_field.style.visibility = 'visible';
        pastGPA_field.max = 5.3;


        let i = 1;
        while (i <= num_mod) {
            let moduleDiv = document.createElement('div');
            moduleDiv.classList.add('module');

            let label1 = document.createElement('label');
            label1.textContent = 'Enter grade for module ' + i + ': ';

            let input1 = document.createElement('input');
            input1.type = 'text';
            input1.id = 'grade' + i;
            input1.style.display = "inline";
            input1.style.marginLeft = '12px';
            input1.style.width = '65%';
            input1.setAttribute('required', true);
            input1.classList.add('form-control');
            input1.placeholder = 'A+, B, C-, etc (can be lowercase)';

            moduleDiv.appendChild(label1);
            moduleDiv.appendChild(input1);
            modInputEle.appendChild(moduleDiv);

            // beside the grade of each mod, SUTD must take consideration of credit worth of each mod
            let label2 = document.createElement('label');
            label2.textContent = 'Enter credit for module ' + i + ': ';
            let input2 = document.createElement('input');
            input2.type = 'number';
            input2.id = 'credit' + i;
            input2.style.display = "inline";
            input2.style.marginLeft = '12px';
            input2.style.width = '65%';
            input2.setAttribute('required', true);
            input2.classList.add('form-control');
            input2.placeholder = '2, 3, 4, etc.';
            
            moduleDiv.appendChild(label1);
            moduleDiv.appendChild(input1);
            moduleDiv.appendChild(label2);
            moduleDiv.appendChild(input2);
            modInputEle.appendChild(moduleDiv);

            i++;
        }
    }

    // for other unis: (other unis generally have credit system that weigh mods differently)
    else {
        // edit pastGPA field max value (other unis is 5.0):
        var labelEle_pastGPA = document.getElementById('pastGPA-label');
        labelEle_pastGPA.style.visibility = 'visible';
        var pastGPA_field = document.getElementById('pastGPA');
        pastGPA_field.style.visibility = 'visible';
        pastGPA_field.max = 5;


        let i = 1;
        while (i <= num_mod) {
            let moduleDiv = document.createElement('div');
            moduleDiv.classList.add('module');

            let label1 = document.createElement('label');
            label1.textContent = 'Enter grade for module ' + i + ': ';

            let input1 = document.createElement('input');
            input1.type = 'text';
            input1.id = 'grade' + i;
            input1.style.display = "inline";
            input1.style.marginLeft = '12px';
            input1.style.width = '65%';
            input1.setAttribute('required', true);
            input1.classList.add('form-control');
            input1.placeholder = 'A+, B, C-, etc (can be lowercase)';

            moduleDiv.appendChild(label1);
            moduleDiv.appendChild(input1);
            modInputEle.appendChild(moduleDiv);

            // beside the grade of each mod, other unis must take consideration of credit worth of each mod
            let label2 = document.createElement('label');
            label2.textContent = 'Enter credit for module ' + i + ': ';
            let input2 = document.createElement('input');
            input2.type = 'number';
            input2.id = 'credit' + i;
            input2.style.display = "inline";
            input2.style.marginLeft = '12px';
            input2.style.width = '65%';
            input2.setAttribute('required', true);
            input2.classList.add('form-control');
            input2.placeholder = '2, 3, 4, etc.';
            
            moduleDiv.appendChild(label1);
            moduleDiv.appendChild(input1);
            moduleDiv.appendChild(label2);
            moduleDiv.appendChild(input2);
            modInputEle.appendChild(moduleDiv);

            i++;
        }
    }

}

function showPastNumMods(){
    var label_NumMods = document.getElementById('pastMods-label');
    var pastNumMods = document.getElementById('pastNumMods');
    var pastGPA = document.getElementById('pastGPA').value;
    var displayMsg1 = document.getElementById('displayMsg1');
    displayMsg1.innerText = '';
    if(pastGPA == ""){
        label_NumMods.style.display = 'none';
        pastNumMods.style.display = 'none';
    }
    else{
        label_NumMods.style.display = 'block';
        pastNumMods.style.display = 'block';
    }

}


window.onscroll = function () {
    var backToTopBtn = document.getElementById('backToTopBtn');
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};
// Scroll to top when the "Back to Top" button is clicked
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('resize', function() {
    const calculateBtn = document.getElementById('fixedCalculateBtn');
    if (window.innerWidth <= 600) {
        calculateBtn.style.display = 'none';
    } 
    else{
        calculateBtn.style.display = 'block';
    }
});

// generate input fields when loaded
window.onload = generateInputFields;