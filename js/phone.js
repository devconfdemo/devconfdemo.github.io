// Wait for the DOM to fully load
window.onload = function () {

  const chatWindow = document.getElementById("chat-window");

  // Example messages array
  const messages = [
    { pause: true }, // Add a pause message here
    { text: "Hey, kun je feedback geven op mijn presentatie? https://youtu.be/EfECYoaznkc?", sender: "user" },
    { pause: true }, // Add a pause message here
    { text: "Ik heb er heen gekeken, en ik begrijp de ambitie die je hebt om live een applicatie te bouwen die aan het einde getoond en gebruikt kan worden. Indrukwekkend!", sender: "friend" },
    { text: "Ik begrijp ook dat je meteen van slag gaat...", sender: "friend" },
    { text: "Wat is het doel van je talk?", sender: "friend" },
    { pause: true }, // Add a pause message here
    { text: '"Kiek, sjiek he?"', sender: "user" },
    { pause: true },
    { text: "Dat is zeker gelukt!", sender: "friend" },
    { text: "Maar ik, als publiek, mis heel veel context! Ik zie heel veel invulschermen, maar waar kijk ik nu eigenlijk heen?", sender: "friend" },
    { text: "Je maakt architectuur keuzes die niet triviaal zijn, wat is de redenering daar achter?", sender: "friend" },
    { text: "Noemenswaardig dat je wilt bewijzen dat het werkt, en dit live wilt laten zien.", sender: "friend" },
    { text: "Hoeveel waarde hecht je aan dat bewijs?", sender: "friend" },
    { text: "Mag het ten kosten gaan van je verhaal?", sender: "friend" }
  ];

  let isPaused = false; // Flag to track if conversation is paused
  let index = 0; // Keep track of the message index

  // Function to scroll to the bottom of the chat
  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Function to add typing indicator as a bubble
  function addTypingIndicator(sender) {
    const typingBubble = document.createElement('div');
    typingBubble.className = `chat-bubble ${
      sender === "user" ? "user-bubble self-end" : "friend-bubble self-start"
    } rounded-lg shadow-md typing-bubble`;

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.style.backgroundColor = sender === "user" ? "#dcf8c6" : "#ececec"; // Match bubble color
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';

    typingBubble.appendChild(typingIndicator);
    chatWindow.appendChild(typingBubble); // Insert at the end of chat window

    // Scroll to the bottom after adding the typing indicator
    scrollToBottom();
  }

  // Function to replace typing indicator with actual message
  function replaceTypingWithMessage(text, sender) {
    const typingBubble = document.querySelector('.typing-bubble');
    if (typingBubble) {
      typingBubble.classList.remove('typing-bubble');
      typingBubble.innerHTML = text; // Replace with the actual message
      scrollToBottom();
      if (sender === "friend"){
        playAlert("pop");
      }
    }
  }

  // Add messages with delay to simulate conversation
  function showNextMessage() {
    if (index < messages.length) {
      const message = messages[index];

      // Check if the message is a pause message
      if (message.pause) {
        isPaused = true;
        index++;
        return; // Stop the animation when the message is a pause
      }

      const { text, sender } = message;
      addTypingIndicator(sender); // Add the typing indicator bubble

      let wait = sender == 'friend' ? 1500 : 10;
      setTimeout(() => {
        replaceTypingWithMessage(text, sender); // Replace typing indicator with actual message
        index++;
        if (!isPaused) {
          setTimeout(showNextMessage, 2000); // Wait 2 seconds before the next message
        }
      }, wait); // Typing delay
    }
  }

  // Attach to the button click to start/resume the conversation
  window.addEventListener('message', function() {
    if (isPaused) {
      isPaused = false; // Resume if paused
    }
    showNextMessage(); // Start or resume the conversation
  });
}