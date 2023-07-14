import axios from 'axios';

const userService = () => {

    const API = "http://localhost:5000/api/";

    const addUser = (userInfo) => {
        axios.post(API + 'users/register', userInfo)
            .then(res => console.log(res))
            .catch(err => console.log('user authentication error'))

    }

    const logUser = async (logInfo) => {
        return await axios.post(API + 'login', logInfo);
    }

    const getUsers = () => {
        axios.get("http://localhost:5000/api/users")
            .then(res => {
                const data = res.data
                // setUsersList(res.data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    const updateUser = (name, newInfo) => {
        axios.post(API + `users/update/${name}`, newInfo)
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return {
        addUser: addUser,
        getUsers: getUsers,
        logUser: logUser,
        updateUser: updateUser
    }
}

export default userService;