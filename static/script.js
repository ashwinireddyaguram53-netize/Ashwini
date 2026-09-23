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



let cards=document.querySelectorAll(".food-card");



cards.forEach(card=>{


let check=
card.querySelector("input[type='checkbox']");



if(check.checked){


let food=
card.querySelector(".food-name").innerText;



let quantity=
card.querySelector(".quantity").value;



let unit=
card.querySelector(".unit").innerText;



if(quantity==""){


alert(
"Enter quantity for "+food
);

return;


}



items.push({

food:food,

quantity:Number(quantity),

unit:unit


});


}



});






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


alert(result.message);


})



.catch(error=>{


console.log(error);

alert("Error submitting feedback");


});



}