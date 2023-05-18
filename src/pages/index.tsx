import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState} from "react";
import { getOptionsForVote } from "~/utils/getRandomCharID";
import { trpc } from "~/utils/trpc";
import Trpc from "./api/trpc/[trpc]";


const Home: NextPage = () => {
  const {data: characterPair,
          refetch,
          isLoading,
        } = trpc.characters.useQuery()
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Vote your favourite</div>
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className="p-2" />
          <div className="w-68 h-68 flex flex-col">
            <img src={characterPair?.firstCharacter.image.medium}
            className="w-full"/>
              <div className="text-xl text-center">
                {characterPair?.firstCharacter.name.full}
                </div>
          </div>
          <div className="p-8">Vs</div>
          <div className="w-68 h-68 flex flex-col">
          <img src={characterPair?.secondCharacter.image.medium}
            className="w-full"/>
             <div className="text-xl text-center">
              {characterPair?.secondCharacter.name.full}
              </div>
          </div>
          <div className="p-2"/>
        </div>
      </div>
    </>
  );
};

export default Home;
