document.getElementById('departmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const department = document.querySelector('input[name="department"]:checked');
    const name = document.getElementById('name').value.trim();
    const regNo = document.getElementById('regNo').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const reason = document.getElementById('reason').value.trim();

    if (!department || !name || !regNo || !phone || !reason) {
        alert('Please fill out all fields.');
        return;
    }

    const formData = new FormData();
    formData.append('department', department.value);
    formData.append('name', name);
    formData.append('regNo', regNo);
    formData.append('phone', phone);
    formData.append('reason', reason);

    // Send the form data to Google Apps Script using fetch
    fetch('https://script.google.com/macros/s/AKfycbwXAIVU8ro2_uDHO0zb9gPVLzbFY9VosKnRyeVETqwNEKXV2PvMU_sfQqbT35b3D48giw/exec', {
        method: 'POST',
        body: formData
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // Hide the form and show the submission message
            document.getElementById('form-container').style.display = 'none';
            const submitMessage = document.getElementById('submitMessage');
            submitMessage.style.display = 'block';
            submitMessage.style.opacity = 0;

            // Fade in the submit message
            setTimeout(function() {
                submitMessage.style.transition = 'opacity 0.5s ease-in-out';
                submitMessage.style.opacity = 1;
            }, 100);
        } else {
            alert('There was an error submitting your response. Please try again.');
            console.error(data.error);
        }
    })
    .catch(error => {
        alert('An error occurred while submitting the form.');
        console.error('Error:', error);
    });
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('departmentForm').reset();
});
