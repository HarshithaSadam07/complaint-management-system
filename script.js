let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

document.getElementById("complaintForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const newComplaint = {
    id: complaints.length + 1,
    name,
    category,
    description,
    status: "Pending",
    feedback: ""
  };

  complaints.push(newComplaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
  this.reset();
  renderComplaints();
});

// Update complaint status (Admin simulation)
function updateStatus(id) {
  const complaint = complaints.find(c => c.id === id);
  if (complaint.status === "Pending") complaint.status = "In Progress";
  else if (complaint.status === "In Progress") complaint.status = "Resolved";
  else if (complaint.status === "Resolved") complaint.status = "Closed";
  localStorage.setItem("complaints", JSON.stringify(complaints));
  renderComplaints();
}

// Add feedback
function addFeedback(id, feedbackText) {
  const complaint = complaints.find(c => c.id === id);
  complaint.feedback = feedbackText;
  localStorage.setItem("complaints", JSON.stringify(complaints));
  renderComplaints();
}

// Render complaints table
function renderComplaints() {
  const tbody = document.querySelector("#complaintsTable tbody");
  tbody.innerHTML = "";

  complaints.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.category}</td>
      <td>${c.description}</td>
      <td class="status-${c.status.toLowerCase().replace(" ", "")}">${c.status}</td>
      <td>
        <input type="text" class="feedback-input" value="${c.feedback}" 
               onchange="addFeedback(${c.id}, this.value)" 
               placeholder="Feedback...">
      </td>
      <td><button onclick="updateStatus(${c.id})">Next Status</button></td>
    `;
    tbody.appendChild(row);
  });
}

renderComplaints();
