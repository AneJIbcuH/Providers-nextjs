"use client";
import InputMask from "react-input-mask";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { Provider } from "../page";

type ProviderParams = {
  id: number;
}

export default function Provider({ params }: { params: ProviderParams }) {
  const [provider, setProvider] = useState();
  const router = useRouter();

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setProvider(data.filter((prov: Provider) => prov.id == params.id)[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validNumber, setValidNubmer] = useState<boolean>(true);
  const [money, setMoney] = useState("");
  const [validMoney, setValidMoney] = useState<boolean>(false);

  function navigateBack() {
    router.push("/");
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(inputValue);
    if (inputValue.length == 11) {
      setValidNubmer(true);
    } else {
      setValidNubmer(false);
    }
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Удаление всех символов кроме цифр
    setMoney(inputValue);

    if (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 1000) {
      setValidMoney(true);
    } else {
      setValidMoney(false);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  function pay() {
    return new Promise((resolve, reject) => {
      messageApi.open({
        type: "loading",
        content: "Переводим деньги...",
        duration: 0,
      });
      setTimeout(() => {
        messageApi.destroy();
        random(resolve, reject);
      }, 2000);
    });
  }
  
  function random(resolve: (value?: void) => void, reject: (reason?: any) => void) {
    const numb = Math.random();
    if (numb > 0.5) {
      success(resolve);
    } else {
      error(reject);
    }
  }
  
  function success(resolve: (value?: any) => void) {
    messageApi.open({
      type: "success",
      content: "Успешно, платеж одобрен!",
    });
    setTimeout(() => {
      navigateBack();
      resolve("Платеж успешно проведен");
    }, 1500);
  }
  
  function error(reject: (reason?: any) => void) {
    messageApi.open({
      type: "error",
      content: "Ошибка, попробуйте еще раз",
    });
    reject("Ошибка при проведении платежа");
  }

  return (
    <MyProvider>
      <p>{provider?.name}</p>
      <Img src={provider?.logo} alt="не загрузилось лого" />
      <div className={validNumber ? "hidden" : "notification"}>
        Введите номер полностью
      </div>
      <Mask
        mask="+7 (999) 999-99-99"
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      <div className={validMoney ? "hidden" : "notification"}>
        Введите сумму от 1 до 1000 рублей
      </div>
      <Mask
        mask="9999 руб"
        maskChar=" "
        value={money}
        onChange={handleMoneyChange}
      />
      <Button onClick={navigateBack}>
        Назад
      </Button>
      <Button
        disabled={validMoney && validNumber ? false : true}
        onClick={pay}
      >
        Оплатить
      </Button>
      {contextHolder}
    </MyProvider>
  );
}

const MyProvider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 99%;
  max-width: 700px;
  margin-top: 10px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background: #ffdebd;
  text-align: center;

  &:hover {
    background: #f9c694;
  }

  &:active {
    background: #fdbb79;
    font-size: 20px;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5%;
  margin-bottom: 40px;
`;

const Mask = styled(InputMask)`
  width: 99%;
  max-width: 700px;
  margin-top: 10px;
  height: 40px;
  border-radius: 5px;
  border: none;
  background: #ffdebd;
  text-align: center;

  &:hover {
    background: #f9c694;
  }

  &:active {
    background: #fdbb79;
    font-size: 20px;
  }
`;
