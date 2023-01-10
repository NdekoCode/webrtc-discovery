document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.querySelector("#start");
  /**Will be called on succed si l'utilisateur accepte l'utilisation du micro et de la webcam */
  const onSuccess = (stream) => {
    const senderVideo = document.getElementById("sender-video");
    senderVideo.srcObject = stream;
    senderVideo.play();
    console.log(senderVideo.srcObject);
  };

  /**Will be called on succed si l'utilisateur refuse l'utilisation du micro et de la webcam */
  const onError = (error) => {};
  const params = {
    video: true,
    audio: true,
  };
  btnStart.addEventListener("click", () => {
    navigator.getUserMedia(params, onSuccess, onError);
  });
});
