import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, Setusers] = useState([]);
  const [filter, Setfilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        Setusers(response.data.user);
      });
  }, [filter]);
  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            Setfilter(e.target.value);
          }}
          type="text"
          className="shadow w-full"
          placeholder="Search users..."
        />
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center ml-6 text-lg mt-1.5 font-semibold">
          <div>{user.firstname}</div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstname);
          }}
          text={"Send Money"}
        ></Button>
      </div>
    </div>
  );
}

export default Users;
