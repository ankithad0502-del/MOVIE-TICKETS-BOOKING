// Page 1 → Move to seat page
function goToSeats() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const bus = document.getElementById("bus").value;

    if (!from || !to || !date) return alert("Please fill all fields");

    localStorage.setItem("booking", JSON.stringify({ from, to, date, bus }));
    window.location.href = "seats.html";
}

// Seat Generation
let selectedSeats = [];
const pricePerSeat = 300;

function loadSeats() {
    const seatMap = document.getElementById("seat-map");
    if (!seatMap) return;

    for (let i = 1; i <= 20; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = i;
        seat.onclick = () => toggleSeat(i, seat);
        seatMap.appendChild(seat);
    }
}

function toggleSeat(seatNo, element) {
    if (selectedSeats.includes(seatNo)) {
        selectedSeats = selectedSeats.filter(s => s !== seatNo);
        element.classList.remove("selected");
    } else {
        selectedSeats.push(seatNo);
        element.classList.add("selected");
    }
    document.getElementById("total").innerText = "Total: ₹" + (selectedSeats.length * pricePerSeat);
}

function confirmSeats() {
    if (selectedSeats.length === 0) return alert("Select at least one seat");

    localStorage.setItem("seats", JSON.stringify(selectedSeats));
    window.location.href = "confirm.html";
}

// Final Ticket Display
function loadTicket() {
    const booking = JSON.parse(localStorage.getItem("booking"));
    const seats = JSON.parse(localStorage.getItem("seats"));
    const ticket = document.getElementById("ticket");

    if (!booking || !seats) return;

    ticket.innerHTML = `
        <h3>Bus: ${booking.bus}</h3>
        <p><b>From:</b> ${booking.from}</p>
        <p><b>To:</b> ${booking.to}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Seats:</b> ${seats.join(", ")}</p>
        <h2>Total Paid: ₹${seats.length * pricePerSeat}</h2>
        <h3 style="color:green;">Your journey is confirmed ✔</h3>
    `;

    // Clear after confirmation
    localStorage.clear();
}

// Auto trigger functions
loadSeats();
loadTicket();
