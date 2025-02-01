document.getElementById('contact-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const form = event.target;
  const formData = new FormData(form);

  try {
      // Send the form data to FormSpree
      const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
              Accept: 'application/json',
          },
      });

      if (response.ok) {
          // Show success message
          document.getElementById('status-message').classList.remove('hidden');
          form.reset(); // Reset the form fields
      } else {
          console.error('Form submission failed.');
      }
  } catch (error) {
      console.error('An error occurred:', error);
  }
});