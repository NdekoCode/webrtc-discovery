document.addEventListener("DOMContentLoaded", function () {
  /** On annule le comportemen par defaut du formulaire */
  document.getElementById("incoming").addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  // On definit un ensemble d'evenement qui seront detecter et executer lors de la connexion peep to Peer
  const bindEvent = (peerConnexion) => {
    document.getElementById("incoming").addEventListener("submit", (evt) => {
      peerConnexion.signal(JSON.parse(document.getElementById("text").value));
    });
    peerConnexion.on("error", (err) => {
      console.log(err);
    });
    peerConnexion.on("signal", (data) => {
      document.getElementById("offer").value = JSON.stringify(data);
    });
    peerConnexion.on("stream", (stream) => {
      const video = document.getElementById("receiver-video");
      video.volume = 0;
      video.srcObject = stream;
      video.play();
    });
  };
  // Le button pour demarrer LA CONVERSION
  const btnStart = document.getElementById("start");
  // On fait la compatibilité avec les autres utilisateurs
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  /**
   * La fonction pour initialiser une connexion en peer to peer
   * @param {Boolean} initiator
   */
  const startPeer = (initiator = true) => {
    const onSuccess = (stream) => {
      const peerConnexion = new SimplePeer({
        initiator: initiator,
        stream: stream,
        trickle: false,
      });
      bindEvent(peerConnexion);

      const videoEmitter = document.getElementById("emitter-video");
      videoEmitter.volume = 0;
      videoEmitter.srcObject = stream;
      videoEmitter.play();
    };
    navigator.getUserMedia(
      {
        video: true,
        audio: true,
      },
      onSuccess,
      () => {}
    );
  };
  /** Le boutton pour demarrer la communication */
  btnStart.addEventListener("click", () => {
    startPeer(true);
  });
  /** Le boutton pour receivoir la communication */
  const btnReceiver = document.getElementById("receive");
  btnReceiver.addEventListener("click", () => {
    startPeer(false);
  });
});
