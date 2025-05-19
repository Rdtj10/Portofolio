import emailjs from "@emailjs/browser";
import { Slide, toast } from "react-toastify";

const sendEmail = (form: HTMLFormElement) => {
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
