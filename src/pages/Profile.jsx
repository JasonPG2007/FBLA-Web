export default function Profile() {
    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "15% 50% 15%",
                    gap: "50px",
                    // backgroundColor: "pink",
                    position: "relative",
                }}>

                {/* Menu for profile */}
                <div style={{
                    backgroundColor: "#ffbd83",
                    marginLeft: "-100px",
                    borderTopRightRadius: "12px",
                    padding: "40px 20px",
                    marginTop: "100px",
                    borderBottomRightRadius: "12px",
                    position: "relative",
                    height: "700px",
                    width: "100%"
                }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            marginBottom: "40px",
                        }}>

                        {/* Icon */}
                        <img src="./Image/user_icon.png" alt="avatar"
                            style={{
                                borderRadius: "100%",
                                width: "60px",
                            }} />
                        <h3 style={{
                            fontWeight: "500"
                        }}>User name</h3>
                    </div>

                    {/* Personal information  */}
                    <a href="/profile" style={{
                        fontWeight: "400",
                        lineHeight: "50px",
                    }}> <i class="fa-solid fa-user"></i> Personal information</a>
                    <br />
                    {/* My post */}
                    <a href="/my-post" style={{
                        fontWeight: "400",
                        lineHeight: "50px",
                    }}> <i class="fa-solid fa-sim-card"></i> My post</a>
                    <br />
                    {/* Messeges */}
                    <a href="/messeges" style={{
                        fontWeight: "400",
                        lineHeight: "50px",
                    }}> <i class="fa-solid fa-envelope"></i> Messeges</a>
                    <br />
                    {/* Notifications */}
                    <a href="/notifications" style={{
                        fontWeight: "400",
                        lineHeight: "50px",
                    }}> <i class="fa-solid fa-bell"></i> Notifications</a>
                    <br />
                    {/* Log out */}
                    <a href="/log-out" style={{
                        fontWeight: "400",
                        position: "absolute",
                        bottom: "20px",
                    }}> <i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</a>
                </div>

                {/* Name of profile */}
                <div style={{ display: "flex", marginTop: "100px" }}>
                    <div style={{ width: "100%" }}>
                        <h1
                            style={{
                                fontFamily: "Mochiy Pop One, sans-serif",
                                fontSize: "20px",
                                fontWeight: "100",
                                marginLeft: "10px"
                            }}>
                            My profile
                        </h1>
                        <table border="0" style={{
                            padding: "10px",
                            textAlign: "left",
                            width: "100%",
                        }}>
                            <tr className="table-tr">
                                <th style={{ fontWeight: "600", paddingRight: "100px" }} className="input">
                                    Name:
                                </th>
                                <td style={{ verticalAlign: "top" }} className="table-td">
                                    <input placeholder="Ex: Jennie Nguyen" type="text" className="form-control-input-label-top" />
                                </td>
                            </tr>
                            <tr className="table-tr"><th style={{ fontWeight: "600" }}>Phone number: </th><td style={{ verticalAlign: "top" }} className="table-td"><input placeholder="Ex: 123 456 789" type="number" className="form-control-input-label-top" /></td></tr>
                            <tr className="table-tr"><th style={{ fontWeight: "600" }}><label>Email: </label></th><td style={{ verticalAlign: "top" }} className="table-td"><input placeholder="Ex: demo@ex.io" type="email" className="form-control-input-label-top" /></td></tr>
                            <tr className="table-tr"><th style={{ fontWeight: "600" }}><label>New pasword: </label></th><td style={{ verticalAlign: "top" }} className="table-td"><input placeholder="Enter new pasword" type="password" className="form-control-input-label-top" /></td></tr>
                            <tr className="table-tr"><th style={{ fontWeight: "600" }}><label>Old password*: </label></th><td style={{ verticalAlign: "top" }} className="table-td"><input placeholder="Confirm new password" type="password" className="form-control-input-label-top" /></td></tr>
                        </table>

                        {/* Notify me */}
                        <div
                            style={{
                                padding: "10px 10px 30px",
                            }}>
                            <div
                                style={{
                                    padding: " 10px 0 10px",
                                }}>
                                <div>
                                    <input type="checkbox" name="" id="" style={{ marginRight: "10px" }} />
                                    <label style={{

                                        textAlign: "center",
                                        fontSize: "14px",
                                        color: "#072138",
                                        marginRight: "50%",
                                        className: "notify-text",
                                        marginBottom: "10px",
                                    }}>
                                        Notify me when there is a new lost stuff post
                                    </label>
                                </div>

                                <div>
                                    <input type="checkbox" name="" id="" style={{ marginRight: "10px" }} />
                                    <label style={{

                                        textAlign: "center",
                                        fontSize: "14px",
                                        color: "#072138",
                                        marginRight: "48%",
                                        className: "notify-text",
                                        marginBottom: "10px",
                                    }}>
                                        Notify me when there is a new found stuff post
                                    </label>
                                </div>

                                <div>
                                    <input type="checkbox" name="" id="" style={{ marginRight: "10px" }} />
                                    <label style={{

                                        textAlign: "center",
                                        fontSize: "14px",
                                        color: "#072138",
                                        marginRight: "45%",
                                        className: "notify-text",
                                    }}>
                                        Notify me when there is a post that similar to mine
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn-yellow" style={{ width: "100%" }}>
                            Save changes
                        </button>
                    </div>


                </div>

                {/* Avatar */}
                <div style={{ marginLeft: "100px", }}>
                    <img src="./Image/keychain.avif" alt="avatar"
                        style={{
                            borderRadius: "12px",
                            width: "420px",
                            marginTop: "150px",
                        }} />
                    <div style={{
                        display: "flex",
                        gap: "20px",
                    }}>
                        <div>
                            <button className="btn-with-border" style={{
                                borderColor: "#ec7207",
                            }}>
                                Change
                            </button>
                        </div>
                        <div>
                            <button className="btn-with-border" style={{
                                borderColor: "#ec7207",
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
