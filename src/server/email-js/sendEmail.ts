import emailjs from "@emailjs/browser";
import { Slide, toast } from "react-toastify";

const sendEmail = (form: HTMLFormElement) => {
  // Cek jika ada field kosong
  const formData = new FormData(form);
  let isEmpty = false;
  for (const value of formData.values()) {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    toast.error("U can't send empty message", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    return Promise.resolve(); // Tidak lanjut kirim email
  }

  return emailjs
    .sendForm(
      "service_o5nfvj8",
      "template_x5qswtk",
      form,
      "kI4SPDNcZFMmEpXU7"
    )
    .then(() => {
      toast.success('Message sent', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    })
    .catch(() => {
      toast.error('Failed to send message', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    });
};

export default sendEmail;
