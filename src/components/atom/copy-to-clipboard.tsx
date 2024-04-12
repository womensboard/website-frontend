import Image from 'next/image';
import React, { useState } from 'react';
import { TbClipboardList } from 'react-icons/tb';

type CopyLinkToClipBoardProps = {
  text: string;
};
const CopyLinkToClipBoard = (props: CopyLinkToClipBoardProps) => {
  const shareIcon = '/assets/images/shareIcon.png';

  const [copied, setCopied] = useState(false);
  const showCopiedClass = copied ? 'block' : 'hidden';

  const handleClipBoardMsg = () => {
    navigator.clipboard.writeText(props.text);

    setCopied(!copied);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="">
      <div
        className={`${showCopiedClass} flex items-center gap-[5px] bg-[#353535] rounded-[4px] p-[8px_16px] text-white absolute bottom-[85px] right-4 transition-all`}
      >
        <TbClipboardList size={20} />
        <span className="text-[12px] capitalize">Link copied to Clipboard</span>
      </div>

      <button
        className="border-[#212447] rounded-[8px] border-[1px] h-[52px] w-[52px] grid place-items-center"
        onClick={handleClipBoardMsg}
      >
        <Image
          src={shareIcon}
          alt="shareIcon"
          width={36}
          height={0}
          className="object-cover "
        />
      </button>
    </div>
  );
};

export default CopyLinkToClipBoard;
