
const userData = localStorage.getItem("user");
if (!userData) {
    setTimeout(() => {
        document.getElementById("background-light").style.display = "flex";
    }, 5000);
}
document.getElementById("doneButton").addEventListener("click", () => {
    window.location.href = "/login";
});
        user = JSON.parse(userData); 
const form = document.querySelector('.booking-form');
document.querySelector(".dropdown-toggle").innerHTML="Welcome 🤗 "+user.name;
 form.addEventListener('submit', function(event) {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const checkInDate = document.getElementById('check-in').value;
    const checkOutDate = document.getElementById('check-out').value;
    const roomType = document.getElementById('room-type').value;
    const numberOfGuests = document.getElementById('guests').value;
    if(checkOutDate>checkInDate){
        const bookingData = {
            userId: user.id, 
            roomType,
            checkInDate,
            checkOutDate,
            numberOfGuests
        };
        fetch("/roomBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
           console.log(data);
            if (data.message) {
                window.location.href = "/payment";
                alert(data.message); 
            
            }
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
            alert("An error occurred while booking the room. Please try again.");
        });
    }else{
        alert("Check-out date must be later than check-in date.");
    }
});
    const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
});
function local(){
    localStorage.removeItem('user');
}