interface UsernamePropes {
  username: string;
}

const UserNotFound = ({ username }: UsernamePropes) => {
  return <div>User not found : {username}</div>;
};

export default UserNotFound;
