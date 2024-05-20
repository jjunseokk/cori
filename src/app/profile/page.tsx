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
import { AxiosError } from "axios";

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
    profileImg: "",
  });
  const [image, setImage] = useState(null);
  const [warning, setWarning] = useState<Warning>({
    message: "",
    position: true,
    statusCode: 200,
  });
  const [imagePreview, setImagePreview] = useState(null);

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
      window.location.reload();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setWarning(error.response.data);
        console.log(error.response.data.message);
      }
    },
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

    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        new Promise((resolve) => {
          reader.onload = () => {
            setImagePreview(reader.result as string);
            resolve(null);
          };
        });
      }
    }
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
    const login = JSON.parse(localStorage.getItem("token"));
    console.log(login);
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
        profileImg:
          prevUserData.profileImg || data.data.User[0].profileImg || "",
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
            <Image
              src={
                imagePreview
                  ? imagePreview
                  : userData.profileImg === ""
                  ? default_img
                  : userData.profileImg
              }
              width={100}
              height={100}
              alt="default_img"
            />
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
