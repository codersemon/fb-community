// dependencies
import { Button, Card, CardBody, Modal } from "react-bootstrap";
import "./StatusView.scss";
import { Link } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiThumbsUpLight, PiShareFatLight } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { createToast, timeAgo } from "../../utils/Utils";

const StatusView = ({ message, video, photo, id, getTimelineItems, timeStamp }) => {
  /**
   * DELETE STATUS BY ID
   * @param {*} id - GETTING ID FROM PROPS
   */
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1877f2",
      cancelButtonColor: "#B94A48",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleting status by id
        axios.delete(`http://localhost:5000/status_posts/${id.id}`);

        // reload timeline
        getTimelineItems();

        Swal.fire({
          title: "Deleted!",
          text: "Your status has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // update status modal state
  const [updateModal, setUpdateModal] = useState(false);
  // show update modal function
  const handleUpdateModalShow = (id) => {
    setUpdateModal(true);
    setInputFromDB(id);
  };
  // show update modal function
  const handleUpdateModalHide = () => {
    setUpdateModal(false);

    // reset form after modal close
    setStatusUpdateInput({
      message: "",
      video_url: "",
      photo_url: "",
    });
  };

  const [statusUpdateInput, setStatusUpdateInput] = useState({
    message: "",
    video_url: "",
    photo_url: "",
    id: "",
  });

  async function setInputFromDB(id) {
    const response = await axios.get(
      `http://localhost:5000/status_posts/${id.id}`
    );

    setStatusUpdateInput({
      message: response.data.message,
      video_url: response.data.video_url,
      photo_url: response.data.photo_url,
      id: id.id,
    });
  }

  const handleStatusUpdateInput = (e) => {
    setStatusUpdateInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStatusEdit = (e) => {
    e.preventDefault();

    // validation
    if (
      !statusUpdateInput.message &&
      !statusUpdateInput.video_url &&
      !statusUpdateInput.photo_url
    ) {
      createToast.fire({ title: "At least one field required!" });
    } else {
      // status publish confirmation box
      Swal.fire({
        title: "Do you want to Update?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          // send data to db
          axios.patch(
            `http://localhost:5000/status_posts/${statusUpdateInput.id}`,
            {
              message: statusUpdateInput.message,
              video_url: statusUpdateInput.video_url,
              photo_url: statusUpdateInput.photo_url,
            }
          );
          //   show data creation message
          Swal.fire("Status Updated!", "", "success");

          // show lates status in timeline after status creation
          getTimelineItems();

          //   close modal after submission
          handleUpdateModalHide();

          // reset input after submission
          setStatusUpdateInput({
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
      <Card className="status_item_content">
        <CardBody>
          <div className="status_top d-flex justify-content-between">
            <div className="top-left d-flex align-items-center">
              <Link>
                <img src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-1/324503666_575897801048520_7553017535435239467_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeHXZQ0bJaajHnNLak8c6ytKPi8ibBh8G-8-LyJsGHwb7-3W-_YqNxSK3vFsBvs0e6YPm6Xzl6WsdbzxHvjdgOic&_nc_ohc=QEsLseNhwZkAX85CmEX&_nc_ht=scontent.fdac7-1.fna&oh=00_AfDlW_L5iuotOv0WK9-dJv9tU3mSW8Yn2uNnKcdSP3QSNQ&oe=658693FA" />
              </Link>
              <div className="content">
                <Link>Emon Khan</Link>
                <div className="status-right"></div>
                <p>
                  {timeAgo(timeStamp)} · <FaGlobeAmericas />
                </p>
              </div>
            </div>

            <div className="top-right">
              <p>
                <HiDotsHorizontal />
              </p>
              <ul className="status_action">
                <li onClick={() => handleUpdateModalShow({ id })}>
                  <FiEdit /> Edit
                </li>
                <li onClick={() => handleDelete({ id })}>
                  <FiTrash2 /> Delete
                </li>
              </ul>
            </div>
          </div>

          <div className="status_content">
            {message && <p>{message}</p>}
            {/* show if have video & photo  */}
            {photo && video && (
              <div className="image_video d-flex">
                <img src={photo} />{" "}
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.split('=')[1]}`}
                ></iframe>
              </div>
            )}
            {/* show if have only photo  */}
            {photo && !video && <img src={photo} />}
            {/* show if have only video  */}
            {video && !photo && (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.split('=')[1]}`}
              ></iframe>
            )}
          </div>

          <div className="status_actions">
            <div className="actions_top d-flex justify-content-between">
              <div className="left">
                <img
                  height="18"
                  src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                />
                <img
                  height="18"
                  src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                />
                <span className="total_reactions">250</span>
              </div>
              <div className="right d-flex">
                <p>
                  <span className="total_comments">32</span> comments
                </p>
                <p>
                  <span className="total_shares">9</span> shares
                </p>
              </div>
            </div>

            <div className="actions_bottom">
              <ul className="d-flex">
                <li>
                  <PiThumbsUpLight /> Like
                </li>
                <li>
                  <LuMessageCircle /> Comment
                </li>
                <li>
                  <PiShareFatLight /> Share
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Status Edit Modal -- Start  */}
      <Modal show={updateModal} onHide={handleUpdateModalHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleStatusEdit}>
            <div>
              <label>Status</label>
              <textarea
                className="w-100"
                placeholder="What's on your mind, Emon ?"
                name="message"
                value={statusUpdateInput.message}
                onChange={handleStatusUpdateInput}
              ></textarea>
            </div>

            <div className="mb-2">
              <label>Youtube Video URL</label>
              <input
                type="text"
                className="w-100"
                name="video_url"
                placeholder="Video url"
                value={statusUpdateInput.video_url}
                onChange={handleStatusUpdateInput}
              />
            </div>

            <div className="mb-2">
              <label>Photo URL</label>
              <input
                type="text"
                className="w-100"
                name="photo_url"
                placeholder="Photo url"
                value={statusUpdateInput.photo_url}
                onChange={handleStatusUpdateInput}
              />
            </div>

            <input type="hidden" name="id" value={statusUpdateInput.id} />
            <Button type="submit" className="px-4">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Status Edit Modal -- End  */}
    </>
  );
};

export default StatusView;
