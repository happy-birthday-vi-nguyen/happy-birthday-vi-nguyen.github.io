// Script: handle clickable gift intro -> show invitation
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro-screen');
  const giftContainer = document.getElementById('open-gift');
  const giftBox = giftContainer && giftContainer.querySelector('.gift-box');
  const invitation = document.getElementById('invitation');

  if (!intro || !giftContainer || !invitation) return;

  // Click handler: animate lid and show invitation
  giftContainer.addEventListener('click', () => {
    // add class to animate lid
    if (giftBox) giftBox.classList.add('open');

    // small delay so lid lifts before switching
    setTimeout(() => {
      intro.classList.add('hidden');
      invitation.classList.remove('hidden');
      // trigger reveal animation
      invitation.classList.add('opened');
    }, 600);
  });
});
