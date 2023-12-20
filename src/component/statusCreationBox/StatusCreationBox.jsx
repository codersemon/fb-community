// dependencies 
import { Card } from "react-bootstrap";
import "./StatusCreationBox.scss";

const StatusCreationBox = () => {
  return (
    <Card className="status_creation_box">
                <Card.Body>
                    <div className="status_create_top d-flex">
                        <div className="avatar"><img className="rounded-circle" src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-1/324503666_575897801048520_7553017535435239467_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeHXZQ0bJaajHnNLak8c6ytKPi8ibBh8G-8-LyJsGHwb7-3W-_YqNxSK3vFsBvs0e6YPm6Xzl6WsdbzxHvjdgOic&_nc_ohc=QEsLseNhwZkAX85CmEX&_nc_ht=scontent.fdac7-1.fna&oh=00_AfDlW_L5iuotOv0WK9-dJv9tU3mSW8Yn2uNnKcdSP3QSNQ&oe=658693FA" alt="" /></div>

                        <input type="text" className="w-100" placeholder="What's on your mind, Emon?"/>
                    </div>

                    <div className="status_create_bottom border-top">
                        <ul className="d-flex justify-content-center align-items-center">
                            <li><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" /> <span>Live Video</span></li>
                            <li><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" /> <span>Photo/Video</span></li>
                            <li><img src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/t2NS5_5UwDb.png" /> <span>Reels</span></li>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
  )
}

export default StatusCreationBox