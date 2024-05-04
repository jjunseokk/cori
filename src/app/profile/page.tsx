"use client";
import Image from "next/image";
import "./profile.scss";
import default_img from "../../../public/defaultIcon.svg";
import setting from "../../../public/setting.svg";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateProfile } from "@/util/AxiosGet/AxiosUser";
import userTokenStore from "@/stores/token";
import { useRouter } from "next/navigation";
import { Button } from "@/component/Button/Button";
import { UpdateFormData } from "@/type/userType";

interface Warning {
  message: string;
  position?: boolean;
  name?: boolean;
  statusCode: number;
}

export default function Profile() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    position: "",
    explanation: "",
  });
  const [image, setImage] = useState(null);
  const [warning, setWarning] = useState<Warning>({
    message: "",
    position: true,
    statusCode: 200,
  });

  const { token }: any = userTokenStore();
  const Token = token?.user?.token;

  const HandleClick = () => {
    fileRef.current.click();
  };

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(Token),
    enabled: !!Token,
  });

  const returnUpdate = async (profileData: UpdateFormData) => {
    return await updateProfile(profileData);
  };

  const updateMutation = useMutation({
    mutationFn: (profileData: UpdateFormData) => returnUpdate(profileData),
    onSuccess: (res) => {
      setWarning(res.data);
      window.location.reload();
    },
    onError: (error) => {},
  });

  const updateProfileClick = () => {
    updateMutation.mutate({
      name: userData.name,
      profileImage: image,
      position: userData.position,
      explanation: userData.explanation,
      token: Token,
    });
  };

  const getImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleNameChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: e.target.value,
    }));
  };

  const handlePositionChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      position: e.target.value,
    }));
  };

  const handleExplanationChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      explanation: e.target.value,
    }));
  };

  useEffect(() => {
    if (token?.user?.token === undefined) {
      router.push("/main");
    }
  }, []);

  useEffect(() => {
    if (data?.data.User[0]) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: prevUserData.name || data.data.User[0].name || "",
        position: prevUserData.position || data.data.User[0].position || "",
        explanation:
          prevUserData.explanation || data.data.User[0].explanation || "",
      }));
    }
  }, [data]);

  return (
    <div className="profile_container">
      <div className="profile_wrapper">
        <div onClick={HandleClick} className="profile_img">
          <div className="image">
            <Image src={default_img} alt="default_img" />
            <Image className="setting" src={setting} alt="default_img" />
          </div>
          <input
            onChange={getImage}
            ref={fileRef}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="profile_info">
          <p>이름</p>
          <input
            value={userData.name}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            type="text"
          />
          {warning.name === false ? (
            <p className="warning">{warning.message}</p>
          ) : null}
          <p>대표 포지션</p>
          <input
            value={userData.position}
            onChange={handlePositionChange}
            placeholder="포지션을 입력해주세요.(ex : 백엔드, 데브옵스, CTO)"
            type="text"
          />
          {warning.position === false ? (
            <p className="warning">{warning.message}</p>
          ) : null}
          <p>자기소개</p>
          <textarea
            value={userData.explanation}
            onChange={handleExplanationChange}
            placeholder="자기소개를 입력해주세요."
          />
        </div>
        <Button onClick={updateProfileClick} width={400} height={40}>
          프로필 저장
        </Button>
      </div>
    </div>
  );
}
