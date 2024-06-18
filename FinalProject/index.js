document.addEventListener('DOMContentLoaded', function() {
  const firstText = document.querySelector("#email");
  const lastText = document.querySelector("#pwd");
  const submitBtn = document.querySelector("#submitBtn");
  const cookieBtn = document.querySelector("#cookieBtn");

  if (submitBtn) {
      submitBtn.addEventListener("click", handleSubmit);
  }

  if (cookieBtn) {
      cookieBtn.addEventListener("click", handleCookieRetrieval);
  }

  function handleSubmit(event) {
      event.preventDefault();

      const email = firstText.value.trim();
      const password = lastText.value.trim();

      if (!email) {
          alert('Please enter your email.');
          return;
      }

      if (!isValidEmail(email)) {
          alert('Please enter a valid email address.');
          return;
      }

      if (!password) {
          alert('Please enter your password.');
          return;
      }

      alert('Welcome to our community');

      // Save email and password to cookies
      setCookie("email", email, 365);
      setCookie("pwd", password, 365);

      // Optional: Submit the form programmatically
      document.getElementById('signupForm').submit();

      // Reset form fields (optional)
      firstText.value = '';
      lastText.value = '';
  }

  function handleCookieRetrieval() {
      const emailFromCookie = getCookie("email");
      const passwordFromCookie = getCookie("pwd");

      if (emailFromCookie && passwordFromCookie) {
          firstText.value = emailFromCookie;
          lastText.value = passwordFromCookie;
          alert('Credentials retrieved from cookies.');
      } else {
          alert('No saved credentials found.');
      }
  }

  function setCookie(name, value, daysToLive) {
      const date = new Date();
      date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
  }

  function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  function getCookie(name) {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split('; ');

      for (let cookie of cookieArray) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName === name) {
              return cookieValue;
          }
      }

      return null;
  }

  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
});
