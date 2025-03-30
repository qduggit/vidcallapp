const roomUrl = 'https://videocalll.daily.co/meetingggg';
let callFrame;

window.onload = async () => {
  document.getElementById('roomName').textContent = 'meetingggg';
  
  callFrame = window.DailyIframe.createFrame(document.getElementById('videoContainer'), {
    showLeaveButton: true,
    iframeStyle: { width: '100%', height: '600px' }
  });

  await callFrame.join({ url: roomUrl });
  updateParticipants();

  callFrame.on('participant-joined', updateParticipants);
  callFrame.on('participant-updated', updateParticipants);
  callFrame.on('participant-left', updateParticipants);
};

function updateParticipants() {
  const participants = callFrame.participants();
  const participantList = Object.values(participants)
    .map(p => `<p>${p.user_name || 'Guest'}</p>`)
    .join('');
  document.getElementById('participants').innerHTML = `<h3>Participants:</h3>${participantList}`;
}

function leaveRoom() {
  callFrame.leave();
  window.location.href = '/auth/logout';
}