import React from "react";
const ResetPassword = () => {
    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1>Forgot Password</h1>
                <form>
                    <div className="userName">
                        {/* <label htmlFor="userName">Email</label> */}
                        <input
                            placeholder="Email"
                            type="text"
                            name="email"
                        // onChange={handleChange}
                        // value={loginInfo.userName}
                        />
                        
                    </div>
                    <div className="createAccount">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )


}

export default ResetPassword

