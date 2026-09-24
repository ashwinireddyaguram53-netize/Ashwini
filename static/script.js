alert("JavaScript connected");

function submitFeedback(){

 alert("Submit button clicked");
 let date =
document.getElementById("date").value;


let name =
document.getElementById("name").value;


let rating =
document.getElementById("rating").value;


let suggestion =
document.getElementById("suggestion").value;




if(date==""){

alert("Please select date");
return;

}



if(name==""){

alert("Please enter name");
return;

}




let items=[];

let valid = true;

let cards=document.querySelectorAll(".food-card");



cards.forEach(card=>{


let check=
card.querySelector("input[type='checkbox']");



if(check.checked){


let food=
card.querySelector(".food-name").innerText;



let quantity=
card.querySelector(".quantity").value;


if(quantity==""){

alert(
"Enter quantity for "+food
);

return;

}


if(Number(quantity)<0){

alert(
"Quantity cannot be negative for "+food
);

valid = false;

return;

}



let unit=
card.querySelector(".unit").innerText;






items.push({

food:food,

quantity:Number(quantity),

unit:unit


});


}



});


if(!valid){

    return;

}



if(items.length==0){

alert("Select breakfast item");

return;

}





let data={


date:date,

name:name,

items:items,

rating:rating,

suggestion:suggestion


};







fetch("/submit",{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(data)


})



.then(res=>res.json())


.then(result=>{


if(result.status=="success"){


document.body.innerHTML = `

<div class="thank-you">

<h1>🙏 Thank You!</h1>

<h2>Your breakfast response has been submitted successfully.</h2>

<p>
Your feedback helps the kitchen department to plan the breakfast quantity.
</p>

</div>


`;


}


else{


alert(result.message);


}


})



.catch(error=>{


console.log(error);

alert("Error submitting feedback");


});



}
