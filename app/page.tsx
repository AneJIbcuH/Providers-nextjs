"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export type Provider = {
  id: number;
  name: string;
  logo: string;
};

export default function HomePage() {
  const [providers, setProviders] = useState();

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const router = useRouter();

  function toUser(provider: Provider) {
    router.push(`/${provider.id}`);
  }

  return (
    <List>
      {providers?.map((provider: Provider) => (
        <ListProvider onClick={() => toUser(provider)}>
          <p>{provider.name}</p>
          <Img src={provider.logo} alt="нет загрузилось лого" />
        </ListProvider>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const ListProvider = styled.div`
  margin: 0 15px;

  &:hover {
    border-radius: 5%;
    background: #e7e7e7;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5%;
`;