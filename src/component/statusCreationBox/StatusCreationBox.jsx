// dependencies
import { Button, Card, Modal } from "react-bootstrap";
import "./StatusCreationBox.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createToast } from "../../utils/Utils";
import Swal from "sweetalert2";
import axios from "axios";

const StatusCreationBox = ({ getTimelineItems }) => {
  // status creation modal state
  const [statusModal, setStatusModal] = useState(false);
  // handle show status creation modal
  const handleStatusModalOpen = () => {
    setStatusModal(true);
  };
  // handle hide status creation modal
  const handleStatusModalClose = () => {
    setStatusModal(false);
  };

  // status input state
  const [statusInput, setStatusInput] = useState({
    message: "",
    video_url: "",
    photo_url: "",
    createdAt: Date.now(),
  });
  //  handle status input
  const handleStatusInput = (e) => {
    setStatusInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // handle status submission
  const handleStatusSubmission = (e) => {
    e.preventDefault();

    // validation
    if (
      !statusInput.message &&
      !statusInput.video_url &&
      !statusInput.photo_url
    ) {
      createToast.fire({ title: "At least one field required!" });
    } else {
      // status publish confirmation box
      Swal.fire({
        title: "Do you want to publish?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          // send data to db
          axios.post("http://localhost:5000/status_posts", statusInput);
          //   show data creation message
          Swal.fire("Status Created!", "", "success");

          // show lates status in timeline after status creation
          getTimelineItems();

          //   close modal after submission
          setStatusModal(false);

          // reset input after submission
          setStatusInput({
            message: "",
            video_url: "",
            photo_url: "",
          });
        }
      });
    }
  };

  return (
    <>
      <Card className="status_creation_box">
        <Card.Body>
          <div className="status_create_top d-flex">
            <div className="avatar">
              <img
                className="rounded-circle"
                src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-1/324503666_575897801048520_7553017535435239467_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeHXZQ0bJaajHnNLak8c6ytKPi8ibBh8G-8-LyJsGHwb7-3W-_YqNxSK3vFsBvs0e6YPm6Xzl6WsdbzxHvjdgOic&_nc_ohc=QEsLseNhwZkAX85CmEX&_nc_ht=scontent.fdac7-1.fna&oh=00_AfDlW_L5iuotOv0WK9-dJv9tU3mSW8Yn2uNnKcdSP3QSNQ&oe=658693FA"
                alt=""
              />
            </div>

            <input
              type="text"
              className="w-100"
              placeholder="What's on your mind, Emon?"
              onClick={handleStatusModalOpen}
              value={statusInput.message}
            />
          </div>

          <div className="status_create_bottom border-top">
            <ul className="d-flex justify-content-center align-items-center">
              <li>
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" />{" "}
                <span>Live Video</span>
              </li>
              <li onClick={handleStatusModalOpen}>
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />{" "}
                <span>Photo/Video</span>
              </li>
              <li>
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/t2NS5_5UwDb.png" />{" "}
                <span>Reels</span>
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>

      {/* Status Creation Modal -- Start  */}
      <Modal
        show={statusModal}
        onHide={handleStatusModalClose}
        centered
        className="status_creation_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Create Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="status_visibility_wrap d-flex align-items-center">
            <Link>
              <img
                className="rounded-circle"
                src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-1/324503666_575897801048520_7553017535435239467_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeHXZQ0bJaajHnNLak8c6ytKPi8ibBh8G-8-LyJsGHwb7-3W-_YqNxSK3vFsBvs0e6YPm6Xzl6WsdbzxHvjdgOic&_nc_ohc=QEsLseNhwZkAX85CmEX&_nc_ht=scontent.fdac7-1.fna&oh=00_AfDlW_L5iuotOv0WK9-dJv9tU3mSW8Yn2uNnKcdSP3QSNQ&oe=658693FA"
              />
            </Link>
            <div className="content d-flex flex-column">
              <p>Emon Khan</p>
              <select name="status_visibility">
                <option value="public">🌍Public</option>
                <option value="friends">👱 Friends</option>
                <option value="private">🔒 Only Me</option>
              </select>
            </div>
          </div>

          <div className="inputs_wrap mt-3">
            <form onSubmit={handleStatusSubmission}>
              <div>
                <textarea
                  className="w-100"
                  placeholder="What's on your mind, Emon ?"
                  name="message"
                  value={statusInput.message}
                  onChange={handleStatusInput}
                ></textarea>
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  className="w-100"
                  name="video_url"
                  placeholder="Youtube Video url"
                  value={statusInput.video_url}
                  onChange={handleStatusInput}
                />
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  className="w-100"
                  name="photo_url"
                  placeholder="Photo url"
                  value={setStatusInput.photo_url}
                  onChange={handleStatusInput}
                />
              </div>

              <Button type="submit" className="px-4">
                Post
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* Status Creation Modal -- End  */}
    </>
  );
};

export default StatusCreationBox;
