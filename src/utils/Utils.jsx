// dependencies 
import Swal from "sweetalert2";

// validation function
export function validationFunc(e) {
  const nextSibling = e.target.nextSibling;
  if (!e.target.value) {
    e.target.classList.add("not-valid");
    if (e.target.nextSibling) {
      nextSibling.classList.add("active");
    }
  } else {
    e.target.classList.remove("not-valid");
    if (e.target.nextSibling) {
      nextSibling.classList.remove("active");
    }
  }
}

// toast auto dismiss after 3sec 
export const createToast = Swal.mixin({
  toast: true,
  position: "top-end",
  icon: "success",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});


// time ago function - if time older than 30 dyas then will show date otherwise show ago
export function timeAgo(timestamp) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  const seconds = Math.floor((currentDate - inputDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return inputDate.toLocaleDateString(undefined, options);
  }
}
