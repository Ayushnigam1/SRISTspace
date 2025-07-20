import React, { useContext } from 'react';
import { FiCheckCircle, FiMail } from 'react-icons/fi';
import { Button } from '@material-ui/core';
import { UserContext } from "../users/UserAuthContext";
import Avatar from 'react-avatar';

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="max-w-5xl mx-auto p-2 bg-white rounded-3xl  mt-10 flex flex-col md:flex-row md:justify-between gap-10">
      {/* Left: Avatar + Info */}
      <div className="flex flex-col items-center md:items-start md:w-1/3">
        <Avatar
          name={user.name as string || "Guest User"}
          round={false}
          size="100"
          textSizeRatio={1.8}
        />
        <h2 className="text-xl font-semibold flex items-center mt-4">
          {user.name} <FiCheckCircle className="text-blue-500 ml-2" />
        </h2>
        <p className="flex items-center gap-2 text-gray-500 mt-1">
          <FiMail />
          {user.email}
        </p>
        <h1 className="text-3xl font-bold text-center md:text-left mt-8">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-500 text-center md:text-left mt-2">
          I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.
        </p>

        <div className="flex gap-x-6 mt-4">
          <div className="text-center">
            <p className="font-semibold">600</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">100</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
        </div>

        <Button
          variant="outlined"
          style={{
            marginTop: '1rem',
            padding: '0.5rem 2rem',
            borderRadius: '9999px',
            textTransform: 'none'
          }}
        >
          + Follow
        </Button>
      </div>

      {/* Right: My Work */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">My Work</h3>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-gray-100 h-24 flex items-center justify-center overflow-hidden"
            >
              <img
                src={`https://picsum.photos/seed/software${i}/300/300`}
                alt="Work"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
