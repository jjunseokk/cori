import Image from "next/image";
import React from "react";
import { Div } from "./ItemBoxStyle";
import { useRouter } from "next/navigation";
import moment from "moment";

import heart_off from "../../../public/heart_off.png";
import heart_on from "../../../public/heart_on.png";
import eyes from "../../../public/eyes.svg";
import { useMutation } from "@tanstack/react-query";
import { updateView } from "@/util/AxiosGet/AxiosPost";
import { UpdateViewData } from "@/type/postType";

interface ItemData {
  id: number;
  title: string;
  name: string;
  content: string;
  createdPost: string;
  postId: number;
  view?: null | number;
  selectOption: string;
}
interface ItemBoxType {
  type: string;
  path?: string;
  data?: ItemData;
}

const ItemBox = ({ type, path, data }: ItemBoxType) => {
  const router = useRouter();

  const updateViewMutation = useMutation({
    mutationFn: (view: UpdateViewData) => updateView(view),
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const writeDate = new Date(data?.createdPost);
  const formattedDate = moment(writeDate).format("YYYY.MM.DD");

  return (
    <Div
      onClick={() => {
        updateViewMutation.mutate({
          postId: data?.postId,
        });
        router.push(String(`${path}`));
      }}
    >
      <div className="imgArea">
        <Image width={500} height={500} src="/test.png" alt="test" />
      </div>
      <div className="content">
        <p>{data?.title}</p>
        <div className="middle">
          {type === "review" ? <p>코드리뷰⚙️</p> : <p>포트폴리오🎨</p>}
          <div>
            {type === "portfolio" ? (
              <p>
                <Image src={heart_off} alt="heart" /> 112
              </p>
            ) : null}
            <p>
              <Image width={15} height={15} src={eyes} alt="eyes" />
              {data?.view}
            </p>
          </div>
        </div>
        <div className="bottom">
          <p className="date">등록일 {formattedDate}</p>
          <p>
            작성자 <span>{data?.name}</span>
          </p>
        </div>
      </div>
    </Div>
  );
};

export default ItemBox;
