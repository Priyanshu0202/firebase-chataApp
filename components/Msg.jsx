import React from "react";
import Chatheader from "./Chatheader";
import Messages from "./Messages";
import { useChatContext } from "../context/chatContext";
import ChatFooter from "./ChatFooter";
import { useAuth } from "../context/authContext";
const Msg = () => {
  const { currentUser } = useAuth();
  const { data, users } = useChatContext();
  const handleClickAway = () => {
    setShowMenu(false);
  };

  const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );

  const iamBlocked = users[data.user.uid]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );

  return (
    <div className="flex flex-col p-5 grow">
      <Chatheader />
      {data.chatId && <Messages />}

      {!isUserBlocked && !iamBlocked && <ChatFooter />}

      {isUserBlocked && (
        <div className="w-full text-center text-c3 py-5">
          This user has been blocked
        </div>
      )}

      {iamBlocked && (
        <div className="w-full text-center text-c3 py-5">
          {`${data.user.displayName} has blocked you`}
        </div>
      )}
    </div>
  );
};

export default Msg;
